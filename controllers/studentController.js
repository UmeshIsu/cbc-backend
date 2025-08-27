import Student from "../models/student.js"
import User from "../models/user.js"

// FUnctions for get requests
export async function  getStudent (req,res){
    try{
        const students = await Student.find();
        res.json(students)
    }catch(err){
        console.error(err);
        res.status(500).json({
            message:"Failed to retrive students"
        })
    }
        
    }

// FUnctions for post requests
export function createStudent(req,res){ 
    if(req.user == null){
		res.status(401).json({
			message : "Please login and try again"
		})
		return
	}

	if(req.user.role != "admin"){
		res.status(403).json({
			message: "You are not authorized to create a student"
		})
		return
	}
        const student = new Student(
            {
                name :req.body.name,
                age : req.body.age,
                city: req.body.city
            }
        )
        student.save().then(
            ()=>{
                res.json(
                    {message:"Student create successfully"}
                )
            }
        ).catch(
            ()=>{
                res.json(
                    {message:"failed to create successfully"}
                )
            }
        )
        console.log(req.body)
    } 