const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3218;
const cors = require('cors')
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

require("./src/conn/conn");
const router = require("./src/routers/route");
app.use(express.json());
app.use(router);




app.listen(port, () => {
    // console.log(port);
    console.log("running on port :", port)
})