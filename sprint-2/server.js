const express = require('express')
const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/masaischool")
}

const app = express()

//creating model for courses 
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    duration_months: { type: Number, required: true },
    units: { type: Number, required: true },
    courseType: { type: String, required: true, default: "full time" }
})

const Course = mongoose.model("course", courseSchema)
//creating model for instructor
const instructorSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    expertise: { type: String, required: true }
})

//creating model for batch
const batchSchema = new mongoose.Schema({
    batch_name: { type: String, required: true },
    startDate: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    noOfStudents: { type: Number, required: true },
    noOfBoys: { type: Number, required: true },
    noOfGirls: { type: Number, required: true },
    codingInstructorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "instructor" },
    dsaInstructorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "instructor" }
})

const Batch = mongoose.model('batch', batchSchema)

//creating model for students
const studentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, default: 'male' },
    batchId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "batch" },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "course" }

})
const Student = new mongoose.model("student", studentSchema);


//CRUD operations for finding different queries
//1) find all students who are older than 18
app.get('/students', async (req, res) => {
    const students = await Student.find({ $gt: { "age": 18 } });
    res.status(200).send({ students })
})

//2) find all the students who have applied for full stack web development course
app.get("students/course/:id", async (req, res) => {
    const students = await Student.find({ "courseId": { "_id": req.params.id } }).lean().exec()
    res.status(200).send({ students })
})
app.listen(2345, async function () {
    await connect();
    console.log("listening to server 2345")
})