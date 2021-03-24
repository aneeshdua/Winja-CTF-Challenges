const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');

//const db = require('./util/database');

const loginRoutes = require('./routes/login');
const { request } = require('express');

app.use(session({
	secret: "secret",
	resave: true,
	saveUninitialized: true,
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
//app.set('views', path.join(__dirname, '../views'))

app.use('/login', loginRoutes);

app.get('/',(request,response,next) =>{
	request.session.round=1;
	response.render('index.ejs', { title: 'Clumsy Interns'});
    //res.sendFile(path.join(__dirname,'views','index.html'));
})


app.listen(3000);