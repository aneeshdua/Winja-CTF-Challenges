//Connecting to db
var sqlite3 = require('sqlite3').verbose();  
var db = new sqlite3.Database('./sqli.db3',(err)=>{
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});  

//Creating Table
db.serialize(function() {  
  db.run("CREATE TABLE IF NOT EXISTS Users (username TEXT, password TEXT)");  
});
console.log("Table Created!");

//Inserting values
db.serialize(function() {  
  db.run("INSERT into Users(username,password) VALUES ('admin',7R2,tfAp)");  
  db.run("INSERT into Users(username,password) VALUES ('tom',P$JBr8$/)");
  db.run("INSERT into Users(username,password) VALUES ('dick',4%Vyr;?W)");
  db.run("INSERT into Users(username,password) VALUES ('harry',463E=utz)");  
});  
console.log("Values Inserted");


module.exports = db;
