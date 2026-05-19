import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signup = async(req,res) => {
    try {
        const {username,email,password} = req.body;
        if(!email || !password || !username) return res.status(400).json({
            message : "All fields are required"
        })
        const exists = await User.findOne({email});
        if(exists) return res.status(400).json({
            message : "User already exists"
        })
        const hashed = await bcrypt.hash(password,10);
        const user = await User.create({
            username , email , password : hashed
        })
        res.status(201).json({
            message : "User Created!!", user : {
                id : user._id , username , email
            }
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const login = async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(401).json({
            message : "Invalid Credentials"
        })
        const isMatch = await bcrypt.compare(password,user.password)
        if(!user || !isMatch) return res.status(401).json({
            message : "Invalid Credentials"
        })
        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn:"10m"}
        );
        res.status(200).json({
            message : "Login succesful " , token
        })

    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const fetchUsers = async(req,res) =>{
    try {
        const users = await User.find();
        return res.status(200).json({
            message : "Users fetched successfully" , users
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
}


export {
    signup,
    login,
    fetchUsers
}