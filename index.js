var express = require("express");
var bodyParser = require("body-parser");
var path = require('path');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = "supersecretstarwars" || process.env.JWT_SECRET;
var app = express();
var mongoose = require("mongoose");

var User = require('./models/user');
// mongoose.connect();
mongoose.connect('mongodb://localhost/nanopetusers');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use('/api/users', expressJWT({secret: secret}).unless({
  path: [{ url: '/api/users', methods: ['POST'] },
  {url: '/api/users/auth', methods: ['POST'] }]
}), require('./controllers/users'));

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'You need a login token to view this page.' });
  }
});


app.get("/*", function(req, res) {
	console.log("hello from the backend");
	res.sendFile(__dirname + "/public/index.html");
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;