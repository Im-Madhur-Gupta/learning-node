const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const rootDir = require("./util/path");

const app = express();

app.use(bodyParser.urlencoded({ extended: "false" }));

// IMPORTANT
// setting up middleware to serve files of public folder statically -
// express.static() ko wo folder ka absolute path dedo jisse app statically serve karna chahte ho.
app.use(express.static(path.join(rootDir, "public")));

app.use("/admin", adminRoutes); // ek particular file/group ke sare urls agr same sequence se start ho rahe he to mai us prefix ko use() ko as 1st argument de sakta hu.
// Bar bar file ke andar likhne ki zaroorat ni padegi.
app.use(shopRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404-page.html"));
});

app.listen(3000);
