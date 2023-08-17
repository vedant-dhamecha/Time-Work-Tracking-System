const express = require("express");
const app = express();
const router = new express.Router();
 
//importing schemas
const HrData = require("../modules/Hr");
const ProjectManagerData = require("../modules/ProjectManager");
const EmployeeData = require("../modules/Employee");

router.post("/loginSignup",async(req,res)=>{
  
  if(req.body.role==="hrLogin"){
    // const {email,password,role} = req.body;
      const mail = await HrData.findOne({email:email});
      try {
   
        if (mail) {
           if (password===mail.password) {
               res.status(201).send("Done");
           }else{
               new Error("Invalid Creditianls1");
           }
        } else {
           res.status(401).json({error: "Invalid Creditianls"});
        }
   
      } catch (error) {
       console.log(error);
      }
    }
    else if(req.body.role==="employeeLogin"){
    // const {email,password,role} = req.body;
      const mail = await EmployeeData.findOne({email:email});
      try {
   
        if (mail) {
           if (password===mail.password) {
               res.status(201).send("Done");
           }else{
               new Error("Invalid Creditianls1");
           }
        } else {
           res.status(401).json({error: "Invalid Creditianls"});
        }
   
      } catch (error) {
       console.log(error);
      }
    }
    else if(req.body.role==="projectManagerLogin"){
    // const {email,password,role} = req.body;
      const mail = await ProjectManagerData.findOne({email:email});
      try {
   
        if (mail) {
           if (password===mail.password) {
               res.status(201).send("Done");
           }else{
               new Error("Invalid Creditianls1");
           }
        } else {
           res.status(401).json({error: "Invalid Creditianls"});
        }
   
      } catch (error) {
       console.log(error);
      }
    }
    else if(req.body.role==="addEmployee"){   
        // const {username,id,email,password,role} = req.body;
      
        try {
          const data = new EmployeeData(req.body);
          await data.save();
          res.send("ok")
        } catch (error) {
          console.log(error);
        }
    }

});
module.exports = router;