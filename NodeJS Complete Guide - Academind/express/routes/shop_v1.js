const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(`<h1>Hello, this is your homepage.</h1>`);
});

module.exports = router;
