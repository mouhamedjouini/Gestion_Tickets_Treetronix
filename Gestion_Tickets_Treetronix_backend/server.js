const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes  = require('./Routes/auth');
const formRoutes  = require('./Routes/Form');
dotenv.config();
//require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000
const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth',authRoutes)
app.use('/form',formRoutes)
app.use('/getimage',express.static('./upload'))
mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    })
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})