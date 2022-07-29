const express = require("express");
require("./db/mongoose");

// importing routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// Heroku pe deploy karte waqt ports etc .env file mai hote he.
const port = process.env.PORT || 3002;

// telling express to convert/parse my request's json body to js object
// basically ye ek middleware setup kardega jo ki body-parser wala module hi use karega
app.use(express.json());

// registering the routers with the main express app
app.use(userRouter);
app.use(taskRouter);

const multer = require("multer");

// configure multer for current use (can be done multiple times corresponding to multiple requests)
// configuration would involve which type of file can be uploaded etc
const upload = multer({
  dest: "images", // name of the folder where files will be stored.
});
// endpoint for user to upload file
app.post("/upload", upload.single("upload"), (req, res) => {
  // IMP - What I give to upload.single("____") is the name of key corresponding to the file in the form data.
  res.send();
});

app.listen(port, () => {
  console.log("server is running on port -", port);
});
