const express = require('express')
const router = express.Router()
const Product = require('../models/products')

//DELETE
router.delete('/:id', (req, res) => {
    const productId = req.params.id

    Product.findByIdAndRemove(productId)
        .then(product => {
            res.redirect('/products')
        })
        .catch(err => {
            res.json(err)
        })
})

//UPDATE get route
router.get('/:id/edit', (req, res) => {
    const productId = req.params.id

    Product.findById(productId)
        .then(product => {
            res.render('products/edit', { product })
        })
        .catch(err => { res.json(err) })
})

//PUT for update
router.put('/:id', (req, res) => {
    const productId = req.params.id

    Product.findByIdAndUpdate(productId, req.body, { new: true })
        .then(product => {
            res.redirect('/products/${product._id}')
        })
        .catch(err => { res.json(err) })
})

//GET route to display create form
router.get('/new', (req, res) => {
    res.render('products/new')
})

//POST create route
router.post('/', (req, res) => {
    Product.create(req.body)
        .then(product => {
            console.log(product)
            res.redirect('/products')
        })
        .catch(err => {
            res.json(err)
        })
})

//INDEX GET
router.get('/', (req, res) => {
    Product.find({})
        .then(product => {
            res.render('products/index', { products })
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Show

router.get('/:id', (req, res) => {
    const productId = req.params.id

    Product.findById(productId)
        // send back some json
        .then(product => {
            res.render('products/show', { products })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router