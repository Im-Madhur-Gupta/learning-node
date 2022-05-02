const express = require("express");

// connecting to mongodb using mongoose
require("./db/mongoose");

// importing the models
const User = require("./models/User");
const Task = require("./models/Task");

const app = express();

// Heroku pe deploy karte waqt ports etc .env file mai hote he.
const port = process.env.PORT || 3000;

// telling express to convert/parse my request's json body to js object
// basically ye ek middleware setup kardega jo ki body-parser wala module hi use karega
app.use(express.json());

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get("/users", (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .then((err) => res.status(500).send(err));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((user) => res.send(user))
    .then((err) => res.status(500).send(err));
});

app.post("/tasks", (req, res) => {
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

app.get("/tasks", (req, res) => {
  // to query all the tasks
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/tasks/:id", (req, res) => {
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

app.listen(port, () => {
  console.log("server is running on port -", port);
});
