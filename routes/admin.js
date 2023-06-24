const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const Productscontroller = require('../controllers/products');



// /admin/add-product => GET
router.get('/add-product', Productscontroller.getaddproducts );

// /admin/add-product => POST
router.post('/add-product', Productscontroller.postaddproducts);

 module.exports.routes = router;

