const express = require('express');
const upload = require('../middlewares/file-upload')

const router = express.Router();

router.post('/single', upload.single("productImages"), async (req, res) => {
    const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        photo_url: req.file.path
    })

    return res.status(201).send({ user })
})
