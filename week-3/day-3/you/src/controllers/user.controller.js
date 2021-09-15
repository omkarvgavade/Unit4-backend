
const express = require('express');
const path = require('path');
const router = express.Router();
const User = require('../models/user.model')
const Admin = require('../models/admin.model')
//CRUD operation for user
//1. create a user 
const transporter = require('../config/mail');
router.post("", async (req, res) => {
    console.log(req.body)
    await transporter.sendMail({
        from: '"Omkar Gavade 👻" <omkar@gmail.com>', // sender address
        to: req.body.email,// list of receivers
        subject: `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`, // Subject line
        text: `Hi ${req.body.first_name}, Please confirm your email address`, // plain text body
        html: "<b>Hello world?</b>", // html body

        attachments: {
            filename: "dummy.txt",
            path: path.join(__dirname, '../test.txt')
        }
    });
    const user = await User.create(req.body)
    sendEmails(req, res)
    return res.status(201).json({ user })
})

async function sendEmails(req, res) {
    const admin = await Admin.find().lean().exec()
    admin.map((el) => {
        return transporter.sendMail({
            from: '"Omkar Gavade 👻" <omkar@gmail.com>', // sender address
            to: el.email,// list of receivers
            subject: `${req.body.first_name} ${req.body.last_name} has registered successfully`, // Subject line
            text: `Hi ${el.first_name}, welcome him`, // plain text body
            html: "<b>Hello world?</b>", // html body

        })
    })
}
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