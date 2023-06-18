const express = require('express');

const bodyparser = require('body-parser');
const path = require('path');

const app = express();

const rootDir = require('./util/path')

const adminrouter = require('./routes/admin');
const shoprouter = require('./routes/shop');

app.use(bodyparser.urlencoded({extended : false}));
app.use(express.static(path.join(rootDir, 'public')));


app.use('/admin',adminrouter);
app.use(shoprouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

})



app.listen(3000);