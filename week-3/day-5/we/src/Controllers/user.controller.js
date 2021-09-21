const express = require("express")

const User = require("../models/user.model")
const upload = require("../middlewares/file-upload")

const router = express.Router();

router.get('', async (req, res) => {
    const user = await User.find().lean().exec();
    return res.status(200).json({ user })
})
//Pagination ///////////

// router.get('', async (req, res) => {
//     const page = +req.query.page || 1;
//     const size = +req.query.size || 10;

//     const offset = (page-1) * size; 

//     const users = await User.find().sort({last_name: 1}).skip(offset).limit(size).lean().exec();

//     const totalDocuments = await User.find().countDocuments();
//     const totalPages = Math.ceil(totalDocuments / size);

//     return res.status(200).json({ users, totalPages })
// })

router.post('/single', upload.single("productImages"), async (req, res) => {
    const user = await User.create({
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        img_urls: req.file.path
    })

    return res.status(201).send( {user} )
})

router.post('/multiple', upload.any("productImages"), async (req, res) => {
    const filePaths = req.files.map(file => file.path)

    const user = await User.create({
        email: req.body.email,
        gender: req.body.gender,
        age: req.body.age,
        img_urls: filePaths
    })

    return res.status(201).send( {user} )
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).lean().exec();
    return res.status(200).json({ user })
})
router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ user })
})

module.exports = router;