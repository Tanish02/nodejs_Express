const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
 
const Productscontroller = require('../controllers/products');

const router = express.Router();

router.get('/', Productscontroller.getproducts);

module.exports = router;
