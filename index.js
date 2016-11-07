var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

// mongoose.connect();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.get("/*", function(req, res) {
	console.log("hello from the backend");
	res.sendFile(__dirname + "/public/index.html");
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;