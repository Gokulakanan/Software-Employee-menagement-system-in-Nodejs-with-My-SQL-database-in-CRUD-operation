const express =require("express");
const router= express.Router();
//Router
const studentcontroller=require("../controllers/students_controller");
//view all records
router.get("/",studentcontroller.view);

//add new records
router.get("/adduser",studentcontroller.adduser);
router.post("/adduser",studentcontroller.save);
// router.get('/',(req, res)=>{
//     res.render("home");
// });

//update records
router.get("/edituser/:id",studentcontroller.edituser);
router.post("/edituser/:id",studentcontroller.edit);

//delete users
router.get("/deleteuser/:id",studentcontroller.delete);


module.exports=router;