const express = require('express')
const mongoose = require('mongoose');



const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/ninjas")
}



const app = express();


// user model
const userSchema = new mongoose.Schema({
    first_name: { type: "string", required: true },
    last_name: { type: "string", required: true },
    email: { type: "string", required: true },
    genders: { type: "string", required: false },
    age: { type: "Number", required: true },
})

const User = mongoose.model("user", userSchema)

// post model
const postSchema = new mongoose.Schema({
    title: { type: "string", required: true },
    body: { type: "string", required: true },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    tag_ids: [
        { type: mongoose.Schema.Types.ObjectId, required: true, ref: "tag" }
    ]
})

const Post = mongoose.model("post", postSchema)

//comments model

const commentSchema = new mongoose.Schema({
    body: { type: "string", required: true },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    }
})

const Comment = mongoose.model('comment', commentSchema)


// tags model
const tagSchema = new mongoose.Schema({
    name: { type: "string", required: true }
})

const Tagging = mongoose.model("tag", tagSchema)


//CRUD operation for user
//1. create a user 
app.use(express.json())
app.post("/users", async (req, res) => {
    console.log("hii")
    const user = await User.create(req.body)
    return res.status(201).json({ user })
})

// 2.get all users
app.get("/users", async (req, res) => {
    const users = await User.find().lean().exec()

    return res.status(200).json({ users })
})

// 3. get a single user
app.get("/users/:id", async (req, res) => {
    const user = await User.find(req.params.id).lean().exec()
    return res.status(200).json({ user })
})

// 4. update a user
app.patch("/users/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(201).json({ user })
})

// 5 . delete a user 
app.delete("/users/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ user })
})

//CRUD operation for tag
//1. create a tag 

app.post("/tags", async (req, res) => {
    const tag = await Tag.create(req.body)

    res.status(201).json({ tag })
})

//2. get all tag
app.get("/tags", async (req, res) => {
    const tags = await Tag.find().lean().exec()
    res.status(200).json({ tags })
})

//3. get one tag
app.get("/tags/:id", async (req, res) => {
    const tag = await Tag.find(req.params.id).lean().exec()
    res.status(200).json({ tag })
})
//4.update tag
app.patch('/tags/:id', async (req, res) => {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(201).json({ tag })
})

//5. delete tag 
app.delete('/tags/:id', async (req, res) => {
    const tag = await Tag.findByIdAndDelete(req.params.id)
    res.status(200).json({ tag })
})

//CRUD operations for post 
//1. create a post 
app.use(express.json())
app.post('/posts', async (req, res) => {
    const post = await Post.create(req.body)
    res.status(201).json({ post })
})

//2. get all posts 
app.get('/posts', async (req, res) => {
    const posts = await Post.find().populate("user_id").populate("tag_ids").lean().exec()
    res.status(200).json({ posts })
})
//3 patch
app.patch('/posts/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("user_id").populate("tag_ids").lean().exec()
    res.status(201).json({ post })
})
//get all comments for a post
app.get('/posts/:id/comments', async (req, res) => {
    const comments = await Comment.find({ post_id: req.params.id }).lean().exec()
    res.status(200).json({ comments })
})

app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345")
});