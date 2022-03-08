const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: "false" }));
// setting up body parser middleware to parse request body
// ye sari request body ko parse ni karega sirf form ki post request walo ko kardega
// then ye next() call kardega taki baki middleware execute ho sake
// extended: false abhi kaam ka ni.

app.use("/product", (req, res) => {
  res.redirect("/"); // redirect se mai seedha given url pai redirect ho jaunga mujhe headers change karne ki zaroorat ni.

  // express request object mai body parameter dal deta he
  // but by default wo is body ko parse ni karta
  // to parser mai alag se set karta hu ABOVE all the route middlewares.
  console.log(req.body);
});

app.use("/", (req, res, next) => {
  res.set("Content-Type", "text/html");
  res.send(
    `<form action="/product" method="POST"><input type='text' name="product"><button>Add Product</button></form>`
  );
});

app.listen(3000);
