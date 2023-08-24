const express = require("express");
const app = express();
const router = new express.Router();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");

//importing schemas
const Hr = require("../modules/Hr");
const Manager = require("../modules/ProjectManager");
const Employee = require("../modules/Employee");

router.post("/login", async (req, res) => {

  const { id, password, person } = req.body;

  if (person === "HR") {
    console.log(id);
    console.log(password);
    const hr = await Hr.findOne({ id: id });
    try {

      if (hr) {
        const passwordHr = await bcrypt.compare(password, hr.password);
        if (passwordHr) {
          const token = await hr.generateAuthToken();
          res.cookie("hrToken", token, {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          })
          res.cookie('person', 'hr', {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          })
          res.status(201).json({ name: hr.name, id: hr.id, success: "HR login successful" });
        } else {
          res.status(401).json({ error: "Invalid credentials of Hr" });
        }
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (person === "employee") {
    try {
      const emp = await Employee.findOne({ id });

      if (emp) {
        console.log('emp :>> ', emp);
        const passwordEmp = await bcrypt.compare(password, emp.password);

        if (passwordEmp) {
          const token = await emp.generateAuthToken();
          console.log('token in route :>> ', token);
          res.cookie("employeeToken", token, {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          })
          res.cookie('person', 'employee', {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          })
          res.status(201).json({ name: emp.name, id: emp.id, success: "Employee login successful" });
        } else {
          res.status(401).json({ error: "Invalid credentials of Employee" });
        }
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (person === "manager") {
    try {
      const manager = await Manager.findOne({ id });

      if (manager) {
        const passwordManager = await bcrypt.compare(password, manager.password);
        if (passwordManager) {
          const token = await manager.generateAuthToken();
          res.cookie("managerToken", token, {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          })
          res.cookie('person', 'manager', {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          })

          return res.status(201).json({ name: manager.name, id: manager.id, success: "Manager login successful" });
        } else {
          return res.status(401).json({ error: "Invalid credentials of Manager" });
        }
      }
    } catch (error) {
      console.log("err:", error);
    }
  }
});

router.get('/logout', (req, res) => {
  console.log('req.cookies :>> ', req.cookies);
  if (req.cookies.person === 'employee') {
    res.clearCookie('employeeToken');
    res.clearCookie('person')
  }
  else if (req.cookies.person === 'manager') {
    res.clearCookie('managerToken');
    res.clearCookie('person')
  }
  else if (req.cookies.person === 'hr') {
    res.clearCookie('hrToken');
    res.clearCookie('person')
  }

  return res.json({ loggedOut: req.cookies.person + " logged out" })
})

router.post("/register", async (req, res) => {
  const { id, password, person } = req.body;

  if (req.body.person === "addHr") {
    const findId = await Hr.findOne({ id });
    try {

      if (!findId) {
        const data = new Hr(req.body);
        await data.save();
        res.status(201).json({ success: "Hr Signup successful" });
      } else {
        res.status(401).json({ error: "Signup fail for Hr" });
      }

    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Signup fail for Hr" });
    }
  }
  else if (req.body.person === "addManager") {
    try {
      const findId = await Manager.findOne({ id: id });

      if (!findId) {
        const data = new Manager(req.body);
        await data.save();
        res.status(201).json({ success: "Manager Signup successful" });
      } else {
        res.status(401).json({ error: "Signup fail for Manager" });
      }

    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Signup fail for Manager" });
    }
  }
  else if (req.body.person === "addEmployee") {
    try {
      const findId = await Employee.findOne({ id: id });

      if (!findId) {
        const data = new Employee(req.body);
        await data.save();
        res.status(201).json({ success: "Employee Signup successful" });
      } else {
        res.status(401).json({ error: "Signup fail for Employee" });
      }

    } catch (error) {
      console.log(error);
      res.status(401).json({ error: "Signup fail for Employee" });
    }
  }
})

router.get("/sendMail",async(req,res)=>{
  const{email,link} = req.body;

  try {
    const userExistence = await Employee.findOne({email:email});
    if (userExistence) {
      const password = userExistence.password;
      const idd = userExistence.id;
        //sending mail
        let mailTransporter = nodemailer.createTransport({
          service:"gmail",
          auth:{
            user:"asur0000000@gmail.com",
            pass: "kctlxsfiokgpendr"
          }
        })
        let details = {
          from: "asur000000@gmail.com",
          to:"viharp2002@gmail.com",
          subject:"Welcome to Artecho Solution",
          text:`Your ID: ${idd}
          Your password: ${password}`
        }

        mailTransporter.sendMail(details,(err)=>{
          if (err) {
            console.log(err);
          }else{
            console.log("Email is sent successfully");
            res.send("Successfully sent mail");
          }
        })
    }else{
      res.status(401).json({ error: "No mail found" });    }
  } catch (error) {
    console.log(error);
  }
})
module.exports = router;