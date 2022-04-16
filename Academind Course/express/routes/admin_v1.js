const express = require("express");

const router = express.Router();

// maine jab app.js mai is file ke router ko use() ko diya tha waha maine usse ek starting url dediya tha -> "/admin" to ye file ke routes "/admin" se prefixed honge aur fir match honge.

// this route will get matched for /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(
    `<form action="/admin/add-product" method="POST"><input type='text' name="product"><button>Add Product</button></form>`
  );
});

// this route will get matched for /admin/add-product => POST
router.post("/add-product", (req, res) => {
  res.redirect("/");
  console.log(req.body);
});

module.exports = router;
