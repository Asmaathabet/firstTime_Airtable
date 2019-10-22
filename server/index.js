const { join } = require('path');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'..','public')));

app.set('view engine', 'ejs');
app.use('/upload', router);

app.listen(port, function () {
  console.log('Server is running on PORT',port);
});