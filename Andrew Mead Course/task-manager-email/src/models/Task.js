const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
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
  },
  {
    // When we unable timestamps, we get 2 additional ppts for each document in our DB - createdAt and updatedAt.
    timestamps: true,
  }
);

taskSchema.methods.toJSON = function () {
  const task = this;
  const taskObj = task.toObject();
  delete taskObj.owner;
  return taskObj;
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
