const mongoose = require("mongoose");

const addProject = mongoose.Schema({
    projectTitle: {
        type: String
    },
    manager: {
        type: String
    },
    status: {
        type: String
    },
    assignedDate: {
        type: String
    },
    estimatedDate: {
        type: String
    },
    isClockRunning: {
        type: Boolean,
        default: false
    },
    workTime: {
        type: Number,
        default: 0
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
                    dueDate: {
                        type: String,
                    },
                    description: {
                        type: String,
                    },
                    comments: {
                        type: String
                    },
                    images: {
                        type: Array
                    },
                    time: {
                        type: String
                    },
                    status: {
                        type: String,
                        default: "pending"
                    },
                }


            ]
        },
    ]
})

const project = new mongoose.model("project", addProject);
module.exports = project;