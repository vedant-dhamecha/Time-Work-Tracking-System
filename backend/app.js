require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3218;
require("./src/conn/conn");
const router = require("./src/routers/route");
app.use(express.json());
app.use(router);


app.listen(port, () => {
    console.log(port);
<<<<<<< HEAD
    console.log("vedant")
=======
    console.log("hello bvm bhavesh tanawala")
>>>>>>> e97e9b64b093b52638c54dad14eceb06120a5bb3
})