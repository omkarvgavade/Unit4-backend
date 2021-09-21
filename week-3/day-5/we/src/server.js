const express = require('express')

const connect = require("./config/db")

const app = express();
app.use(express.json());

const userController = require("./Controllers/user.controller")
const tagController = require("./Controllers/tag.controller")
const postController = require("./Controllers/post.controller")
const commentController = require("./Controllers/comment.controller")


  app.use("/users", userController);
  app.use("/tags", tagController);
  app.use("/posts", postController);
  app.use("/comments", commentController);

app.listen(2345, async () => {
    await connect()
    console.log('listening to port no 2345');
})