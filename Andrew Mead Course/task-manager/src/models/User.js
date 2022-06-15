const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Invalid Password Entered");
      }
    },
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age should be positive");
      }
    },
    default: 0,
  },
});

// IMPORTANT - Yaha "this" binding ka imp use he, to normal function hi declare karna padega.
// Arrow function won't do the job.
userSchema.pre("save", async function (next) {
  // our user object is stored in "this"
  const user = this;

  // hash the password only if it was modified
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  // call next when we are done with our middleware's body
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
