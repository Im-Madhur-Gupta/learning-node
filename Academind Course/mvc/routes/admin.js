const path = require("path");
const express = require("express");

const rootDir = require("../util/path");
const adminControllers = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminControllers.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", adminControllers.postAddProduct);

router.get("/products", adminControllers.getAdminProducts)

router.get("/edit-product", adminControllers.getEditProducts)

router.post("/edit-product", adminControllers.postEditProducts)

module.exports = router;
