const Product = require("../models/product");


exports.getIndex = (req, res, next) => {
  // render(path to the file which is to be rendered, params)
  res.render("shop/index", {
    pageTitle: "Index",
    path: "/",
  });
};

exports.getProducts = (req, res, next) => {
  const productsArr = Product.fetchAll();
  res.render("shop/product-list", {
    prods: productsArr,
    pageTitle: "Shop",
    path: "/product",
    hasProducts: productsArr.length > 0,
    activeShop: true,
    productCSS: true,
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/cart",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};


