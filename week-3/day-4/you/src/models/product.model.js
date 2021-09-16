const mongoose = require('mongoose');
// user model
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    image_urls: [{ type: String, required: true }]
})

module.exports = mongoose.model("product", productSchema)
