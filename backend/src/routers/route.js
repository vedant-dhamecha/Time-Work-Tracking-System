const express = require("express");
const app = express();
const router = new express.Router();
const bcrypt = require("bcryptjs");

//importing schemas
const Hr = require("../modules/Hr");
const Manager = require("../modules/ProjectManager");
const Employee = require("../modules/Employee");

router.post("/login", async (req, res) => {

  const { id, password, person } = req.body;
 
  if (person === "HR") {
    console.log(id);
    console.log(password);
    const hr = await Hr.findOne({ id:id });
    try {

      if (hr) {
        const passwordHr = await bcrypt.compare(password,hr.password);
        if (passwordHr) {
          res.status(201).json({ success: "HR login successful" });
        } else {
          res.status(401).json({ error: "Invalid credentials of Hr" });
        }
      } else {
        res.status(401).json({ error: "Invalid credentials of HR" });
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (person === "employee") {
    const emp = await Employee.findOne({ id:id });
    try {

      if (emp) {
        const passwordEmp = await bcrypt.compare(password,emp.password);
        if (passwordEmp) {
          res.status(201).json({ success: "Employee login successful" });
        } else {
        res.status(401).json({ error: "Invalid credentials of Employee" });
        }
      } else {
        res.status(401).json({ error: "Invalid credentials of Employee" });
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (person === "manager") {
    const manager = await Manager.findOne({ id:id });
    try {

      if (manager) {
        const passwordManager = await bcrypt.compare(password,manager.password);
        if (passwordManager) {
          res.status(201).json({ success: "Manager login successful" });
        } else {
        res.status(401).json({ error: "Invalid credentials of Manager" });
        }
      } else {
        res.status(401).json({ error: "Invalid credentials of Manager" });
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
});

router.post("/register",async(req,res)=>{
  const { id, password, person } = req.body;

  if (req.body.person === "addHr") {
    const findId = await Hr.findOne({id:id});
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
      const findId = await Manager.findOne({id:id});

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
      const findId = await Employee.findOne({id:id});

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
module.exports = router;