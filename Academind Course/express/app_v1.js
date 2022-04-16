const express = require("express");

const app = express();

// setting up a middleware to be executed only for the given path
// Yani agr mera request url "/product" ya "/product/___" type ka he to ye middleware run ho jaega.
// ismai next() call ni kiya he to agla middleware ko match karne ka chance hi ni milega.
app.use("/product", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(
    "<html><head><title>Hello</title><head><body><h1>Product</h1></body></html>"
  );
});

app.use("/", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(
    "<html><head><title>Hello</title><head><body><h1>Hello ExpressJS</h1></body></html>"
  );
});

app.listen(3000);
