
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

const router = express.Router();
const rootDir = require('../util/path');


var app = express();

app.get('/', function(request, response,next) {
	response.sendFile(path.join(rootDir,'views','admin.html'));
});

app.post('/auth', function(request, response,next) {
	console.log(request.body);
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		if (username=="SMD_ADMIN" && password=="zag12wsx") {
			request.session.loggedin = "loggedin";
			request.session.username = username;
			response.redirect('/');
		} else {
			response.send('Incorrect Username and/or Password!');
		}			
		response.end();
	} 
	else {
		response.send('Please enter Username and Password!');
		response.end();
	}
	
	
});



module.exports = app;