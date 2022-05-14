const mysql= require("mysql");
const Connection = require("mysql/lib/Connection");
//MY SQL
const conn=mysql.createPool({
    connectionLimit:10,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

//ROUTER
exports.view=(req, res)=>{
//check database connection
conn.getConnection((err,Connection)=>{
 if(err) throw err
    //console.log("connection success");
    Connection.query("select*from users",(err,rows)=>{
        Connection.release();
        if(!err){
           // console.log("Good");
            res.render("home",{rows});
        }else{
            console.log("Error in listing data" +err);
        }
    });
});

};

exports.adduser=(req,res)=>{
    res.render("adduser");
}
//save
exports.save=(req,res)=>{
    conn.getConnection((err,Connection)=>{
        if(err) throw err

           const {name,age,city}=req.body;

           Connection.query("insert into users (name,age,city) values(?,?,?)",[name,age,city],(err,rows)=>{
               Connection.release();
               if(!err){
                  // console.log("Good");
                   res.render("adduser",{msg:"User Details Added successfully"});
               }else{
                   console.log("Error in listing data" +err);
               }
           });
       });
       
}
exports.edituser=(req,res)=>{
    conn.getConnection((err,Connection)=>{
        if(err) throw err
        //get id from url
        let id=req.params.id;
           //console.log("connection success");
           Connection.query("select*from users where id=?",[id],(err,rows)=>{
               Connection.release();
               if(!err){
                  // console.log("Good");
                   res.render("edituser",{rows});
               }else{
                   console.log("Error in listing data" +err);
               }
           });
       });
       

}

exports.edit=(req,res)=>{
    conn.getConnection((err,Connection)=>{
        if(err) throw err

           const {name,age,city}=req.body;
           let id=req.params.id;
           Connection.query("update users set name=?,age=?,city=? where id=?",[name,age,city,id],(err,rows)=>{
               Connection.release();
               if(!err){
                   

                conn.getConnection((err,Connection)=>{
                    if(err) throw err
                    //get id from url
                    let id=req.params.id;
                       //console.log("connection success");
                       Connection.query("select*from users where id=?",[id],(err,rows)=>{
                           Connection.release();
                           if(!err){
                              // console.log("Good");
                             
                               
                               res.render("edituser",{rows,msg:"User Details Updated successfully"});
                           }else{
                               console.log("Error in listing data" +err);
                           }
                       });
                   });
                  // console.log("Good");
                  
                }
           });
       });
       
}

exports.delete=(req,res)=>{
    conn.getConnection((err,Connection)=>{
        if(err) throw err
        //get ID from url
        let id=req.params.id;
        Connection.query("delete from users where id=?",[id],(err,rows)=>{
            Connection.release();
            if(!err){
                res.redirect("/");
            }else{
                console.log(err);
            }
        });

    });
}