const mongoose = require("mongoose");

const employeeData = mongoose.Schema({
    email:{
        type: String
    },
    identity:{
        type:String
    },
    username:{
        type: String
    },
    designation:{
        type: String
    },
    password:{
        type: String
    }
})


const employee = new mongoose.model("employee",employeeData);
module.exports = employee;