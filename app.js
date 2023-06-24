const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorcontroller = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(errorcontroller.get404);


console.log("Running on port : 3000");
app.listen(3000);