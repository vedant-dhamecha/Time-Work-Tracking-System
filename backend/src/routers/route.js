const express = require("express");
const app = express();
const router = new express.Router();

//importing schemas
const Hr = require("../modules/Hr");
const Manager = require("../modules/ProjectManager");
const Employee = require("../modules/Employee");

router.post("/login", async (req, res) => {

  const { uid, password, person } = req.body;

  if (person === "HR") {
    // const {email,password,person} = req.body;
    const hr = await Hr.findOne({ id: uid });
    try {

      if (hr) {
        console.log('hr :>> ', hr);
        if (password === hr.password) {
          res.status(201).json({ success: "HR login successful" });
        } else {
          new Error("Invalid credentials");
        }
      } else {
        res.status(401).json({ error: "Invalid credentials of HR" });
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (person === "employee") {
    // const {email,password,person} = req.body;
    const emp = await Employee.findOne({ id: uid });
    try {

      if (emp) {
        console.log('emp :>> ', emp);
        if (password === emp.password) {
          res.status(201).json({ success: "Employee login successful" });
        } else {
          new Error("Invalid credentials");
        }
      } else {
        res.status(401).json({ error: "Invalid credentials of Employee" });
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (person === "manager") {
    // const {email,password,person} = req.body;
    const manager = await Manager.findOne({ id: uid });
    try {

      if (manager) {
        console.log('manager :>> ', manager);
        if (password === manager.password) {
          res.status(201).json({ success: "Manager login successful" });
        } else {
          new Error("Invalid credentials");
        }
      } else {
        res.status(401).json({ error: "Invalid credentials of Manager" });
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (req.body.person === "addEmployee") {
    // const {username,id,email,password,person} = req.body;

    try {
      const data = new Employee(req.body);
      await data.save();
      res.send("ok")
    } catch (error) {
      console.log(error);
    }
  }

});
module.exports = router;