const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/task-manager-api");

const Task = mongoose.model("Task", {
  description: { type: String, required: true, trim: true },
  isCompleted: { type: Boolean, default: false },
});

const task1 = new Task({
  description: "xyz",
  isCompleted: false,
});

task1
  .save()
  .then((savedTask) => {
    console.log(savedTask);
  })
  .catch((err) => console.log(err));
