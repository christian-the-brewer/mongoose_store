const express = require('express')
// making a router
const router = express.Router()
// importing Product model to access database
const Product = require('../models/product')

// DELETE - Delete
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

// GET route for displaying an update form
router.get('/:id/edit', (req, res) => {
    const productId = req.params.id

    Product.findById(productId)
        .then(product => {
            res.render('products/edit', { product })
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update
router.put('/:id', (req, res) => {
    const productId = req.params.id

    Product.findByIdAndUpdate(productId, req.body, { new: true })
        .then(product => {
            res.redirect(`/products/${product._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

//PUT for buying
router.put('/:id/buy', (req, res) => {
    const productId = req.params.id
    const update = {
        $inc: {
            qty: -1
        }
    }
    Product.findByIdAndUpdate(productId, update, { new: true })
        .then(product => {
            res.redirect(`/products/${product._id}`)
        })
        .catch(err => {
            res.json(err)
        })

})

// GET route for displaying my form for create
router.get('/new', (req, res) => {
    res.render('products/new')
})

// POST - Create
router.post('/', (req, res) => {




    Product.create(req.body)
        .then(product => {
            console.log(product)
            // res.json(product)
            res.redirect('/products')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - Index
// localhost:3000/products
router.get('/', (req, res) => {
    // mongoose to find all products
    Product.find({})
        // return products as json
        .then(products => {
            // res.json(product)
            res.render('products/index', { products })
        })
        .catch(err => {
            res.json(err)
        })
})

//SEED route
router.get('/seed', (req, res) => {
    const startProducts = [
        {
            name: 'African Grey',
            description: 'A very smart, yet sometimes neurotic, talkative parrot. Medium on the loudness scale and size.',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.4h1vl8brgVGSLK5U7hhmUQHaIh%26pid%3DApi&f=1',
            price: 6500,
            qty: 3
        },
        {
            name: 'Blue and Gold Macaw',
            description: 'A beautiful and bright parrot that are known for a comical personality. Large on the loudness and size scale.',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.huCBoVDoftSl6ZqElmub0AHaEK%26pid%3DApi&f=1',
            price: 10000,
            qty: 2
        },
        {
            name: 'Sun Conure',
            description: 'Very fun and personable little parrot that loves climbing and cuddling. Medium loudness and size.',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ojGXGG-d1AUkhSj3PN8ZJQHaEK%26pid%3DApi%26h%3D160&f=1',
            price: 3000,
            qty: 6
        },
        {
            name: 'Hyacinth Macaw',
            description: 'A bird as beutiful as it is large, the hyacinth is definitely a bird only for experienced bird handler.',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ikCCQK-ZC27JHc8vXK4aPgHaE5%26pid%3DApi&f=1',
            price: 25000,
            qty: 1
        },
        {
            name: 'Moluccan Cockatoo',
            description: 'Very loud and quite crafty, these birds are known for escaping from even the most secure enclosures.',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.xZ1fzaFijJMlZwgnmKupdAHaE8%26pid%3DApi&f=1',
            price: 15000,
            qty: 3
        },
        {
            name: 'Yellow-naped Amazon',
            description: 'An intelligent medium sized bird with a remarkable speaking ability.',
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._Yp986omddPIvB7L49GeYgHaE8%26pid%3DApi&f=1',
            price: 4000,
            qty: 6
        },
    ]
    Product.deleteMany({})

        .then(() => {
            Product.create(startProducts)

                .then(data => {
                    res.json(data)
                })

                .catch(console.error)
        })
})


// GET - Show
// localhost:3000/products/:id <- change with the id being passed in
router.get('/:id', (req, res) => {
    const productId = req.params.id

    Product.findById(productId)
        // send back some json
        .then(product => {
            // res.json(product)
            res.render('products/show', { product })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router