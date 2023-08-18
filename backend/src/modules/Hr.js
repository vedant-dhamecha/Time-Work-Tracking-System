const mongoose = require("mongoose");

const hrSchema = mongoose.Schema({
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
        // required: true,
        unique: true
    },
    gender: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    dob: {
        type: String,
        // required: true,
    },
    mobile: {
        type: Number,
        // required: true,
        unique: true
    },
    address: {
        type: String,
        // required: true,
    },
    joiningDate: {
        type: String,
        // required: true,
    },
})


const hr = new mongoose.model("hr", hrSchema);
module.exports = hr;