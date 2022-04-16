const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const { products } = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Products",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
});

module.exports = router;
