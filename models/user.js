const mongodb =require('mongodb');
const { get } = require('../routes/shop');
const getdb = require('../util/database').getDb;
const objectId = mongodb.ObjectId;

class User  {
    constructor(username, email, cart, id ){
        this.name = username,
        this.email = email,
        this.cart = cart; //{item: }
        this._id = id;
    }

    save(){
        const db = getdb();
        db.collection('users').insertOne(this);
    }

    static findUser(id){

        const db = getdb();
        return db
        .collection('users').findOne({_id: new objectId(id)});
        // .then(result=> console.log('USER IS FOUND'))
        // .cathch(err => onsole.log(err));

    }

    addToCart(product) {
        const cartProductIndex = this.cart.items.findIndex(cp => {
          return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];
    
        if (cartProductIndex >= 0) {
          newQuantity = this.cart.items[cartProductIndex].quantity + 1;
          updatedCartItems[cartProductIndex].quantity = newQuantity;
        } else {
          updatedCartItems.push({
            productId: new objectId(product._id),
            quantity: newQuantity
          });
        }
        const updatedCart = {
          items: updatedCartItems
        };

        // const updatedCart = { items : [{...product, quantity : 1}]}; 
        const db = getdb();
        return db
          .collection('users')
          .updateOne(
            { _id: new objectId(this._id) },
            { $set: { cart: updatedCart } }
          );
          // console.log(this.cart.items);
      }

      getcart(){
        // return this.cart;
        const productsId = this.cart.items.map(i =>{
          return i.productId;
        }) 

        const db = getdb();
        return db
        .collection('products').find({_id : {$in : productsId}})
        .toArray()
        .then(products =>{
          return products.map(p =>{
            return {...p, quantity : this.cart.items.find(i =>{
              return i.productId.toString() === p._id.toString()
            }).quantity
          }
          })
        })
      }

      deleteCartItem(prodId){
        const updatedCart = this.cart.items.filter(i =>{
          return i.productId.toString() !== prodId.toString();
        })
        const db = getdb();
        return db.collection('users')
        .updateOne(
          { _id: new objectId(this._id) },
          { $set: { cart: {items: updatedCart} } }
        );
      }
      
      addToOrder(){
        const db = getdb();
        return this.getcart().then(products =>{
          const order = {
            items : products,
            user :{
              _id : new objectId(this._id),
              user : this.name
            }
          };
          return db.collection('orders').insertOne(order)
        })
        .then(result =>{
          this.cart = [];
          return db.collection('users').updateOne(
            {_id : new objectId(this._id)},
            {$set :{cart : {items : [] } } }
          )
        })
        .catch(err =>{
          console.log(err);
        })
      }

      getOrders(){
        const db = getdb();
        return db.collection('orders').find({'user._id' : new objectId(this._id)}).toArray()
      }

}

module.exports = User;