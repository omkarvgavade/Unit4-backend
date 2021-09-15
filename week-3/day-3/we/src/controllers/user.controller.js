
const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user.model')
//CRUD operation for user
//1. create a user 
const transporter = require('../config/mail');
router.post("", async (req, res) => {


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
    await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body

        attachments: {
            filename: "dummy.txt",
            path: path.join(__dirname, '../test.txt')
        }
    });
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