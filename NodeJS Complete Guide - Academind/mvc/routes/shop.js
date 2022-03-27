const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const shopControllers = require("../controllers/shop");

const router = express.Router();

router.get("/", shopControllers.getIndex);
router.get("/product", shopControllers.getProducts);
router.get("/cart", shopControllers.getCart);
router.get("/checkout", shopControllers.getCheckout);

module.exports = router;
