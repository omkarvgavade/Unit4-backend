const express = require('express')
const router = express.Router()
const Evaluation = require('../models/evaluation.model')
const crudController = require('../crudcontroller/crud.controller')
//CRUD operation for Evaluation
//1. create a Evaluation 


router.post("", crudController.post(Evaluation))
router.get("", crudController.get(Evaluation))
router.get("/:id", crudController.getOne(Evaluation))
router.patch("/:id", crudController.updateOne(Evaluation))
router.delete("/:id", crudController.deleteOne(Evaluation))

module.exports = router