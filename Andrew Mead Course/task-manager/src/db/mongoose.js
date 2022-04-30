const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

// creating a model
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// creating instance of the model
const me = new User({
  name: "Madhur",
  age: 21,
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
