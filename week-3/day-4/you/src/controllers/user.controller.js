
const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user.model')

const { body, validationResult } = require('express-validator')
//CRUD operation for user
//1. create a user 
const transporter = require('../config/mail');
router.post("", body("first_name").isLength({ min: 1 }), body("last_name").isLength({ min: 1 }), body("email").isEmail(), body("gender").custom(value => {
    if (!(value.toLowerCase() == "male" || value.toLowerCase() == "female" || value.toLowerCase() == "Others")) throw new Error("check gender")
    return true
}), body("age").custom(value => {
    if (!(value < 100 && value > 1)) throw new Error("age should be greater than 1 and less than 100")
    return true;
}), body("pin_code").isLength(6), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: errors.array() })
    }
    const user = await User.create(req.body)

    return res.status(201).json({ user })
})


// 2.get all users
router.get("", async (req, res) => {
    const page = + req.query.page || 1;
    const size = +req.query.size || 10;

    const offset = (page - 1) * size;
    const users = await User.find().skip(offset).limit(size).lean().exec()

    const totalPages = Math.ceil(await User.find().countDocuments().lean().exec() / size)

    return res.status(200).json({ data: users, pages: totalPages })
})

// 3. get a single user
router.get("/:id", async (req, res) => {
    const user = await User.find(req.params.id).lean().exec()
    return res.status(200).json({ user })
})

// 4. update a user
router.patch("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.status(201).json({ user })
})

// 5 . delete a user 
router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.status(200).json({ user })
})

module.exports = router;