const fs = require("fs");
const path = require("path");

// path of our data file
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, price) {
    // fetch the old cart and add the product
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        // meaning file was read successfully
        cart = JSON.parse(fileContent);
      }

      // analysing whether we have that product already or not
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      if (existingProductIndex !== -1) {
        // product already exists
        cart.products[existingProductIndex].qty += 1;
      } else {
        cart.products.push({ id: id, qty: 1 });
      }
      cart.totalPrice += +price;

      // finally writing all the contents in form of string to the file
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
