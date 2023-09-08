const mongoose = require("mongoose");

const dummmySc = mongoose.Schema({
    empId:{
      type:String
    },
    workTime:{
      type: Number
    },
    breakTime:{
        type:Number
    }   
})

const dummy = new mongoose.model("dummy", dummmySc);
module.exports = dummy;