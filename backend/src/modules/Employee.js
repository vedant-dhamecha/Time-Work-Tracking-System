const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    designation: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: String,
        required: true,
    },
    profilePic:{
        type:String
    }
})

employeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

employeeSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, 'kushangviharvedanttimetrackigsoftware');
        console.log('token :>> ', token);

        return token;
    } catch (err) {
        console.log('err in token :>> ', err);
    }
}
const employee = new mongoose.model("employee", employeeSchema);
module.exports = employee;