const express = require("express");
const app = express();
const cors = require('cors')

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

require("dotenv").config();
const port = process.env.PORT || 4100;

app.use(express.json());

require("./src/conn/conn");
const router = require("./src/routers/route");
app.use(router);

app.listen(port, () => {
    // console.log(port);
    console.log("running on port :", port)
})