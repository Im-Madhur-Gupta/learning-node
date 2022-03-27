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

exports.getAdminProducts = (req, res, next) => {
    res.render("admin/admin-product-list", {
        path: "admin/products",
        pageTitle: "Admin Product List"
    })
}

exports.getEditProducts = (req, res, next) => {
    res.render("admin/edit-product", {
        path: "admin/edit-product",
        pageTitle: "Admin Edit Products"
    })
}

exports.postEditProducts = (req, res, next) => {
    console.log("admin product editted")
    res.redirect("/admin/products");
}