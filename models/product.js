const product  = [];

module.exports = class Product{

    constructor(title){
        this.title=title;
    }

    save(){
        product.push(this)
    }

    static fetchAllProducts(){
        return product;
    }
}