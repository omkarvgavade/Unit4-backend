const express = require('express')
const router = express.Router();
//CRUD operations for post 
//1. create a post 
const Comment = require('../models/comment.model')
router.post('', async (req, res) => {
    const post = await Post.create(req.body)
    res.status(201).json({ post })
})

//2. get all posts 
router.get('', async (req, res) => {
    const posts = await Post.find().populate("user_id").populate("tag_ids").lean().exec()
    res.status(200).json({ posts })
})
//3 patch
router.patch('/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("user_id").populate("tag_ids").lean().exec()
    res.status(201).json({ post })
})
//get all comments for a post
router.get('/:id/comments', async (req, res) => {
    const comments = await Comment.find({ post_id: req.params.id }).lean().exec()
    res.status(200).json({ comments })
})

//to get user details from populating postId
// const comments = await Comment.find().populate({
//     path: "post_id",
//     populate: {
//         path: "user_id"
//     }
// }).lean().exec();

module.exports = router;