const mysql = require("mysql2");

// creating a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "madhur",
  database: "node-complete",
});

module.exports = pool.promise();
// pool export kar raha mai through its promises and NOT through callback.
// .then() chains se mai pool ko access karunga.