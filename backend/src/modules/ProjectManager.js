const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const managerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
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
    designation: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: String,
        required: true,
    },
    imgValue:{
        type:String
    }
})

managerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})
managerSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, 'kushangviharvedanttimetrackigsoftware');
        console.log('token :>> ', token);

        return token;
    } catch (err) {
        console.log('err in token :>> ', err);
    }
}
const projectManager = new mongoose.model("projectManager", managerSchema);
module.exports = projectManager;