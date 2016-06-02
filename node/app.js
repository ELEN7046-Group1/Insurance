var express = require('express');
var bodyparser = require('body-parser');
 
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("content-type", "application/json");
    next();
});

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var connection = require('./connection');
var routes = require('./routes');

connection.init();
routes.configure(app);

var http = require('http');

var server = app.listen(80, function () {
    console.log('Server listening on port ' + server.address().port);
});
