var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const mysql = require('mysql2');
var sqlite3 = require('sqlite3').verbose();  
var app = express();

const router = express.Router();
const rootDir = require('../util/path');
var responsecode;
var round_num;

//var db = new sqlite3.Database(dbFile);

/*var db = new sqlite3.Database('./round2.sqlite',(err)=>{
	if (err) {
	  return console.error(err.message);
	}
	console.log('Connected to the in-memory SQlite database.');
}); 
*/
const db = mysql.createConnection({
	host: process.env.DATABASE_HOST || '127.0.0.1',
	user: 'root',
	password: 'fJR3AvgmVyQtrTXp',
	//password: 'root',
	database: 'sqli_challenge'
  });
db.connect((err) => {
	if (err) throw err;
	console.log('Connected!');
});


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get('/', function(request, response,next) {
	round_num = request.session.round;
	responsecode = 100;
	response.render('login.ejs', { title: 'Home', data: responsecode, round: round_num});
	//response.sendFile(path.join(rootDir,'views','login.ejs'));
});

app.post('/auth', function(request, response,next) {
	
	var username = request.body.username;
	var upper_username = request.body.username.toUpperCase();
	//console.log(upper_username);
	var password = request.body.password;
	var upper_password = request.body.password.toUpperCase();
	/*let sql2 = 'SELECT * from users';
	db.query(sql2, (err,rows) => {
		if(err) throw err;
	  
		console.log('Data received from Db:');
		console.log(rows);
	  });
	*/
	//var sql = "SELECT * FROM Users where username="+username+" AND password="+password;
	//console.log(sql);
	console.log(request.session.round);
	var sql;
	
	if(upper_username.includes('+') || upper_username.includes(';') || upper_username.includes('CREATE') || upper_username.includes('DROP') || upper_username.includes('ALTER') || upper_username.includes('INSERT') || upper_username.includes('UPDATE') || upper_username.includes('DELETE') || upper_username.includes('GRANT') || upper_username.includes('REVOKE') || upper_username.includes('COMMIT') || upper_username.includes('ROLLBACK') || upper_username.includes('SAVEPOINT') || upper_username.includes('EXISTS') || upper_username.includes('JOIN') || upper_username.includes('LIKE') || upper_username.includes('TRUNCATE') || upper_username.includes('WHERE') || upper_username.includes('CASE') || upper_username.includes('LIKE') || upper_username.includes('WITH') || upper_username.includes('EXEC')){
		console.log("username has malicious query");
		responsecode=0;
		round_num = request.session.round;
		response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
	}
	if(upper_password.includes('+') || upper_password.includes(';') || upper_password.includes('CREATE') || upper_password.includes('DROP') || upper_password.includes('ALTER') || upper_password.includes('INSERT') || upper_password.includes('UPDATE') || upper_password.includes('DELETE') || upper_password.includes('GRANT') || upper_password.includes('REVOKE') || upper_password.includes('COMMIT') || upper_password.includes('ROLLBACK') || upper_password.includes('SAVEPOINT') || upper_password.includes('EXISTS') || upper_password.includes('JOIN') || upper_password.includes('LIKE') || upper_password.includes('TRUNCATE') || upper_password.includes('WHERE') || upper_username.includes('CASE') || upper_password.includes('LIKE') || upper_password.includes('WITH') || upper_password.includes('EXEC')){
		responsecode=0;
		round_num = request.session.round;
		response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
	} 
	if(request.session.round==1){
		var round1_reg = /^[A-za-z]{1,5}' or [A-Za-z0-9'=#]*$/g;
		sql = "SELECT * from Users where username= '" + username + "' and password ='" + password + "'";
		console.log(sql);
		// simple payload check
		if(username.includes("admin'--") || username.includes("admin'#")){
			responsecode=0;
			round_num = request.session.round;
			response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
		}
		// check if query matches the required regex
		else if (username.match(round1_reg) || password.match(round1_reg)) {
			db.query(sql, (err,rows) =>  {
				if (err) {
					console.log("error query");
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else if(rows.length>=1){
					//console.log(rows);
					request.session.round=2;
					responsecode=1;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else{
					//console.log(rows);
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
			});
		}
		//prolly a malicious query
		else{
			console.log("regex no match")
			responsecode=0;
			round_num = request.session.round;
			response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
		}
	}
	else if(request.session.round==2){
		var sql = "SELECT username from Users where username= '" + username + "' and password ='" + password + "'";
		console.log(sql);
		db.query(sql, (err,rows) =>  {
			//check if the injection chooses the correct secret table or not
			if(sql.includes('secret_table'))
			{
				if (err) {
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else if(rows.length==1){
					request.session.round=3;
					responsecode=1;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else{
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
			}
			else{
				responsecode=0;
				round_num = request.session.round;
				response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
			}
		});
	}
	else if(request.session.round==3){
		username = username.toLowerCase();
		password = password.toLowerCase();
		var clean_username;
		var clean_password;
		if(username.includes("union")){
			clean_username = username.replace("union","");
		}
		if(username.includes("select")){
			clean_username = clean_username.replace('select','');
		}
		if(password.includes("union")){
			clean_password = password.replace('union','');
		}
		if(password.includes("select")){
			clean_password = clean_password.replace('select','');
		}
		console.log(clean_username);
		var sql = "SELECT username from Users where username= '" + clean_username + "' and password ='" + clean_password + "'";
		console.log(sql);
		if(sql.includes('secret_table')){
			db.query(sql, (err,rows) =>  {
				if (err) {
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else if(rows.length==1){
					request.session.round=4;
					responsecode=1;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else{
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
			});
		}
		
	}
	else if(request.session.round==4){
		lower_username = username.toLowerCase();
		lower_password = password.toLowerCase();
		if(lower_username.includes("char") || lower_password.includes("char"))
		{
			responsecode=0;
			round_num = request.session.round;
			response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
		}
		if(username.includes("union") || username.includes("UNION") || password.includes("UNION") || password.includes("union") || password.includes("from") || password.includes("FROM")){
			responsecode=0;
			round_num = request.session.round;
			response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
			//response.sendFile(path.join(rootDir,'views','login.ejs'));
		}
		if(username.includes("select") || username.includes("SELECT") || password.includes("SELECT") || password.includes("select") || username.includes("from") || username.includes("FROM")){
			responsecode=0;
			round_num = request.session.round;
			response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
			//response.sendFile(path.join(rootDir,'views','login.ejs'));
		}
		else{
			var sql = "SELECT username from Users where username= '" + username + "' and password ='" + password + "'";
			db.query(sql, (err,rows) => {
				if (err) {
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else if(rows.length==1){
					request.session.round=5;
					responsecode=1;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else{
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
			});
		}
	}
	else if(request.session.round==5){
		lower_username = username.toLowerCase();
		lower_password = password.toLowerCase();
		if(lower_username.includes("char") || lower_password.includes("char"))
		{
			responsecode=0;
			round_num = request.session.round;
			response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
		}
		if(username.includes(" ") || password.includes(" ")){
			responsecode=0;
			round_num = request.session.round;
			response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
			console.log(spaces);
			//response.sendFile(path.join(rootDir,'views','login.ejs'));
		}
		else{
			var sql = "SELECT username from Users where username= '" + username + "' and password ='" + password + "'";
			console.log(sql);
			db.query(sql, (err,rows) => {
				if (err) {
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else if(rows.length==1){
					console.log("finished!");
					request.session.round=6;
					responsecode=1;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
				else{
					responsecode=0;
					round_num = request.session.round;
					response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
				}
			});
		}
	}
	else{
		responsecode=1;
		round_num = 1;
		response.render('login.ejs', { title: 'login', data: responsecode, round: round_num});
	}
});

module.exports = app;