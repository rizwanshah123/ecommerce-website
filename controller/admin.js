const Product = require('../model/Product');
const User = require('../model/user');

// exports.postAddProduct = (req, res, next) => {
//   var product = new Product(null, req.body.title, req.body.price, req.body.imageUrl, req.body.description);
//   product.saveProduct((error) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log(Product.getProduct());
//       res.redirect('/');
//     }
//   });
// }

// exports.postAddProduct = (req, res, next) => {

//   var product = new Product(req.body.title, req.body.price, req.body.imageUrl, req.body.description);
//   product.saveProduct().then((val) => {
//     console.log(val);
//     res.redirect('/');
//   }).catch((err) => {
//     console.log(err);
//   });
// };


// exports.getAddProduct = (req, res, next) => {

//   Product.getProduct().then((product) => {
//     res.render('admin/edit-product', {
//       pageTitle: 'Add Product',
//       path: '/admin/add-product',
//       product: product,
//       edit: false
//     });
//   }).catch((err) => console.log(err));
//   ((product) => {
//     res.render('admin/edit-product', {
//       pageTitle: 'Add Product',
//       path: '/admin/add-product',
//       product: product,
//       edit: false
//     });
//   });

// }

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  User.findByPk(req.userId)
    .then(user => {
      return user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
      }).then(result => {
        console.log('Product Created');
        res.redirect('/admin/products');
      }).catch(err => console.log(err));
    })
  // Product.create({
  //   title: title,
  //   price: price,
  //   imageUrl: imageUrl,
  //   description: description
  // }).then(result => {
  //   console.log('Product Created');
  //   res.redirect('/admin/products');
  // }).catch(err => console.log(err));

}
exports.getAddProduct = (req, res, next) => {
   console.log(req.userId);
  User.findByPk(req.userId)
    .then(user => {
      if (!user) {
        console.log(`No user found with ID ${userId}`);
        return;
      }

      return user.getProducts();
    })
    .then(products => {
      if (products) {
        res.render('admin/edit-product', {
          pageTitle: 'Add Product',
          path: '/admin/add-product',
          products: products,
          edit: false
        });
      }
    })
    .catch(err => {
      // Handle error
    });

  // Product.findAll().then(product => {
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Add Product',
  //     path: '/admin/add-product',
  //     product: product,
  //     edit: false
  //   });
  // }).catch(err => console.log(err));

}

exports.getProducts = (req, res, next) => {
  // Product.getProduct().then((products) => {
  //   res.render('admin/products', {
  //     products: products,
  //     pageTitle: 'Admin Product',
  //     path: '/admin/products'
  //   });
  // }).catch((err) => { console.log(err); });


  Product.findAll().then(product => {
    res.render('admin/products', {
      products: product,
      pageTitle: 'Admin Product',
      path: '/admin/products'
    });
  }).catch(err => console.log(err));

  // Product.getProduct
  // ((products) => {
  //   res.render('admin/products', {
  //     products: products,
  //     pageTitle: 'Admin Product',
  //     path: '/admin/products'
  //   });
  // });

}


exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;


  Product.findByPk(id)
    .then(prod => {
      prod.title = title;
      prod.price = price;
      prod.imageUrl = imageUrl;
      prod.description = description;
      prod.save();
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));




  // product.saveProduct().then((result) => {
  //   res.redirect('/admin/products');
  // }).catch((err) => { console.log(err) });

  // product.saveProduct((error) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     res.redirect('/admin/products');
  //   }
  // });
}


exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const edit = req.query.edit;


  Product.findOne({ where: { id: productId } }).then(prod => {
    if (!prod) {
      res.render('404error');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      edit: edit,
      product: prod
    });
  }).catch(err => console.log(err));

  // Product.findById(productId).then((product) => {
  //   if (!product) {
  //     res.render('404error');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     edit: edit,
  //     product: product
  //   });
  // }).catch((error) => {
  //   console.log(error);
  // });

  // Product.findById(productId, (product) => {
  //   if (!product) {
  //     res.render('404error');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     edit: edit,
  //     product: product
  //   }
  //   );
  // });
};



exports.postDeleteProduct = (req, res, next) => {
  const productId = req.query.productId;
  const productPrice = req.query.productPrice;
  Product.deleteProduct(productId, productPrice);
  res.redirect('/admin/products');
}

