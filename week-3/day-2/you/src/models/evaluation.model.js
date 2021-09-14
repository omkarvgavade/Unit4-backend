const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
    dateOfEvaluation: { type: String, required: true },
    topicId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "topic" }
})


module.exports = mongoose.model('evaluation', evaluationSchema)