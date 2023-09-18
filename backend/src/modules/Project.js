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
    status:{
       type:String
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
                    workTime: {
                        type: Number
                    },
                    breakTime: {
                        type: Number
                    }
                }
            ]
        }
    ]
})

const project = new mongoose.model("project", addProject);
module.exports = project;