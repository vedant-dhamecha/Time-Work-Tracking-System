const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    address: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: String,
        required: true,
    },
})

managerSchema.pre("save",async function(next){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})

const projectManager = new mongoose.model("projectManager", managerSchema);
module.exports = projectManager;