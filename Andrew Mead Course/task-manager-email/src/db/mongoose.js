const mongoose = require("mongoose");

// connecting to mongoDB
// URL ke agge jo DB se connect karna he uska name dal deta he
mongoose.connect(process.env.DB_URL);
