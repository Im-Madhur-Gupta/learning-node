const express = require("express");

const router = express.Router(); // this creates a pluggable express app jismai mai middlewares define kar sakta hu jaise mai apne main express app mai karta hu.
// Aisa mai karta hu taki mai routes ke liye middlewares define kar saku, aur wo sara code ke file mai ho.

router.get("/add-product", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(
    `<form action="/product" method="POST"><input type='text' name="product"><button>Add Product</button></form>`
  );
});

router.post("/product", (req, res) => {
  res.redirect("/");
  console.log(req.body);
});

module.exports = router; // ye jo exported router he ye ek valid middleware function hota he to mai isse apne main express app mai jake .use() method ko de dunga jisse main express app mai upar wale middlewares register ho jaenge.
