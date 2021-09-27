const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    instructor: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
    batch: { type: String, required: true }

})
module.exports = mongoose.model("Lecture", lectureSchema);
