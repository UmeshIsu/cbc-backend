import mongoose from "mongoose";

// Schema for the database
const studentschema = new mongoose.Schema(
    {
        name:String,
        age:Number,
        city:String
    }
)

const Student = mongoose.model("Student",  studentschema)
export default Student;