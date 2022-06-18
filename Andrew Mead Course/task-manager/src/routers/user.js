const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = new express.Router();

// sign up
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// login
router.post("/users/login", async (req, res) => {
  try {
    // using a custom function that I'll define in the USER SCHEMA
    // Such a method is called Model method.
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/users/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const retrivedUser = await User.findById(id);
    res.send(retrivedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/users/:id", auth, async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);

  // BELOW METHOD DOESNT RUN THE PASSWORD HASHING MIDDLEWARE
  // yaha pe jo update object he usmai agr koi aisi field he jo us model (schema) mai ni he to wo field ni add hogi DB ke us document mai.
  // User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
  //   .then((user) => res.send(user))
  //   .catch((err) => res.status(404).send(err));

  // SO WE CHANGE IT
  try {
    const user = await User.findById(id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete("/users/:id", auth, (req, res) => {
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
