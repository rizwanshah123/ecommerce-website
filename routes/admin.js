// const path=require('path');

const express = require('express');

const router = express.Router();

// const rootDir=require('../utils/path');

const adminController = require('../controller/admin');

//here is the code if we want to send the html file to user but its not the best practise becouse it just send the static website 

// router.get('/add-product',(req,res,next)=>{
//     res.sendFile(path.join(rootDir,'views','add-product.html'));

// });

//here the concepts for dynamic page rendrning is template engine which help us render the 
//content of website dynamically means the data will be dynamic and 
//and it can be send like this 

router.get('/add-product', adminController.getAddProduct);


router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);


router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);


router.get('/delete-product', adminController.postDeleteProduct);
module.exports = router;