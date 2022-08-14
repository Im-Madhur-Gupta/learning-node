const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../../src/models/User");
const Task = require("../../src/models/Task");

const tempUserId = mongoose.Types.ObjectId();
const tempUser = {
  _id: tempUserId,
  email: "temp@gmail.com",
  password: "1234567",
  name: "Temp",
  age: 20,
  tokens: [{ token: jwt.sign({ _id: tempUserId }, process.env.JWT_SECRET) }],
};

const taskUserId = mongoose.Types.ObjectId();
const taskUser = {
  _id: taskUserId,
  email: "temp1@gmail.com",
  password: "1234567",
  name: "Temp",
  age: 20,
  tokens: [{ token: jwt.sign({ _id: taskUserId }, process.env.JWT_SECRET) }],
};

const tempTask1 = {
  _id: mongoose.Types.ObjectId(),
  description: "temp task 1",
  owner: taskUserId,
};

const tempTask2 = {
  _id: mongoose.Types.ObjectId(),
  description: "temp task 2",
  isCompleted: true,
  owner: tempUserId,
};

const tempTask3 = {
  _id: mongoose.Types.ObjectId(),
  description: "temp task 3",
  owner: taskUserId,
};

const setupDatabase = async () => {
  await Task.deleteMany();
  await User.deleteMany();

  await new User(tempUser).save();
  await new User(taskUser).save();
  await new Task(tempTask1).save();
  await new Task(tempTask2).save();
  await new Task(tempTask3).save();
};

module.exports = {
  tempUser,
  tempTask1,
  setupDatabase,
};
