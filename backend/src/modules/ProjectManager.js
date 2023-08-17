const mongoose = require("mongoose");

const prManagerData = mongoose.Schema({
    email:{
        type: String
    },
    password:{
        type: String
    }
})


const projectManager = new mongoose.model("projectManager",prManagerData);
module.exports = projectManager;