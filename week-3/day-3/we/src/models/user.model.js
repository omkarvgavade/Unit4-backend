const mongoose = require('mongoose');
// user model
const userSchema = new mongoose.Schema({
    first_name: { type: "string", required: true },
    last_name: { type: "string", required: true },
    email: { type: "string", required: true },
    gender: { type: "string", required: false },
    age: { type: "Number", required: true },
})

module.exports = mongoose.model("user", userSchema)
