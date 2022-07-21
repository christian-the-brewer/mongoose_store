const mongoose = require('./connection')
const Product = require('./product')

const db = mongoose.connection

db.on('open', () => {
    // array of starter fruits
    const startProduct = [
        { name: "Orange", description: "an orange", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Ffresh-illuminated-orange-fruit-18035994.jpg&f=1&nofb=1", price: 2, qty: 6 },
        { name: "Grape", description: "a grape", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsteptohealth.com%2Fwp-content%2Fuploads%2F2017%2F01%2Fbunch-of-red-grapes.jpg&f=1&nofb=1", price: 5, qty: 7 },
        { name: "Banana", description: "a banana", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.samuitimes.com%2Fwp-content%2Fuploads%2F2013%2F08%2Fbananas-2.jpg&f=1&nofb=1", price: 1, qty: 3 },
        { name: "Strawberry", description: "a strawberry", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.picserver.org%2Fpictures%2Fstrawberry02-lg.jpg&f=1&nofb=1", price: 6, qty: 1 },
        { name: "Coconut", description: "a coconut", img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg3.exportersindia.com%2Fproduct_images%2Fbc-full%2Fdir_20%2F594338%2Fcoconut-1464477.jpg&f=1&nofb=1", price: 12, qty: 2 }
    ]


    // when we seed data, we usually clear out the db first
    Product.remove({})
        // then we create that data
        .then(deletedProducts => {
            console.log('this is what remove returns', deletedProducts)

            // now that our delete was successful, we can create our fruits
            Product.create(startProduct)
                .then(data => {
                    console.log('the new products', data)
                    db.close()
                })
                .catch(error => {
                    console.log('error:', error)
                    db.close()
                })
        })
        .catch(error => {
            console.log('error:', error)
            db.close()
        })
    // whether it's successful or not, we want to close our db connection
})