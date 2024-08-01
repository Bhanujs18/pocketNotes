const express = require('express');
const app = express();
const cors = require('cors')
const subjectRoutes = require('./routes/subject')
const db = require('./db');
app.use(cors())
app.use(express.json())

db();
app.get("/" , (req, res)=>{
    res.status(200).json({message : "Server is running"});
})

app.use("/api/v1/subject" , subjectRoutes)

app.listen(3000 , ()=>{
    console.log("server is running at 3000")
})