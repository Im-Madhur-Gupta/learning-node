const path = require("path");
const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  // jaha par bhi mujhe sendFile() use karna he waha mujhe absolute path dena padta he
  // ye karne ke liye mai app.js ka absolute path banata hu using __dirname aur fir uske upar apni file tak jata hu
  // to ye baar baar app.js ka absolute path banana is redundant ko wo karne ke liye mai ek special variable bana diya hu rootDir name ka.
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
