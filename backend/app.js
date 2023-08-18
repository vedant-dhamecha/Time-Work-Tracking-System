const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 4100;

require("./src/conn/conn");
const router = require("./src/routers/route");
app.use(express.json());
app.use(router);

const cors = require('cors')

app.use(cors({
    origin: "http://localhost:4100",
    credentials: true,
}));


app.listen(port, () => {
    // console.log(port);
    console.log("running on port :", port)
})