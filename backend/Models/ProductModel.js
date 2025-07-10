const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    image: {
        type: [String],
        required: true
    },
    product: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    size: {
        type: [String],
        required: true
    },
})

const Product = new mongoose.model("Product", productSchema) 
module.exports = Product