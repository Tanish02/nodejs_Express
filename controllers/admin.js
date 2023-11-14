const Product = require('../models/product');

exports.getaddproducts = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing : false 
    });
  };

exports.postaddproducts = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, price, description, imageUrl, null, req.user._id);
    product.save()
    .then(result=>{
      res.redirect('/')
    })
    .catch(err=>console.log(err))
  }

  exports.getadminproducts = (req, res, next) => {  
    Product.fetchAll()
    .then(products =>{
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Product',
        path: '/admin/products'
      });
    });
  }

  exports.geteditproducts = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product =>{
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product : product,
        editing : editMode
      });

    })
    .catch(err=>console.log(err))
  }
  
  exports.posteditproducts = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedtitle = req.body.title;
    const updatedimageUrl = req.body.imageUrl;
    const updatedprice = req.body.price;
    const updateddescription = req.body.description;
    
    const product = new Product(updatedtitle,updatedprice,updateddescription,updatedimageUrl, prodId)
    product.save()
    .then(result=>{
      console.log("UPDATED");
      res.redirect('/admin/products')
    })
    .catch(err=>console.log(err))
    
  }

  exports.postdeleteproduct = (req, res, next) =>{
    const prodId = req.body.productId;
    Product.deleteById(prodId)
    .then(()=>{
      console.log('DESTROYED!');
      res.redirect('/admin/products')
    })
    .catch(err=>{
      console.log(err)
    });
  }

  
  