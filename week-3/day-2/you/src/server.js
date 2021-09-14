const express = require('express')
const connect = require('./config/db')

const app = express();


app.use(express.json())

const userController = require('./controllers/user.controller')
const studentController = require('./controllers/student.controller')
const topicController = require('./controllers/topic.controller')
// const commentController = require('./controllers/comment.controller')
const evaluationController = require('./controllers/evaluation.controller')


app.use('/users', userController)
app.use('/students', studentController)
// app.use('/comments', commentController)
app.use('/topics', topicController)
app.use('/evaluations', evaluationController)
app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345")
});