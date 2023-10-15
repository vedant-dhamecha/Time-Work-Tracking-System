require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

const port = process.env.PORT || 3218;

const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

require("./src/conn/conn");
const router = require("./src/routers/route");
app.use(router);

app.listen(port, () => {
    // console.log(port);
    console.log("running on port :", port)
})