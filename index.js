const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors=require('cors')
const newRoutes=require('./routes/News')
const port =process.env.PORT || 5000

const app = express();

app.use(cors());

mongoose.connect(process.env.MONOGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('conncet to db'))
.catch((err)=>console.log(err))

app.get('/',(req,res)=>{
    res.send("hello word!")
})

app.use('/api',newRoutes)

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})