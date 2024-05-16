const express = require('express');
const routers = express.Router();
const shopController = require('../controller/shop');


routers.get('/', shopController.getProducts);

routers.get('/shop/product-list', shopController.getAllProducts);

routers.get('/shop/product-detail/:productId', shopController.getProductDetails);


routers.get('/shop/cart/:productId', shopController.getCart);

routers.get('/shop/cart', shopController.getAllCartProduct);

routers.post('/shop/add-to-cart/:productId', shopController.postAddToCart);

routers.post('/shop/delete-cart-product', shopController.postDeleteCartProduct);

routers.post('/shop/cart/decrement/:prodId', shopController.postDecrementCartProduct);

routers.post('/shop/cart/increment/:prodId', shopController.postIncrementCartProduct);



module.exports = routers;

