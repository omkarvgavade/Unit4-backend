
const express = require('express');
const path = require('path');
const router = express.Router();
const Product = require('../models/product.model')

const { body, validationResult } = require('express-validator')
//CRUD operation for user
//1. create a user 
const transporter = require('../config/mail');
router.post("", body("name").isLength({ min: 1 }), body('image_urls').isLength({ min: 1 }), body("price").isLength({ min: 1 }), async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ data: errors.array() })
    }
    const product = await Product.create(req.body)

    return res.status(201).json({ product })
})


module.exports = router;