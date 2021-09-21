const express = require("express")

const Post = require("../models/post.model")
const Comment = require("../models/comment.model")

const crudController = require("./crud.controller")
const router = express.Router();

router.post("", crudController.post(Post))
router.get("", crudController.get(Post))
router.get("/:id", crudController.getOne(Post))
router.patch("/:id", crudController.updateOne(Post))
router.delete("/:id", crudController.deleteOne(Post))

//get all comments for a post.
router.get("/:id/comments", async (req, res) => {
    const comments = await Comment.find({post_id: req.params.id}).lean().exec();
    const post = await Post.findById(req.params.id).populated("tag_ids").lean().exec();

    return res.status(200).json({comments, post })
})

module.exports = router;