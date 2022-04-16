const express = require("express");

const app = express(); // initializes the express app

// setting up middlewares -
// Ek middleware ko express ke sath register karane ke liye mai .use() method ko ek function deta hu as an argument jo ki mera middleware hota he, and this function should recieve 3 arguments req, res, next
// next is basically a function that points to the next middleware function in order of execution, ye use() pass karta he.
// Middleware ke last mai next() ko call karte he ya response send kar dete he, agr indono mai se koi ek ni kiya to request wahi die karjaegi.

// note - bina path argument ke use() wala middleware sare incoming urls pe match ho jaega, equivalent to path="/" (default value of path).

// 1st middleware
app.use((req, res, next) => {
  console.log("1st middleware");
  next();
});

// 2nd middleware
app.use((req, res, next) => {
  console.log("2nd middleware");

  // setting headers
  res.set("Content-Type", "text/html"); // setHeader() ya header() bhi chal jaega.
  // OR
  // res.type("html");

  // sending a response
  res.send(
    "<html><head><title>Hello</title><head><body><h1>Hello ExpressJS</h1></body></html>"
  );
  // note - default content-type for string response is text/html.
});

// const server = http.createServer(app); // create server ko express app dete he as argument.
// server.listen(3000);

// OR

app.listen(3000);
