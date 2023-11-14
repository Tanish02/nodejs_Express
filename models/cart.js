const fs = require('fs');

const path = require('path');

const rootdir = require('../util/path');

const p = path.join(rootdir, 'data', 'cart.json');

module.exports = class cart {
    
    static addtocart(id ,productPrice){
        fs.readFile(p,(err, fileContent) =>{
            let cart = {products : [], totalPrice : 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            const existingProductINdex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductINdex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct ={ ...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1; 
                cart.products[existingProductINdex] = updatedProduct; 
            }
            else{
                updatedProduct = {id : id, qty : 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err =>{
                // console.log(err);
            })
        })

    }

    static deletproduct(id,productPrice){
        fs.readFile(p,(err, fileContent) =>{
            
            if (!err) {
                let cart = JSON.parse(fileContent);

                const updatedcart = {...cart};
                const product = updatedcart.products.find(p=>p.id===id);
                if (!product) {
                    return;
                }
                updatedcart.products =updatedcart.products.filter( p=>p.id !==id );
                updatedcart.totalPrice = updatedcart.totalPrice - productPrice * product.qty;
                fs.writeFile(p,JSON.stringify(updatedcart),err =>{
                    console.log(err);
                })
            }
        })
    }
    

    static getCart(cb){
        fs.readFile(p,(err, fileContent) =>{
            
            if (!err) {
                let cart = JSON.parse(fileContent);
                cb(cart);
            }else{
                return cb([]);
            }
        })   

    }

}