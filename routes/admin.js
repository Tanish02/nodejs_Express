const express = require('express');

const path = require('path');

const Router = express.Router();

const rootDir = require('../util/path')

Router.use('/',(req, res, next) => {
    console.log('This always runs!');
    next();
  });
  
  Router.use('/add-product',(req, res, next)=>{
      console.log('In another Middleware!');
      res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    });
  
  Router.post('/product',(req, res, next) =>{
      console.log(req.body);
      res.redirect('/');
  });

  module.exports = Router;