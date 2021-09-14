const express = require('express')
const connect = require('./config/db')
const User = require("./models/user.model")
const Post = require("./models/post.model")
const Comment = require('./models/comment.model')
const Tag = require('./models/tag.model')
const app = express();


app.use(express.json())

const userController = require('./controllers/user.controller')
const tagController = require('./controllers/tag.controller')
const commentController = require('./controllers/comment.controller')
// const commentController = require('./controllers/comment.controller')
const postController = require('./controllers/post.controller')


app.use('/users', userController)
app.use('/tags', tagController)
// app.use('/comments', commentController)
app.use('/posts', postController)

app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345")
});