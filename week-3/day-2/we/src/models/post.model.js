const mongoose = require('mongoose');
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

module.exports = mongoose.model("post", postSchema)