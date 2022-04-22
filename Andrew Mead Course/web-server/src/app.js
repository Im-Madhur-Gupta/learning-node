const express = require("express");

const app = express();

// set up static file serving
// app.use(express.static("<path to the folder containg static files>"));

app.get("/", (req, res) => {
  res.send("Hello, this is my server."); // sending response
});

app.get("/help", (req, res) => {
  res.send("Help Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("/weather", (req, res) => {
  res.send({
    temperature: "20",
  });
});

app.get("*",(req,res)=>{
    res.send("404 Page Not Found")
})

app.listen(3000, "localhost", () => {
  console.log("port is up and running.");
});
