const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

// creating a model
// Corresponds to a Collection (table)
// Jo bhi 1st argument diya he uske corresponding jo bhi plural form hoga wo name ki table mai ye model ka instance jaega.
const User = mongoose.model("User", {
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

// creating instance of the model
// Corresponds to a Document (row)
const me = new User({
  name: "Madhur",
  age: 21,
  password: "  1234567password ",
});

// saving instance to the db
me.save()
  .then((me) => {
    // recieved instance of the model
    console.log("data is saved", me);
  })
  .catch((err) => {
    console.log("Error", err);
  });
