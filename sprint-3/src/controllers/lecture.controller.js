const express = require('express');

const router = express.Router();
const authorize = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')
const Lecture = require('../models/lecture.model')
router.post('', authenticate, authorize(["instructor", "admin"]), async (req, res) => {
    const user = req.user
    const lecture = await Lecture.create({
        title: req.body.title,
        instructor: user.user.id,
        batch: req.body.batch
    });
    return res.status(201).json({ lecture })
})

router.get('', authenticate, async (req, res) => {
    const lectures = await Lecture.find().lean().exec()
    return res.status(200).json({ lectures })
})
router.get('/:id/delete', authenticate, authorize, async (req, res) => {
    const lecture = await Lecture.findByIdAndDelete({ id: req.params.id });
    return res.status(200).json({ lecture })
})
router.get("/:id", authenticate, async (req, res) => {
    const lecture = await Lecture.find({ id: req.params.id }).lean().exec();
    return res.status(200).json({ lecture })
})
module.exports = router