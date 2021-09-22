const express = require('express')
const { body, validationResult } = require('express-validator')

const connect = require('../src/config/db')

const app = express();
const { signup, login } = require('../src/controllers/auth.controller')
const productController = require('./controllers/product.controller')
app.use(express.json())
app.use('/products', productController)
app.post("/signup", body("first_name").isLength({ min: 1 }), body("last_name").isLength({ min: 1 }), body("email").isEmail(), body("password").isLength(6), signup)
app.post("/login", login)
app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345")
})