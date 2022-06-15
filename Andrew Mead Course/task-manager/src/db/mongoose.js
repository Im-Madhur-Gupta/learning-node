const mongoose = require("mongoose");

// connecting to mongoDB
// URL ke agge jo DB se connect karna he uska name dal deta he
mongoose.connect(
  "mongodb+srv://madhur:mkpK2ip0tG1JwY70@cluster0.ldi0x.mongodb.net/task-manager-api?retryWrites=true&w=majority"
);
