//creating the model using the sequiled package

const Sequelize = require('sequelize');

const sequelize = require('../utils/path').sequelize;


const Product = sequelize.define('products',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.TEXT,
            allowNull: false,
        }
    }
);


module.exports = Product;












//Below is the code for creating Sql Server and the model for it

// // const fs = require('fs');
// // const path = require('path');
// // const rootDir = require('../utils/path');
// const db = require('../utils/path').pool;
// const cart = require('./Cart');
// module.exports = class Product {
//     constructor(title, price, imageUrl, description) {
//         this.title = title;
//         this.price = price;
//         this.imageUrl = imageUrl;
//         this.description = description;
//     }

//     //    saveProduct(cb) {
//     //     var Path = path.join(rootDir, 'data', 'product.json');
//     //     fs.readFile(Path, (error, fileContent) => {
//     //         let products = [];
//     //         if (!error) {
//     //             products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
//     //         }
//     //         if (this.id) {
//     //             const existingProductIndex = products.findIndex(prod => prod.id == this.id);
//     //             if (existingProductIndex >= 0) {
//     //                 products[existingProductIndex] = this;
//     //             } else {
//     //                 this.id = Math.random().toFixed(5).toString();
//     //                 products.push(this);
//     //             }
//     //         } else {
//     //             this.id = Math.random().toFixed(5).toString();
//     //             products.push(this);
//     //         }
//     //         fs.writeFile(Path, JSON.stringify(products), (error) => {
//     //             cb(error);
//     //         });
//     //     });
//     // }

//     //     static getProduct(cb) {
//     //         var Path = path.join(rootDir, 'data', 'product.json');
//     //         fs.readFile(Path, (error, product) => {
//     //             if (!error && product.length >0) {
//     //                 cb(JSON.parse(product));
//     //             } else {
//     //                 cb([]);
//     //             }
//     //         });
//     //     }

//     //     static findById(id,cb){

//     //         this.getProduct((product)=>{
//     //             let foundProduct=product.find((product)=>{
//     //                 return product.id==id;
//     //             });
//     //             cb(foundProduct);
//     //         })
//     //     }

//     //     static deleteProduct(id,price){
//     //         var Path = path.join(rootDir, 'data', 'product.json');
//     //         fs.readFile(Path, (error, fileContent) => {
//     //             let products = [];
//     //             if (!error) {
//     //             products = fileContent.length > 0 ? JSON.parse(fileContent) : [];
//     //             }
//     //             products = products.filter(prod => prod.id !== id);
//     //             cart.deleteFromCart(id,price);
//     //             fs.writeFile(Path, JSON.stringify(products), (error) => {
//     //             console.log(error);
//     //             });
//     //         });
//     //     }


//     saveProduct() {
//         return db.execute("INSERT INTO products (name, imageUrl, description, price) VALUES (?,?,?,?)", [
//             this.title,
//             this.imageUrl,
//             this.description,
//             this.price,
//         ]).then((result) => {
//             return result[0];
//         }).catch((err) => console.log(err));
//     }


//     static getProduct() {
//         return db.execute("SELECT * FROM products").then((result) => {
//             return result[0];
//         }).catch((err) => console.log(err));
//     }

//     static findById(id) {
//         return db.execute("SELECT * FROM products WHERE id=?", [id])
//             .then((result) => {
//                 return result[0];
//             })
//             .catch((err) => console.log(err));
//     }
//     static deleteProduct(id, price) {
//     }

// }

