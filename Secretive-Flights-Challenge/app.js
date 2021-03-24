const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

const adminRoutes = require('./routes/admin');
const schedRoutes = require('./routes/schedule');
const { Console } = require('console');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
//app.set('views', path.join(__dirname, '../views'))

console.log("Instance is up!")
app.use('/admin', adminRoutes);

app.use ('/schedule', schedRoutes);

app.get('/robots.txt',(request,response,next) =>{
	response.type('text/plain')
    response.sendFile(path.join(__dirname,'robots.txt'));
})

app.get('/usernames.txt',(request,response,next) =>{
	response.type('text/plain')
    response.sendFile(path.join(__dirname,'usernames.txt'));
})
app.get('/passwords.txt',(request,response,next) =>{
	response.type('text/plain')
    response.sendFile(path.join(__dirname,'passwords.txt'));
})

app.get('/',(request,response,next) =>{
	var login_status = request.session.loggedin;
    response.render('index.ejs', { title: 'Home', data: login_status});
    //res.sendFile(path.join(__dirname,'views','index.html'));
})


app.listen(3000);