const express = require('express');
const app = express();
const connect = require('./config/db')

const signupController = require('./controllers/signup.controller');
const loginController = require('./controllers/login.controller')
const lectureController = require('./controllers/lecture.controller')
const studentsController = require('./controllers/student.controller')
app.use(express.json())
app.use("/signup", signupController),
    app.use("/login", loginController)
app.use("/lectures", lectureController)
app.use("/students", studentsController)
app.listen(2345, async function () {
    await connect();
    console.log('listening on port 2345');
})