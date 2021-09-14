const mongoose = require('mongoose');
//comments model

const commentSchema = new mongoose.Schema({
    body: { type: "string", required: true },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    }
})

module.exports = mongoose.model('comment', commentSchema)