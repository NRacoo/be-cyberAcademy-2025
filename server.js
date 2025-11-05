const express = require('express');
const dotenv = require('dotenv');
const app = express();
const apiRoutes = require('./api/server')
const cors = require('cors')

dotenv.config()

const port = process.env.PORT || 3000

app.use(cors({
    origin:"*",
    methods:["GET", "POST", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders:["Content-type", "Authorization"]
}));
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("Hello CyberAcademy")
})

app.use("/api", apiRoutes)

app.listen(port, () => {
    console.log(`server was listen to port ${port}`)
})