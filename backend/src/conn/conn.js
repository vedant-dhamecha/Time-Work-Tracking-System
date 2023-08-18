const mongoose = require("mongoose");

const db = process.env.DATABASE;

mongoose.connect(db).then(() => {
    console.log("db connected")
}).catch((error) => {
    console.log(error);
})