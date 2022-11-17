const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const app = express();
const bcrypt = require('bcryptjs');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
//create connection

dotenv.config({path: './.env'});
const db = mysql.createConnection({
   host     : process.env.DATABASE_HOST,
   user     : process.env.DATABASE_USER,
   password : process.env.DATABASE_PASSWORD,
   database : process.env.DATABASE
});


//parse url encoded bodies
app.use(express.urlencoded({extended: false}));

//parse json bodies
app.use(express.json());

app.set('view engine','ejs');

//connect
db.connect(function(err){
   if(err){throw err}
   console.log('Mysql connected...');
});

//define routes
app.use('/',require('./routes/pages'));
app.use('/auth_route',require('./routes/auth_route'));

app.listen(3000,() => {
  console.log('Server started on port 3000')
});