const express = require('express')
const connect = require('./config/db')
const User = require("./models/user.model")

const app = express();


app.use(express.json())

const userController = require('./controllers/user.controller')


app.use('/users', userController)


app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345")
});