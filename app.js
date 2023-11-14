const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorcontroller = require('./controllers/error');

const mongodb = require('mongodb')
const mongoConnect = require('./util/database').mongoConnect;

const User = require('./models/user');


const app = express();
 


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findUser('6547f51aa1d6263b7e6dfb7c')
    .then(user=>{
        req.user = new User(user.name, user.email, user.cart, user._id);
        // console.log(user);
        next();
    })
    .catch(err=>console.log(err));
    
});

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorcontroller.get404);


mongoConnect(()=>{
    console.log('DB connected');
    console.log("Running on port : 3000");
app.listen(3000);
})


