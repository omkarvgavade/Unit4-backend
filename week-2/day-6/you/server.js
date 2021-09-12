const express = require('express')
const mongoose = require('mongoose');



const connect = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/library")
}



const app = express();


// Author model
const authorSchema = new mongoose.Schema({
    first_name: { type: "string", required: true },
    last_name: { type: "string", required: true },

})

const Author = mongoose.model("author", authorSchema)

// books model
const bookSchema = new mongoose.Schema({
    book_name: { type: String, required: true },
    body: { type: String, required: true },
    checked: { type: Boolean, required: false, default: false },

    authorId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'author',
        required: true
    }],
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'section',
        required: true
    }
})

const Book = mongoose.model("book", bookSchema)

//Sections model

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true },
})

const Section = mongoose.model('section', sectionSchema)

app.use(express.json())
//CRUD operations for authors
app.post("/authors", async (req, res) => {
    console.log(req.body)
    const author = await Author.create(req.body)
    return res.status(201).json({ author })
})
app.get("/authors", async (req, res) => {
    console.log("hii")
    const authors = await Author.find().lean().exec()

    return res.status(200).json({ authors })
})
app.get("/authors/:id", async (req, res) => {
    const author = Author.find(req.params.id).lean().exec()
    return res.status(200).json({ user })
})

//crud operations for sections
app.post("/sections", async (req, res) => {
    const section = await Section.create(req.body)
    return res.status(201).json({ section })
})
app.get("/sections", async (req, res) => {
    const sections = await Section.find().lean().exec()
    return res.status(200).json({ sections })
})




//crud operations for book
app.post("/books", async (req, res) => {
    const book = await Book.create(req.body)
    return res.status(201).json({ book })
})
app.get("/books", async (req, res) => {
    const books = await Book.find().populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ books })
})
app.patch('/books/:id', async (req, res) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean().exec()
    return res.status(201).json({ book })
})

app.get("/books/section/:id", async (req, res) => {
    const book = await Book.find({ "sectionId": { "_id": req.params.id } }).populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ book })
})
//find by checked 
app.get("/books/checked", async (req, res) => {
    const books = await Book.find({ "cheked": false }).populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ books })
})
app.get("/books/section/checked/:id", async (req, res) => {
    const books = await Book.find({ $and: [{ "sectionId": { "_id": req.params.id } }, { "checked": false }] }).populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ books })
})

// app.get("/books/:id", async (req, res) => {
//     const book = await Book.find({ "authorId": { "_id": req.params.id } }).populate("authorId").populate("sectionId").lean().exec()
//     return res.status(200).json({ book })
// })
app.listen(2345, async function () {
    await connect()
    console.log("listening on port 2345")
});