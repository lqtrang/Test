var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); 
var index = require('./routes/index');
const app = express();
var port = 3000;

app.set('views', path.join(__dirname, 'homepage'));
app.set('views engie', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);

app.listen(port)