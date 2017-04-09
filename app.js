/**
 * Created with IntelliJ IDEA.
 * User: rahul
 * Date: 08/04/17
 * Time: 10:22 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require("./config");
var bodyParser = require('body-parser');

// initialize mongo connection
mongoose.connect(config.mongo_db);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./models/bird');

app.use(require('./routes'));

// catch 404
app.use(function(req, res) {
    res.status(404);
    res.send({error: "Not Found"});
});

// catch internal server error
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({error: err.message});
});

// start listening to requests
app.listen(config.application_port_number, function () {
    console.log('Birds registry running on port ' + config.application_port_number);
});

module.exports = app;