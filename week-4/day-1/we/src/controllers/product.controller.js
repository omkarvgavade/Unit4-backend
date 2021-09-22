const express = require('express');
const Product = require('../models/product.model')

const router = express.Router();
const authorize = require('../middlewares/authorize')
const authenticate = require('../middlewares/authenticate')
router.post('', authenticate, authorize(["seller", "admin"]), async (req, res) => {
    const user = req.user
    console.log(user)
    const product = await Product.create({
        name: req.body.name,
        price: req.body.price,
        lister: user.user.id
    });
    return res.status(201).json({ product })
})

router.get('', authenticate, async (req, res) => {
    const products = await Product.find().lean().exec()
    return res.status(200).json({ products })
})

module.exports = router