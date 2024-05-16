//Below is the code for accessing the sql using the sequelize lackage

const sequelize = require('../utils/path').sequelize;
const Sequelize = require('sequelize');

const Cart = sequelize.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },


});


module.exports = Cart;

//Below is the code for Using the sql directly
// const fs = require('fs');
// const path = require('path');
// const rootDir = require('../utils/path');

// module.exports = class Cart {

//     static getAllProducts(cb) {
//         var Path = path.join(rootDir, 'data', 'cart.json');
//         fs.readFile(Path, (err, fileContent) => {
//             if (err) {
//                 cb([]); // If there's an error, return an empty array
//             } else {
//                 const cart = JSON.parse(fileContent);
//                 cb(cart.products);
//             }
//         });
//     }

//     static addToCart(prod, qty, cb) {
//         console.log("Called the Add to cart");
//         let cart = { products: [], totalPrice: 0 };
//         var Path = path.join(rootDir, 'data', 'cart.json');
//         fs.readFile(Path, (error, product) => {
//             if (!error && product.length > 0) {
//                 cart = JSON.parse(product);
//             }
//             var existingProductsIndex = cart.products.findIndex(product => product.id === prod.id);
//             var existingProducts = cart.products[existingProductsIndex];
//             if (existingProducts) {
//                 cart.products[existingProductsIndex].qty += qty;
//             }
//             else {
//                 cart.products.push({ ...prod, qty: qty });
//             }

//             cart.totalPrice += prod.price * qty;

//             fs.writeFile(Path, JSON.stringify(cart), (err) => {
//                 cb(err);
//             });
//         });
//     }


//     static deleteFromCart(id, price) {
//         var Path = path.join(rootDir, 'data', 'cart.json');
//         fs.readFile(Path, (err, fileContent) => {
//             if (err) {
//                 return;
//             }
//             const updatedCart = { ...JSON.parse(fileContent) };
//             const product = updatedCart.products.find(prod => prod.id == id);
//             if (!product) {
//                 return;
//             }
//             const prodQty = product.qty;
//             updatedCart.products = updatedCart.products.filter(prod => prod.id != id);
//             updatedCart.totalPrice -= price * prodQty;
//             fs.writeFile(Path, JSON.stringify(updatedCart), (err) => {
//                 console.log(err);
//             });
//         });
//     }
// }