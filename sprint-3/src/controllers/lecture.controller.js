const express = require('express');

const router = express.Router();
const authorize = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')
const Lecture = require('../models/lecture.model')
router.post('', authenticate, authorize(["instructor", "admin"]), async (req, res) => {
    const user = req.user
    console.log(user)
    const lecture = await Lecture.create({
        title: req.body.name,
        instructor: user.user.id,
        batch: req.body.batch
    });
    return res.status(201).json({ lecture })
})

router.get('', authenticate, async (req, res) => {
    const lectures = await Lecture.find().lean().exec()
    return res.status(200).json({ lectures })
})