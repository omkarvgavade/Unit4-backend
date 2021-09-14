
const express = require('express');

const router = express.Router();
const User = require('../models/user.model')
//CRUD operation for user
//1. create a user 

router.post("", async (req, res) => {
    const user = await User.create(req.body)
    return res.status(201).json({ user })
})

// 2.get all users
router.get("", async (req, res) => {
    const users = await User.find().lean().exec()

    return res.status(200).json({ users })
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