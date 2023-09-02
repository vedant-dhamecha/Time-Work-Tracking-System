const mongoose = require("mongoose");
 
const addProject = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    completionDate: {
        type: String,
    },
    employees: {
        type: Array,
        required: true,
    },
})

const project = new mongoose.model("project", addProject);
module.exports = project;