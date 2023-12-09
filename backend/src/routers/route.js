const express = require("express");
const app = express();
const router = new express.Router();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
//importing schemas
const Hr = require("../modules/Hr");
const Manager = require("../modules/ProjectManager");
const Employee = require("../modules/Employee");
const Project = require("../modules/Project");
const Dummy = require("../modules/Dummy");
const hr = require("../modules/Hr");

router.get("/", (req, res) => {
  console.log("here from browser unload....");
});

router.post("/login", async (req, res) => {
  const { id, password, person } = req.body;

  if (person === "HR") {
    const hr = await Hr.findOne({ id: id });
    try {
      if (hr) {
        const passwordHr = await bcrypt.compare(password, hr.password);
        if (passwordHr) {
          const email = hr.email;
          res.cookie("hrEmail", email, {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          });
          res.cookie("person", "hr", {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          });
          return res
            .status(201)
            .json({
              name: hr.name,
              id: hr.id,
              profileImg: hr.imgValue,
              success: "HR login successful",
            });
        } else {
          return res.status(401).json({ error: "Invalid credentials of Hr" });
        }
      } else {
        return res.status(401).json({ error: "HR does not exist" });
      }
    } catch (error) {
      console.log("err:", error);
    }
  } else if (person === "employee") {
    try {
      const emp = await Employee.findOne({ id });

      if (emp) {
        const passwordEmp = await bcrypt.compare(password, emp.password);

        if (passwordEmp) {
          const email = emp.email;
          res.cookie("employeeEmail", email, {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          });
          res.cookie("person", "employee", {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          });
          res
            .status(201)
            .json({
              name: emp.name,
              id: emp.id,
              profileImg: emp.imgValue,
              success: "Employee login successful",
            });
        } else {
          res.status(401).json({ error: "Invalid credentials of Employee" });
        }
      } else {
        res.status(401).json({ error: "Employee does not exist" });
      }
    } catch (error) {
      console.log("err:", error);
    }
  } else if (person === "manager") {
    try {
      const manager = await Manager.findOne({ id });

      if (manager) {
        const passwordManager = await bcrypt.compare(
          password,
          manager.password
        );
        if (passwordManager) {
          const email = manager.email;
          res.cookie("managerEmail", email, {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          });
          res.cookie("person", "manager", {
            expires: new Date(Date.now() + 3600 * 24 * 365),
          });

          return res
            .status(201)
            .json({
              name: manager.name,
              id: manager.id,
              profileImg: manager.imgValue,
              success: "Manager login successful",
            });
        } else {
          return res
            .status(401)
            .json({ error: "Invalid credentials of Manager" });
        }
      } else {
        res.status(401).json({ error: "Manager does not exist" });
      }
    } catch (error) {
      console.log("err:", error);
    }
  }
});

router.get("/logout", (req, res) => {
  if (req.cookies.person === "employee") {
    res.clearCookie("employeeEmail");
    res.clearCookie("person");
  } else if (req.cookies.person === "manager") {
    res.clearCookie("managerEmail");
    res.clearCookie("person");
  } else if (req.cookies.person === "hr") {
    res.clearCookie("hrEmail");
    res.clearCookie("person");
  }

  return res.json({ loggedOut: req.cookies.person + " logged out" });
});

router.post("/register", async (req, res) => {
  try {
    const {
      name,
      id,
      dob,
      email,
      password,
      mobile,
      gender,
      address,
      joiningDate,
      registerFor,
      imgValue,
    } = req.body;
    let designation = registerFor;
    console.log(registerFor);

    if (registerFor === "manager") {
      const findId = await Manager.findOne({ id });
      const findMobile = await Manager.findOne({ mobile });
      const findEmail = await Manager.findOne({ email });

      if (findId) {
        return res.status(422).json({ error: "Manager ID already exist" });
      } else if (findMobile) {
        return res.status(422).json({ error: "Manager mobile already exist" });
      } else if (findEmail) {
        return res.status(422).json({ error: "Manager email already exist" });
      }
      const data = new Manager({
        name,
        id,
        dob,
        email,
        password,
        mobile,
        gender,
        joiningDate,
        address,
        imgValue,
      });
      await data.save();
      return res
        .status(201)
        .json({ success: "Manager successfully registered" });
    } else if (registerFor === "employee") {
      console.log(11);
      const findId = await Employee.findOne({ id });
      const findMobile = await Employee.findOne({ mobile });
      const findEmail = await Employee.findOne({ email });

      if (findId) {
        return res.status(422).json({ error: "Employee ID already exist" });
      } else if (findMobile) {
        return res.status(422).json({ error: "Employee mobile already exist" });
      } else if (findEmail) {
        return res.status(422).json({ error: "Employee email already exist" });
      }

      const data = new Employee({
        name,
        id,
        dob,
        email,
        password,
        mobile,
        gender,
        address,
        joiningDate,
        imgValue,
      });
      await data.save();
      res.status(201).json({ success: "Employee successfully registered" });
    }
  } catch (error) {
    console.log("error in register : ", error);
    res.status(422).json({ error: "Fill the details appropriately" });
  }
});

router.post("/sendEmail", async (req, res) => {
  const { email, person } = req.body;

  try {
    let user = null;
    if (person === "employee") {
      user = await Employee.findOne({ email });
    } else if (person === "manager") {
      user = await Manager.findOne({ email });
    } else if (person === "HR") {
      user = await Hr.findOne({ email });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: "Email is not registered with the system !" });
    } else {
      const uid = String(user._id);

      //sending mail
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "artechoSolution@gmail.com",
          pass: "sljcozabamikyhsr",
        },
      });
      let details = {
        from: "artechoSolution@gmail.com",
        to: req.body.email,
        subject:
          "Welcome to Artecho Solution: Reset your password through this link",
        text: `With global reach and thousands of consultants, Artech Consulting Solutions is ideally positioned to` + `\n` + `deliver a wide array of IT-focused solutions, backed by superior talent, methodology and delivery` + `\n` + `http://localhost:3000/resetPassword/${person}/${uid}`,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email is sent successfully");
          return res
            .status(201)
            .json({ success: "Email is sent successfully" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/getData", async (req, res) => {
  try {
    if (req.cookies.person === "employee") {
      const email = req.cookies.employeeEmail;
      const emp = await Employee.findOne({ email });
      res.send(emp);
    } else if (req.cookies.person === "manager") {
      const email = req.cookies.managerEmail;
      const m = await Manager.findOne({ email });
      res.send(m);
    } else if (req.cookies.person === "hr") {
      const email = req.cookies.hrEmail;
      const h = await hr.findOne({ email });
      res.send(h);
    }
  } catch (err) {
    console.log("err in adminInfo auth :>> ", err);
  }
});

router.post("/resetPassword/:person/:idd", async function (req, res) {
  const { password, confirmPassword } = req.body;
  const { idd, person } = req.params;

  try {
    if (password !== confirmPassword) {
      res.status(401).json({ error: "Passwords are not matching" });
    } else {
      if (person === "employee") {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Employee.findByIdAndUpdate({ _id: idd }, { password: hash })
              .then((u) => res.status(201).json({ success: "done" }))
              .catch((err) => res.status(401).json({ error: err }));
          })
          .catch((err) => res.status(401).json({ error: err }));
      } else if (person === "manager") {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Manager.findByIdAndUpdate({ _id: idd }, { password: hash })
              .then((u) => res.status(201).json({ success: "done" }))
              .catch((err) => res.status(401).json({ error: err }));
          })
          .catch((err) => res.status(401).json({ error: err }));
      } else if (person === "HR") {
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            Hr.findByIdAndUpdate({ _id: idd }, { password: hash })
              .then((u) => res.status(201).json({ success: "done" }))
              .catch((err) => res.status(401).json({ error: "error1" }));
          })
          .catch((err) => res.status(401).json({ error: "error2" }));
      }
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

router.get('/getAllEmployees',async(req,res)=>{
    try {
      const data = await Employee.find();
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: error });
    }
});

router.get('/getAllProjects', async (req, res) => {
  try {
    // Select only the fields you need (projectTitle and workTime)
    const data = await Project.find().select('projectTitle workTime');

    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

router.get("/getProject", async (req, res) => {
  const email = req.cookies.employeeEmail;
  try {
    const data = await Project.find({ "assignedEmployees.empEmail": email });

    if (data.length === 0) {
      res.status(401).json({ message: "No projects assigned yet" });
    } else {
      // console.log('data :>> ', data[0].assignedEmployees[0].tasks);
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

router.get("/getManagerProjects", async (req, res) => {
  const email = req.cookies.managerEmail;
  try {
    const data = await Project.find({ "manager": email });
    console.log('data :>> ', data);
    if (data.length === 0) {
      res.status(401).json({ message: "No projects assigned yet" });
    } else {
      // console.log('data :>> ', data[0].assignedEmployees[0].tasks);
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error });
  }
});

router.get("/getEmployees", async (req, res) => {
  const emps = await Employee.find({});
  const empEmails = [];
  emps.map((emp) => { empEmails.push(emp.email) })
  return res.json(empEmails);
});

router.post("/addTaskData", upload.none(), async (req, res) => {
  const empEmail = req.cookies.employeeEmail;
  const { taskId, comment, imgValues } = req.body;
  
  try {
    // Find the project document that matches the employee's email.
    const project = await Project.findOne({ "assignedEmployees.empEmail": empEmail });
    
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    
    // Find the specific task in the project document and update the fields.
    const assignedEmployeeIndex = project.assignedEmployees.findIndex(
      (employee) => employee.empEmail === empEmail
      );
      
      const taskIndex = project.assignedEmployees[assignedEmployeeIndex].tasks.findIndex(
      (task) => task._id.toString() === taskId
    );

    if (taskIndex === -1) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Update the comments and images for the task.
    project.assignedEmployees[assignedEmployeeIndex].tasks[taskIndex].comments = comment;
    project.assignedEmployees[assignedEmployeeIndex].tasks[taskIndex].images = imgValues;

    // Save the updated project document.
    const updatedProject = await project.save();

    if (!updatedProject) {
      console.error("Failed to save updated project");
      return res.status(500).json({ error: "Failed to save updated project" });
    }

    res.status(200).json({ success: "Task data updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/addProject", async (req, res) => {
  const {
    projectTitle,
    assignedDate,
    estimatedDate,
    assignedEmployees,
    status,
  } = req.body;
  try {
    const data = new Project(req.body);
    await data.save();
    return res.status(201).json({ success: "Project successfully added" });
  } catch (error) {
    console.log(error);
    res.status(422).json({ error: "Fill the details appropriately" });
  }
});

router.post("/toggleClockState", async (req, res) => {

  const { projectId, time } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return 'Project not found';
    }

    project.isClockRunning = !project.isClockRunning;
    project.workTime = time;

    await project.save();

    return res.status(200).json({ success: "Clock state toggled successfully." });

    return project;
  } catch (error) {
    console.error('Error toggling clock running status:', error);
    return res.status(500).json({ error: "Error toggling clock running status" });

  }

});

router.post("/storeTime", async (req, res) => {

  const { projectId, time } = req.body;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return 'Project not found';
    }

    project.workTime = time;

    await project.save();

    return res.status(200).json({ success: "Clock time stored successfully." });

    return project;
  } catch (error) {
    console.error('Error in storing Clock time.:', error);
    return res.status(500).json({ error: "Error in storing Clock time." });

  }

});

router.get("/getTimeNstate/:_id", async (req, res) => {

  const projectId = req.params._id;

  try {
    const project = await Project.findById(projectId);

    if (!project) {
      return 'Project not found';
    }

    return res.status(200).json({ success: "Clock time found.", time: project.workTime, isClockRunning: project.isClockRunning });

    return project;
  } catch (error) {
    console.error('Error in storing Clock time.:', error);
    return res.status(500).json({ error: "Error in finding Clock time." });

  }

});
module.exports = router;
