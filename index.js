import  express from "express";
import mongoose from "mongoose";
import Student from "./models/student.js";
import studentRouter from "./routes/stuedntRouter.js";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken"
import productRouter from "./routes/productRouter.js";

const app = express();
const connection_string = "mongodb+srv://admin:123@cluster0.lfyoelh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connection_string).then(
    ()=>{
        console.log("Database connected succesfully")
    }
).catch(
    ()=>{
        console.log("Database connection failed")
    }
)


app.use(express.json())

//middleware
app.use(
    (req,res,next)=>{
        let token  = req.header("Authorization")
        if(token != null){
            token = token.replace("Bearer ","")
            console.log(token) 
            jwt.verify(token,"jwt-secret",
                (err,decoded)=>{
                    if(decoded==null){
                        res.json({
                        message :"Invalid token please login again"
                    })
                    return
                    }else{
                        req.user = decoded
                     }
                }
            )
        }
        next()
    }
)

app.use("/students",studentRouter)
app.use("/users",userRouter)
app.use("/product",productRouter)

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
    console.log("Thank you")
});




//mongodb+srv://admin:123@cluster0.lfyoelh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0