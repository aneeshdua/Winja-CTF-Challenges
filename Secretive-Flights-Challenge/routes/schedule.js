var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//console.log('here1');
// another routes also appear here
// this script to fetch data from MySQL databse table

app.get('/', function(request, response, next) {
    console.log('herer');
    var login_status = request.session.loggedin;
    response.render('schedule.ejs', { title: 'Flight Schedule', data: login_status});
});

module.exports = app;