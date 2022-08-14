const express = require("express");

require("dotenv").config();
require("./db/mongoose");

// importing routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

app.use(express.json());

// registering the routers with the main express app
app.use(userRouter);
app.use(taskRouter);

module.exports = app;