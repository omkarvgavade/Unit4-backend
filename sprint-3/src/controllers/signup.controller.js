
const User = require('../models/user.model')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const newToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
}
const signup = async (req, res) => {
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        const token = newToken(user);
        return res.status(201).json({ token: token, user });
    }
    catch (err) {
        return res.status(500).json({ status: "failed", message: "something went wrong" })
    }
}
router.post("", signup)

module.exports = router;