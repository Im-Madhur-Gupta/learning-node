const express = require("express");
const Task = require("../models/Task");

const router = new express.Router();

router.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((task) => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/tasks", (req, res) => {
  // to query all the tasks
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  Task.findById(id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((err) => res.status(500).send(err));
});

router.patch("/tasks/:id", (req, res) => {
  const id = req.params.id;
  Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((task) => {
      if (!task) {
        return res.status(404).send({});
      }
      res.send(task);
    })
    .catch((err) => res.status(400).send(err));
});

router.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
