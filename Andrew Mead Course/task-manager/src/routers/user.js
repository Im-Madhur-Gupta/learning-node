const express = require("express");
const User = require("../models/User");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users", async (req, res) => {
  try {
    const retrivedUsers = await User.find({});
    res.send(retrivedUsers);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const retrivedUser = await User.findById(id);
    res.send(retrivedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  // yaha pe jo update object he usmai agr koi aisi field he jo us model (schema) mai ni he to wo field ni add hogi DB ke us document mai.
  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(404).send(err));
});

router.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
