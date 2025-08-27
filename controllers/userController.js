import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

    export function createUser(req,res){

    // Hashing password by bcrypt    
    const hashedPasswowd = bcrypt.hashSync(req.body.password, 10)

    const user = new User(
        {
            email : req.body.email,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            password : hashedPasswowd , // Hashing password by bcrypt 
            role: req.body.role
        }
    )

    user.save().then(
        ()=>{
            res.json({
                message : "User created successfully"
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "Failed to create user"
            })
        }
    )
}

export function loginUser(req,res){
    User.findOne({
        email:req.body.email
    }).then(
        (user)=>{
            if(user == null){
                res.json(
                    {
                        message:"usr not found"
                    }
                )
            }else{
                const paswmatching = bcrypt.compareSync(req.body.password,user.password)
                if(paswmatching){
                    const token = jwt.sign(
                        {
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            role : user.role,
                            isBlock : user.isBlock,
                            isEmailVerified :  user.isEmailVerified
                        },
                        "jwt-secret"
                    )
                    res.json(
                        {
                            message:"Login successful",
                            token: token
                        }
                    )

                }else{
                    res.status(500).json(
                        {
                            message : " Invalid passwoord"
                        }
                    )
                }
            }
        }
    )
}export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role != "admin"){
        return false
    }

    return true
}