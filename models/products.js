const mongoose = require('./connection')

const { Schema, model } = mongoose
//product schema

const productSchema = new Schema({
    name: String,
    description: String,
    img: String,
    price: Number,
    qty: Number
}, {
    timestamps: true
})

const Product = model('Product', productSchema)

module.exports = Product