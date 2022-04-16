const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: "false" }));

// abhi ye route wale middlewares sare methods ke liye execute ho rahe he.
// inko mai limit kar sakta hu using .get(), .post(), .put() etc instead of .use().

app.get("/add-product", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(
    `<form action="/product" method="POST"><input type='text' name="product"><button>Add Product</button></form>`
  );
});

app.post("/product", (req, res) => {
  res.redirect("/");
  console.log(req.body);
});

app.get("/", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(`<h1>Hello, this is your homepage.</h1>`);
});

app.listen(3000);
