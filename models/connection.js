require('dotenv').config()

const mongoose = require('mongoose')

const DATABASE_URI = process.env.DATABASE_URI
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//connect mongodb to mongoose

mongoose.connection
    .on('open', () => console.log('COnnected to Mongose'))
    .on('close', () => console.log('DIsconnected from Mongoose'))
    .on('error', err => console.error(err))

module.exports = mongoose