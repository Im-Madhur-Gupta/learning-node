const express = require("express");
require("./db/mongoose");

// importing routers
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();

// Heroku pe deploy karte waqt ports etc .env file mai hote he.
const port = process.env.PORT || 3001;

// telling express to convert/parse my request's json body to js object
// basically ye ek middleware setup kardega jo ki body-parser wala module hi use karega
app.use(express.json());

// registering the routers with the main express app
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is running on port -", port);
});
