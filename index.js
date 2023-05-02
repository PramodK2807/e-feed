const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3100

require('./db/config')
const Student = require('./model/StudentModel')

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("HI")
})

app.get('/student', async (req, res) => {
    let student = await Student.find()
    try {
        if (student) {
            res.status(200).send({
                success: true,
                message: "Student Data Fetched Successfully",
                student
            })
        }
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error"
        })
    }
})

app.get('/student/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const student = await Student.findById({ _id: id });
        if (student) {
            res.status(200).send({
                success: true,
                message: "Student updated Successfully",
                student
            })
        }
    }

    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error"
        })
    }

})

app.post('/student', async (req, res) => {
    let { name, email, age, fathers_name, contact_number, city } = req.body
    try {
        let existingStudent = await Student.findOne({ email })
        if (existingStudent) {
            return res.status(200).send({
                success: false,
                message: "Student already registered",
            })
        }

        let student = new Student({ name, email, age, fathers_name, contact_number, city })
        await student.save()
        res.status(200).send({
            success: true,
            message: "Student Registered Successfully",
            student
        })
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Error"
        })
    }
})



app.delete('/student/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.deleteOne({ _id: id });
    res.status(200).send({
        success: true,
        message: "Students deleted successfully",
        student
    })
})

app.put('/student/:id', async (req, res) => {
    const id = req.params.id;
    let { name, email, age, fathers_name, contact_number } = req.body;
    let student = await Student.updateOne({ _id: id },
        { $set: { name, age, email, fathers_name, contact_number } })
    res.status(200).send({
        success: true,
        message: "Student updated Successfully",
        student
    })
})


app.listen(PORT)
