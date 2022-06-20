const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/Task");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    // Is user (_id) ke corresponding sare tasks fetch karne he
    const tasks = await Task.find({ owner: req.user._id });
    
    // Alternative to above, using relationship
    // req.user.populate("tasks").execPopulate();
    // now req.user.tasks holds all of the tasks associated with a user.
    // REMEMBER - tasks is a virtual field on user instance.

    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  try {
    const tasks = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      {
        returnDocument: "after",
      }
    );
    if (!tasks) {
      return res.status(404).send({ error: "task not found" });
    }
    res.send(tasks);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send({ error: "task not found" });
    }
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
