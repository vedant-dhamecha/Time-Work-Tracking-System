const mongoose = require("mongoose");

const addProject = mongoose.Schema({
    projectTitle: {
        type: String,
    },
    startingDate: {
        type: String,
    },
    estimatedDate: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
    isClockRunning:{
        type:Boolean,
        default:false
    },
    workTime: {
        type: Number,
        default:0
    },
    breakTime: {
        type: Number,
        default:0
    },
    assignedEmployees: [
        {
            empEmail: {
                type: String,
            },
            tasks: [
                {
                    title: {
                        type: String,
                    },
                    desc: {
                        type: String,
                    },
                    startDate: {
                        type: String,
                    },
                    completionDate: {
                        type: String,
                    },
                    comments:{
                        type: String
                    },
                    images:{
                        type: Array
                    }
                }
                   
            
            ]
        },
    ]
})

const project = new mongoose.model("project", addProject);
module.exports = project;