const express = require('express')
const router = express.Router()
const Topic = require('../models/topic.model')
const crudController = require('../crudcontroller/crud.controller')
//CRUD operation for Topic
//1. create a Topic 


router.post("", crudController.post(Topic))
router.get("", crudController.get(Topic))
router.get("/:id", crudController.getOne(Topic))
router.patch("/:id", crudController.updateOne(Topic))
router.delete("/:id", crudController.deleteOne(Topic))

module.exports = router