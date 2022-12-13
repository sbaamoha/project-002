require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/workouts')
const userRouter = require('./routes/user')

const app = express()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api', router)
app.use('/api', userRouter)

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT)
    })
    .catch((error) => {
        console.log(error)
    } )