const mongoose = require('mongoose');
// user model
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: false, default: "male" },
    dob: { type: String, required: true }
})

module.exports = mongoose.model("user", userSchema)
