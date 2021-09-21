const express = require("express")

const Tag = require("../models/tag.model")

const router = express.Router();

router.post('', async (req, res) => {
    const tag = await Tag.create(req.body);
    return res.status(201).json({ tag })
})

router.get('', async (req, res) => {
    const tags = await Tag.find().lean().exec();
    return res.status(200).json({ tags })
})

router.get('/:id', async (req, res) => {
    const tags = await Tag.findById(req.params.id).lean().exec();
    return res.status(200).json({ tags })
})
router.patch('/:id', async (req, res) => {
    const tags = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec();
    return res.status(200).json({ tags })
})
router.delete('/:id', async (req, res) => {
    const tags = await Tag.findByIdAndDelete(req.params.id);
    return res.status(200).json({ tags })
})

module.exports = router;