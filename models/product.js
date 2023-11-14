const mongodb =require('mongodb');
const getdb = require('../util/database').getDb;
const objectId = mongodb.ObjectId;

class product {
    constructor(title, price, description, imageUrl, id, userId){
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new objectId(id) : null;
        // ? new objectId(id);
        this.userId = userId;
    }

    save(){
        let dbOp;
        const db = getdb();
        if (this._id) {
            dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        
        return dbOp
        .then(result=>{
            console.log(result);
            console.log("succes");
        })
        .catch(err=>{
            console.log(err);
        });


    }

    static fetchAll(){
        const db = getdb();
        return db.collection('products').find().toArray()
        .then(products=>{
            return products;
        })
        .catch(err=>{
            console.log(err);
        });
    }

    static findById(prodId){
        const db = getdb();
        return db.collection('products').findOne({_id: new objectId(prodId) })
        .then(product=>{
            return product;
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static deleteById(prodId) {
        const db = getdb();
        return db
          .collection('products')
          .deleteOne({ _id: new mongodb.ObjectId(prodId) })
          .then(result => {
            // console.log('Deleted');
          })
          .catch(err => {
            console.log(err);
          });
      }
}

module.exports = product;