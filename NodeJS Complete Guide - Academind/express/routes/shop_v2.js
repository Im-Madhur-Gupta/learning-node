const path = require("path"); // a core node module
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  // sending an html file as a response -

  // res.sendFile("../views/shop.html"); -> Ni chalega as sendFile() wants an absolute path not a relative one.

  // -> path module ka join method use kiya taki unix aur windows dono pe path acc. aye.
  // -> join ke sare arguments ko slashes ni dete he, wo join khud laga dega, "../" OR ".." is to go one lvl up.
  // -> __dirname is a global variable given by nodejs, isse jis bhi file mai use karte he uski value uss file ka absolute path hoti he.
  res.sendFile(path.join(__dirname, "../", "views", "shop.html"));

  // note - sendFile() automatically "Content-Type" response ke header mai set kar dega to its appropriate value.
});

module.exports = router;
