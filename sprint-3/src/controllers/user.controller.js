
const User = require('../models/user.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/file-upload')
const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
}



const signup = async (req, res) => {

    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            photo_url: req.file.path,
            roles: req.body.roles
        })
        const token = newToken(user);
        return res.status(201).json({ token: token, user });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", message: "something went wrong" })
    }
}
const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).exec();

        if (!user) return res.status(400).json({ status: "failed", message: "Please try with a different email" })

        const match = user.checkPassword(req.body.password);

        if (!match) return res.status(400).json({ status: "failed", message: "Please try with a different email" })

        const token = newToken(user)
        return res.status(201).json({ token: token })
    } catch (err) {
        return res.status(500).json({ status: "failed", message: "something went wrong" })
    }
}
router.post("/login", login)
router.post("/signup", upload.single("photo_url"), signup)

module.exports = router;