const mongoose = require('mongoose')

let studentSchema = new mongoose.Schema({
    name:{
        required: true,
        type:String
    },
    fathers_name:{
        required: true,
        type:String
    },
    email: {
        type:String,
        required: true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    contact_number:{
        type:Number,
        required:true
    },
    city:{
        required: true,
        type:String
    }
})

module.exports = mongoose.model("students", studentSchema);