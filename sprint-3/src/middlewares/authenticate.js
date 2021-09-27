const jwt = require('jsonwebtoken');

const User = require('../models/user.model')
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return reject(err);
            }

            if (user) {
                return resolve(user);
            }

        })
    })
}

const authenticate = async (req, res, next) => {

    const bearer = req?.headers?.authorization;
    console.log(bearer)
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return res.status(400).json({ status: "failed", message: "Please try with a different email" })
    }

    const token = bearer.split(" ")[1];
    console.log(token);

    let user;
    try {
        user = await verifyToken(token);
    } catch (e) {
        return res.status(400).json({ status: "failed", message: "Please try with a different email" })
    }

    req.user = { user };
    console.log(user)
    next();
}

module.exports = authenticate;