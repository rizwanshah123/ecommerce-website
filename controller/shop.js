const Product = require('../model/Product');
const Cart = require('../model/Cart');
const User = require('../model/user');
// exports.getProducts = (req, res, next) => {
//     Product.getProduct((products) => {
//         //Here in the Render function the first parameter is the path to the view file and the second parameter is the object which contains the data which we want to pass to the view
//         res.render('shop/index', { products: products, pageTitle: 'Shop', path: '/' });
//     });
// }

exports.getProducts = (req, res, next) => {

    Product.findAll().then(product => {
        res.render('shop/index',
            {
                products: product,
                pageTitle: 'Shop',
                path: '/'
            });

    }).catch(err => console.log(err));

}
exports.getAllProducts = (req, res, next) => {

    Product.findAll().then(product => {
        res.render('shop/product-list',
            {
                products: product,
                pageTitle: 'All Product',
                path: '/shop/product-list'
            });


    }).catch(err => console.log(err));


    // Product.getProduct((products) => {
    //     //Here in the Render function the first parameter is the path to the view file and the second parameter is the object which contains the data which we want to pass to the view
    //     res.render('shop/product-list', { products: products, pageTitle: 'Shop', path: '/shop/product-list' });
    // });
}


exports.getProductDetails = (req, res, next) => {
    const productId = req.params.productId;

    Product.findByPk(productId)
        .then(product => {
            res.render('shop/product-detail',
                { product: product, pageTitle: "Product Details", path: '/shop/product-details' });

        })
        .catch(err => console.log(err));
    // Product.findById(productId).then((product) => {
    //     res.render('shop/product-detail', { product: product[0], pageTitle: "Product Details", path: '/shop/product-details' });
    // }).catch((err) => { console.log(err) });
}



exports.postAddToCart = (req, res, next) => {
    const prodId = req.params.productId;
    let fetchedCart = null;
    let newQuantity = 1;
    let userr;
    User.findByPk(req.userId)
        .then(user => {
            userr = user;
            return userr.getCart();
        })
        .then(cart => {
            if (!cart) {
                return userr.createCart();
            }
            return cart;
        })
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            let product;
            if (products.length > 0) {

                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then(product => {
            return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
        })
        .then(() => {
            // Fetch all the cart products
            return fetchedCart.getProducts();
        })
        .then(products => {
            const productData = products.map(product => product.dataValues);

            res.render('shop/cart', {
                products: productData,
                pageTitle: 'Your Cart',
                path: 'shop/cart'
            });
        })
        .catch(err => console.log(err));
};


exports.getAllCartProduct = (req, res, next) => {

    User.findByPk(req.userId)
        .then(user => {
            return user.getCart();
        })
        .then(cart => {
            return cart.getProducts();

        })
        .then(products => {
            const productData = products.map(product => {
                const productValues = { ...product.dataValues };
                productValues.quantity = product.cartItem.dataValues.quantity;
                productValues.totalPrice = product.price * productValues.quantity;
                return productValues;
            });
            console.log(productData);
            res.render('shop/cart',
                {
                    products: productData,
                    pageTitle: 'Cart',
                    path: '/shop/cart'
                });
        }).catch(err => {
            console.log('inside the catch block');
            res.render('shop/empty-cart');
        });
    // Cart.getAllProducts((products) => {
    //     //Here in the Render function the first parameter is the path to the view file and the second parameter is the object which contains the data which we want to pass to the view
    //     if (products.length > 0) {
    //         res.render('shop/cart', { products: products, pageTitle: 'Cart', path: '/shop/cart' });
    //     }
    //     else {
    //         res.render('shop/empty-cart', { pageTitle: 'Cart', path: '/shop/cart' });
    //     }
    // });
}

exports.getCart = (req, res, next) => {
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId, prod => {
        const findProduct = prod;
        if (findProduct !== undefined) {
            Cart.addToCart(findProduct, 1, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        }
    });
}

exports.postDecrementCartProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    User.findByPk(req.userId)
        .then(user => user.getCart())
        .then(cart => cart.getProducts({ where: { id: prodId } }))
        .then(products => {
            const product = products[0];
            product.cartItem.quantity--;
            if (product.cartItem.quantity < 1) {
                return product.cartItem.destroy();
            }
            else {

                return product.cartItem.save();
            }
        })
        .then(() => res.status(200).end())
        .catch(err => console.log(err));
};

exports.postIncrementCartProduct = (req, res, next) => {
    const prodId = req.params.prodId;
    User.findByPk(req.userId)
        .then(user => user.getCart())
        .then(cart => cart.getProducts({ where: { id: prodId } }))
        .then(products => {
            const product = products[0];
            product.cartItem.quantity++;
            return product.cartItem.save();
        })
        .then(() => res.status(200).end())
        .catch(err => console.log(err));
};

exports.postDeleteCartProduct = (req, res, next) => {
    console.log("calling delete product form cart");
    const prodId = req.body.productId;
    let fetchedCart = null;
    User.findByPk(req.userId)
        .then(user => {
            return user.getCart();
        })
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } })
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/shop/cart');
        })

    // Cart.deleteFromCart(prodId, (err) => {
    //     if (err) {
    //         console.log(err);
    //         return res.redirect('/');
    //     }
    //     Cart.getAllProducts((products) => {
    //         if (products.length === 0) {

    //             res.redirect('/shop/empty-cart');
    //         } else {

    //             res.redirect('/shop/cart');
    //         }
    //     });
    // });
}
