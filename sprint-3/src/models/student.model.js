const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo: { type: Number, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, },
    batch: { type: String, required: true }
})

module.exports = mongoose.model('Student', studentSchema)