const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  const productsArr = Product.fetchAll();
  res.render("shop/product-list", {
    prods: productsArr,
    pageTitle: "Shop",
    path: "/",
    hasProducts: productsArr.length > 0,
    activeShop: true,
    productCSS: true,
  });
};
