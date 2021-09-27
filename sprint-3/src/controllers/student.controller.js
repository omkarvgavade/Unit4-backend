const express = require('express');

const router = express.Router();

router.post("", async (req, res) => {
    const student = await Student.create(req.body);
    return res.status(201).json({ student: student });
})
module.exports = router;