// using an already connected mongoose not a fresh one from node_modules
const mongoose = require('./connection')

// inside of mongoose I want the keys that are named Schema and model
const { Schema, model } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    img: String,
    price: Number,
    qty: Number
}, {
    timestamps: true
})

// need to make a model
// this collections will be called fruits
const Product = model('Product', productSchema)

module.exports = Product