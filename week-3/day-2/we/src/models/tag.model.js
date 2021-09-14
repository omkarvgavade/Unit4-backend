const mongoose = require('mongoose');
// tags model
const tagSchema = new mongoose.Schema({
    name: { type: "string", required: true }
})

module.exports = mongoose.model("tag", tagSchema)