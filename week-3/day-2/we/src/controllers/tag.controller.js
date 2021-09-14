const express = require('express')
const router = express.Router()
const Tag = require('../models/tag.model')
const crudController = require('../crudcontroller/crud.controller')
//CRUD operation for tag
//1. create a tag 


router.post("", crudController.post(Tag))
router.get("", crudController.get(Tag))
router.get("/:id", crudController.getOne(Tag))
router.patch("/:id", crudController.updateOne(Tag))
router.delete("/:id", crudController.deleteOne(Tag))



// router.post("", async (req, res) => {
//     const tag = await Tag.create(req.body)

//     res.status(201).json({ tag })
// })

// //2. get all tag
// router.get("", async (req, res) => {
//     const tags = await Tag.find().lean().exec()
//     res.status(200).json({ tags })
// })

// //3. get one tag
// router.get("/:id", async (req, res) => {
//     const tag = await Tag.find(req.params.id).lean().exec()
//     res.status(200).json({ tag })
// })
// //4.update tag
// router.patch('/:id', async (req, res) => {
//     const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     res.status(201).json({ tag })
// })

//5. delete tag 
// router.delete('/:id', async (req, res) => {
//     const tag = await Tag.findByIdAndDelete(req.params.id)
//     res.status(200).json({ tag })
// })

module.exports = router;