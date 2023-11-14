const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const admincontroller = require('../controllers/admin');



// // /admin/add-product => GET
router.get('/add-product', admincontroller.getaddproducts );

// // /admin/add-product => POST
router.post('/add-product', admincontroller.postaddproducts);

// // /admin/products => get
router.get('/products', admincontroller.getadminproducts);

router.get('/edit-product/:productId', admincontroller.geteditproducts);

router.post('/edit-product', admincontroller.posteditproducts);

router.post('/delete-product',admincontroller.postdeleteproduct);



 module.exports.routes = router;

