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

// route structure for sorting -
// /taks?sortBy=<field1>:<order1>_<field2>:<order2>_<field3>:<order3>
router.get("/tasks", auth, async (req, res) => {
  try {
    const isCompleted = req.query.completed;

    // number of documents to be sent
    const limit = parseInt(req.query.limit);
    // number of set of documents to be skipped from starting
    const skip = parseInt(req.query.skip);

    let sortStr = "";
    if (req.query.sortBy) {
      // will run only if sortBy is neither null nor "".
      // should be truthy
      const sortQueries = req.query.sortBy.split("_");
      sortQueries.forEach((queryStr) => {
        const [sortField, sortOrder] = queryStr.split(":");
        sortStr += `${sortOrder === "dsc" ? "-" : ""}${sortField} `;
      });
    }

    // Is user (_id) ke corresponding tasks fetch karne he
    const tasks =
      isCompleted === "true" || isCompleted === "false"
        ? await Task.find({
            owner: req.user._id,
            isCompleted: Boolean(isCompleted),
          })
            .skip(skip * limit)
            .limit(limit)
            .sort(sortStr)
        : await Task.find({ owner: req.user._id })
            .skip(skip * limit)
            .limit(limit)
            .sort(sortStr);

    // Alternative to above, using relationship
    // req.user.populate("tasks").execPopulate();
    // now req.user.tasks holds all of the tasks associated with a user.
    // REMEMBER - tasks is a virtual field on user instance.

    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (e) {
    console.log("e", e);
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
