const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectID
const app = express()
app.use(cors())
app.use(bodyParser.json())
require('dotenv').config()
const port = 5000


const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eax0o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const foodsCollection = client.db("epicEateries").collection("foods");
    const ordersCollection = client.db("epicEateries").collection("orders");
    const reviewsCollection = client.db("epicEateries").collection("reviews");
    console.log('database Connected');


    app.post('/allFoods', (req, res) => {
        const newFoods = req.body
        console.log(newFoods);
        foodsCollection.insertMany(newFoods)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/foods', (req, res) => {
        foodsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })



    app.post('/allOrders', (req, res) => {
        const newOrders = req.body
        console.log(newOrders);
        ordersCollection.insertOne(newOrders)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/addFoods', (req, res) => {
        const newFoods = req.body
        console.log(newFoods);
        foodsCollection.insertOne(newFoods)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.post('/addReviews', (req, res) => {
        const addReviews = req.body
        console.log(addReviews);
        reviewsCollection.insertOne(addReviews)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    })

    app.get('/reviews', (req, res) => {
        reviewsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents)
            })
    })

    app.delete('/delete/:id', (req, res) => {
        foodsCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                res.send(result.deletedCount > 0)

            })
    })

});



app.get('/', (req, res) => {
    res.send('Hello Worlddfd')
})

app.listen(process.env.PORT || port)