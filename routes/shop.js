const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
 
const Shopcontroller = require('../controllers/shop');

const router = express.Router();

router.get('/', Shopcontroller.getindex);

router.get('/products', Shopcontroller.getproducts)

// router.get('/products/:productId', Shopcontroller.getproduct)

router.post('/product', Shopcontroller.postproduct)

router.get('/cart', Shopcontroller.getcart);

router.post('/cart' , Shopcontroller.postcart);

router.post('/delete-cartproduct', Shopcontroller.postDeleteCartProduct);

// router.get('/checkout', Shopcontroller.getcheckout);

router.post('/create-order', Shopcontroller.postorder);

router.get('/orders', Shopcontroller.getorders);



module.exports = router;
