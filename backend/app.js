require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3218;
require("./src/conn/conn");
const router = require("./src/routers/route");
app.use(express.json());
app.use(router);


app.listen(port, () => {
    console.log("ook");
})