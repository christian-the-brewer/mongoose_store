//import dependencies
//if I implement users
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const productRoutes = require('./controller/product_routes')


//create express app object
const app = require('liquid-express-views')(express())

//MIDDLEWARE
//request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
const session = require('connect-mongo')
//if I implement users
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URI
    }),
    saveUninitialized: true,
    resave: false
})
)

//ROUTES
app.use('/products', productRoutes)
//if I implement users
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.redirect('/products')
})

//SHHHHHSSSH LISTEN
const PORT = process.env.PORT
app.listen(Port, () => {
    console.log('App is online')
})