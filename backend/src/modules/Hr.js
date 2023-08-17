const mongoose = require("mongoose");

const hrData = mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
})


const hr = new mongoose.model("hr",hrData);
module.exports = hr;