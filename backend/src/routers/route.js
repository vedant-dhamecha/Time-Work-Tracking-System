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
      } else {
        res.status(401).json({ error: "HR does not exist" });
      }

    } catch (error) {
      console.log("err:", error);
    }
  }
  else if (person === "employee") {
    try {
      const emp = await Employee.findOne({ id });

      if (emp) {
        const passwordEmp = await bcrypt.compare(password, emp.password);

        if (passwordEmp) {
          const token = await emp.generateAuthToken();
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
      } else {
        res.status(401).json({ error: "Employee does not exist" });
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
      } else {
        res.status(401).json({ error: "Manager does not exist" });
      }
    } catch (error) {
      console.log("err:", error);
    }
  }
});

router.get('/logout', (req, res) => {
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
  try {
    console.log("hiii")
    const { name, id, dob, designation, email, password, mobile, gender, address, joiningDate, registerFor, imgValue } = req.body;
    console.log("biii")
    console.log(registerFor)
    if (registerFor === 'manager') {

      const findId = await Manager.findOne({ id });
      const findMobile = await Manager.findOne({ mobile });
      const findEmail = await Manager.findOne({ email });

      if (findId) {
        return res.status(422).json({ error: "Manager ID already exist" })
      }
      else if (findMobile) {
        return res.status(422).json({ error: "Manager mobile already exist" })
      }
      else if (findEmail) {
        return res.status(422).json({ error: "Manager email already exist" })
      }
      const data = new Manager({ name, id, dob, email, password, mobile, gender, joiningDate, address, imgValue });
      await data.save();
      return res.status(201).json({ success: "Manager successfully registered" });
    }
    else if (registerFor === "employee") {
      const findId = await Employee.findOne({ id });
      const findMobile = await Employee.findOne({ mobile });
      const findEmail = await Employee.findOne({ email });

      if (findId) {
        return res.status(422).json({ error: "Employee ID already exist" })
      }
      else if (findMobile) {
        return res.status(422).json({ error: "Employee mobile already exist" })
      }
      else if (findEmail) {
        return res.status(422).json({ error: "Employee email already exist" })
      }

      const data = new Employee({ name, id, dob, designation, email, password, mobile, gender, address, joiningDate, imgValue });
      await data.save();
      res.status(201).json({ success: "Employee successfully registered" });

    }
  } catch (error) {
    console.log("error in register : ", error);
    res.status(422).json({ error: "Fill the details appropriately" })
  }
})

router.post("/sendEmail", async (req, res) => {
  const { email, person } = req.body;

  try {
    let user = null;
    if (person === 'employee') {
      user = await Employee.findOne({ email });
    } else if (person === "manager") {
      user = await Manager.findOne({ email });
    }
    else if (person === "HR") {
      user = await Hr.findOne({ email });
    }


    if (!user) {
      return res.status(401).json({ error: "Email is not registered with the system !" });
    } else {
      const uid = String(user._id)

      //sending mail
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "asur0000000@gmail.com",
          pass: "kctlxsfiokgpendr"
        }
      })
      let details = {
        from: "asur000000@gmail.com",
        to: req.body.email,
        subject: "Welcome to Artecho Solution: Reset your password through this link",
        text: `http://localhost:3000/resetPassword/${person}/${uid}`
      }

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email is sent successfully");
          return res.status(201).json({ success: "Successfully sent mail" });
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
})

router.post("/resetPassword/:person/:idd", async function (req, res) {
  const { password, confirmPassword } = req.body;
  const { idd, person } = req.params;

  try {
    if (password !== confirmPassword) {
      res.status(401).json({ error: "Passwords are not matching" });
    } else {

      if (person === 'employee') {
        bcrypt.hash(password, 10)
          .then(hash => {
            Employee.findByIdAndUpdate({ _id: idd }, { password: hash })
              .then(u => res.status(201).json({ success: "done" }))
              .catch(err => res.status(401).json({ error: err }))
          })
          .catch(err => res.status(401).json({ error: err }))
      } else if (person === 'manager') {
        bcrypt.hash(password, 10)
          .then(hash => {
            Manager.findByIdAndUpdate({ _id: idd }, { password: hash })
              .then(u => res.status(201).json({ success: "done" }))
              .catch(err => res.status(401).json({ error: err }))
          })
          .catch(err => res.status(401).json({ error: err }))
      }
      else if (person === "HR") {
        bcrypt.hash(password, 10)
          .then(hash => {
            Hr.findByIdAndUpdate({ _id: idd }, { password: hash })
              .then(u => res.status(201).json({ success: "done" }))
              .catch(err => res.status(401).json({ error: "error1" }))
          })
          .catch(err => res.status(401).json({ error: "error2" }))
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error })
  }
})

// router.get("/image/:id",async(req,res)=>{
//   const{id} = req.params;
//    try {
//        const employee = await Employee.findById(id);
//        const image = employee.imgValue;

//        res.status(201).json({image});       
//   } catch (error) {
//     console.log(error);
//     res.json({error:"error"})
//   }
// })
module.exports = router;