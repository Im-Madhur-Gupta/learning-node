const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

app.use(bodyParser.urlencoded({ extended: "false" }));

// passing the router from the files to use() so that the routes get registered in the main express app.
app.use(adminRoutes);
app.use(shopRoutes);

// creating 404 page
// Remember, use() ko agr path ni dete to path="/" ke hisab se chalta he
// ie sare paths ko match kar leta he.
app.use((req, res, next) => {
  res.status(404).send(`<h1>404 page not found.</h1>`);
});
// OR
// app.use("/", (req,res,next)=>{
//   res.send(`<h1>404 page not found.</h1>`)
// })

app.listen(3000);
