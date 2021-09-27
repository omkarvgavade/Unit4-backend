const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo_url: { type: String, required: true },
    roles: [{ type: String, required: true, default: "user" }],
})

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    const hash = bcrypt.hashSync(this.password, 8)
    this.password = hash;
    next();
})

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password;
    return bcrypt.compareSync(password, passwordHash)
}
module.exports = mongoose.model('user', userSchema)
