const express = require('express')
const mongoose = require('mongoose')

const connect = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/masaischool")
}

const app = express()
app.use(express.json())
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
const Instructor = mongoose.model("instructor", instructorSchema)
//creating model for batch
const batchSchema = new mongoose.Schema({
    batch_name: { type: String, required: true },
    startDate: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    noOfStudents: { type: Number, required: true },
    noOfBoys: { type: Number, required: true },
    noOfGirls: { type: Number, required: true },
    codingInstructorId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "instructor" }],
    dsaInstructorId: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "instructor" }],
    csbtInstructor: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "instructor" }]
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
app.post('/batches', async (req, res) => {
    const batch = await Batch.create(req.body);
    res.status(201).send({ batch })
})
app.post('/instructors', async (req, res) => {
    const instructor = await Instructor.create(req.body);
    res.status(201).send({ instructor })
})

app.post('/courses', async (req, res) => {
    const course = await Course.create(req.body);
    res.status(201).send({ course })
})


//1) find all students who are older than 18
app.get('/students', async (req, res) => {
    const students = await Student.find({ "age": { $gt: 18 } }).lean().exec();
    res.status(200).send({ students })
})
app.post('/students', async (req, res) => {
    const student = await Student.create(req.body);
    res.status(201).send({ student })
})

//2) find all the students who have applied for full stack web development course
app.get("/students/course/:id", async (req, res) => {
    const students = await Student.find({ "courseId": { "_id": req.params.id } }).populate("courseId").populate("batchId").lean().exec()
    res.status(200).send({ students })
})

// 3) find number of students those are men and those are women
app.get("/students/men", async (req, res) => {
    const menStudents = await Student.find({ "gender": "male" }).count()
    res.status(200).send({ menStudents })
})

app.get("/students/women", async (req, res) => {
    const womenStudents = await Student.find({ "gender": "female" }).count()
    res.status(200).send({ womenStudents })
})


// 4) total number of students on site
app.get('/studentscount', async (req, res) => {
    const students = await Student.find().count();
    res.status(200).send({ students })
})

// 5) find the batch which has most students
app.get('/batches/noOfStudents', async (req, res) => {

    const batch = await Batch.find().sort({ "noOfStudents": -1 }).limit(1).lean().exec();
    res.status(200).send({ batch })
})
// 6) find the instructor which is currently teaching most number of students
app.get('/batches/instructor', async (req, res) => {
    const batch = await Batch.find().sort({ "noOfStudents": -1 }).limit(1).lean().exec();
    res.status(200).send({ batch })
})
//get for courses ,batches,instructors
app.get('/courses', async (req, res) => {
    const courses = await Course.find().lean().exec();
    res.status(200).send({ courses })
})
app.get('/batches', async (req, res) => {
    const batches = await Batch.find().lean().exec();
    res.status(200).send({ batches })
})
app.get('/batches/instructors/:id', async (req, res) => {
    const instructor = await Batch.find({ "csbtInstructor": req.params.id }).sort({ "noOfStudents": -1 }).limit(1).populate("csbtInstructor").lean().exec();
    res.status(200).send({ instructor })
})

app.listen(2345, async function () {
    await connect();
    console.log("listening to server 2345")
})