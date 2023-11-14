const Product = require('../models/product');
const Cart = require('../models/cart');


  exports.getproducts = (req, res, next) => {
    // const products = adminData.products;
    Product.fetchAll()
    .then(products =>{
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err=>console.log(err))
  }

  exports.postproduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product=>{
      res.render('shop/product-detail', {
        product:product,
        pageTitle: product.title,
        path: '/product',
      });
    })
    .catch(err=>{console.log(err);})
}

  exports.getindex = (req, res, next) => {  
    Product.fetchAll()
    .then(products=>{
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      }) 
    })
    .catch(err=>console.log(err))
    }


  exports.getcart = (req, res, next) => {
    req.user.getcart()
    .then(cartproducts =>{
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        products : cartproducts
      });
    })     
  }


  exports.postcart = (req,res,next) =>{
    const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      console.log(req.user.cart);
      return req.user.addToCart(product);
    })
    .then(result => {
      // console.log(result);
      res.redirect('/cart');
    })
    
  }

  exports.postDeleteCartProduct = (req, res, next) =>{
    const prodId = req.body.productId;
    req.user.deleteCartItem(prodId)
    .then(result =>{
      console.log(result);
      res.redirect('/cart')
    })
    
  }

  exports.postorder = (req, res, next) =>{
    req.user.addToOrder()
    .then((result)=>{
      res.redirect('/orders')
      // console.log(result);
      // res.render('shop/Orders', {
      //   pageTitle: 'Your Oders',
      //   path: '/orders',
      // });
    })
    .catch((err)=>console.log(err))
  }

  exports.getorders =(req,res,next) =>{
    req.user.getOrders()
    .then((orders)=>{
      res.render('shop/Orders', {
        pageTitle: 'Your Orders',
        path: '/orders',
        orders : orders
      });
    })
  }

  // exports.getcheckout = (req, res, next) => {
  //   Product.fetchAllProducts(products =>{
  //     res.render('shop/checkout', {
  //       prods: products,
  //       pageTitle: 'Checkout',
  //       path: '/checkout'
  //     });
  //   });
  // }


