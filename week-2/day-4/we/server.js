const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/ninjas', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
//first step create schema
const movieSchema = new mongoose.Schema({
    movie_name: { type: String, required: true },
    production_year: { type: Number, required: true },
    budget: { type: Number, required: false },

})
//second step is to create a model
const Movie = mongoose.model('movies', movieSchema)
app.use(express.json())

app.get('/movies', async (req, res) => {

    try {
        console.log("yes")
        const movies = await Movie.find().lean().exec();
        res.send(movies)
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})
app.post('/movies', async (req, res) => {
    console.log(req.body)
    try {

        const movie = await Movie.create(req.body)
        console.log(movie)
        res.status(201).json({ movie })
        // res.send({ user })
        console.log("ranjan is posted")
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})
app.patch('/movies/:id', async (req, res) => {

    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(201).json({ movie })
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})
app.get('/movies/:id', async (req, res) => {
    try {
        console.log("yes")
        const movies = await Movie.find({ "_id": req.params.id }).lean().exec();
        res.send(movies)
    } catch (err) {
        console.log(err)
    }
})
app.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id, req.body)

        res.status(201).json({ movie })
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message })
    }

})
app.listen(3001, async () => {
    await connect();
    console.log("I am listening on this port 3001")
})
