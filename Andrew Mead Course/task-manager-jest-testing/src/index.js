const app = require("./app");

// Heroku pe deploy karte waqt ports etc .env file mai hote he.
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on port -", port);
});
