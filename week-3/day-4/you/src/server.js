const express = require('express')
const connect = require('./config/db')
const User = require("./models/user.model")
const Product = require("./models/product.model")
const app = express();


app.use(express.json())

const userController = require('./controllers/user.controller')
const productController = require('./controllers/product.controller')

app.use('/users', userController)
app.use('/products', productController)

app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345")
});