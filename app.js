const express =require("express");
const exphbs =require("express-handlebars");
const bodyparser=require("body-parser");
const mysql =require("mysql");
const Router= require('router');
const Connection = require("mysql/lib/Connection");
const stack= require('stack');


require('dotenv').config();

const app=express();

const port =process.env.PORT ||5500;

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//static files
app.use(express.static("public"));

//Template Engine
const handlebars =exphbs.create({extname:".hbs"});
app.engine('hbs',handlebars.engine);
app.set("view engine","hbs");

// //my sql
// const conn=mysql.createPool({
//     connectionLimit:10,
//     host : process.env.DB_HOST,
//     user : process.env.DB_USER,
//     password : process.env.DB_PASS,
//     database : process.env.DB_NAME
// });
// //check database connection
// conn.getConnection((err,Connection)=>{
//     if(err) throw err
//     console.log("connection success");
// });


//Router
// app.get('/',(req, res)=>{
//     res.render("home");
// });

const routes=require("./server/routes/students");
app.use('/',routes);

//listen port 
app.listen(port,()=>{
    console.log("server running on : " +port);
});