const mongoose = require('mongoose');
// user model
const topicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" }
})

module.exports = mongoose.model("topic", topicSchema)
