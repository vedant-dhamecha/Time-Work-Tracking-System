const mongoose = require("mongoose");

const db = process.env.DATABASE_ATLAS;
// const db = process.env.DATABASE;

mongoose.connect(db).then(() => {
    console.log(`db connected to ==> ${db}`)
}).catch((error) => {
    console.log(error);
})

