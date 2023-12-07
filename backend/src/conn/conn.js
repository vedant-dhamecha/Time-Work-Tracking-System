const mongoose = require("mongoose");

const db = process.env.DATABASE_ATLAS;

mongoose.connect(db).then(() => {
    console.log(`db connected to ==> ${db}`)
}).catch((error) => {
    console.log(error);
})

