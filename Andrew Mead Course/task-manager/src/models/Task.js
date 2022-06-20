const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value) return Error("description can't be empty.");
    },
  },
  isCompleted: { type: Boolean, default: false },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // setting up a reference between task and owner
    // is relationship ki madad se mai kisi task ke corresponding user ka document directly obtain kar paunga
    ref: "User",
  },
});

taskSchema.methods.toJSON = function () {
  const task = this;
  const taskObj = task.toObject();
  delete taskObj.owner;
  return taskObj;
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
