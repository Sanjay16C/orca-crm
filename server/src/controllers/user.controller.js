import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../utils/sendMail.js";

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
        const accessToken = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn:"10m"}
        );
        const refreshToken = jwt.sign(
            {id : user._id},
            process.env.REFRESH_SECRET,
            {expiresIn:"7d"}
        );
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV==="production" ? "none" : "strict",
            maxAge : 7*24*60*60*1000
        });
        res.status(200).json({
            message : "Login succesful", accessToken
        })

    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const fetchUsers = async(req,res) =>{
    try {
        const users = await User.find().select("-password -refreshToken");
        return res.status(200).json({
            message : "Users fetched successfully" , users
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const refreshAccessToken = async(req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({
                message:"No refresh token"
            });
        }
        
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET);
        const user = await User.findById(decoded.id);
        if(!user || user.refreshToken!==refreshToken) return res.status(403).json({
            message : "Invalid refresh token" 
        }) 
        const accessToken = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn : "10m"}
        )
        res.status(200).json({
            accessToken
        })
    } catch (error) {
        res.status(403).json({
            message : "Invalid refresh token"
        })
    }
}

const logout = async(req,res) =>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(200).json({
            message : "Already logged out"
        })
        const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET);
        if(!decoded) return res.status(403).json({
            message : "Invalid Refresh Token"
        })
        const user = await User.findById(decoded.id);
        if(user){
            user.refreshToken = null;
            await user.save();
        }
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV==="production" ? "none" : "strict"
        });
        res.status(200).json({
            message : "Logout successful"
        })
    } catch (error) {
        res.status(403).json({
            message:"Invalid refresh token"
        });
    }
}

const forgotPassword = async(req,res) =>{
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({
            message : "User Not Found"
        })
        const token = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpiry = Date.now() + 10*60*1000;
        await user.save();
        const resetTokenLink = `${process.env.ORIGIN_URL}/reset-password/${token}`;
        await sendMail(email,"Password Reset",`Reset pass using:${resetTokenLink}`);
        res.status(200).json({
            message:"Reset Link mail sent"
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const resetPassword = async(req,res) =>{
    try {
        const {token} = req.params;
        const {password} = req.body;
        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiry : {$gt : Date.now()}
        });
        if(!user) return res.status(400).json({
            message : "Invalid or Expired Token"
        })
        const hashed = await bcrypt.hash(password,10);
        user.password = hashed;
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;
        await user.save();
        res.status(200).json({
            message : "Password reset successful"
        })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

const googleCallback = async(req,res) =>{
    const accessToken = jwt.sign(
        {id:req.user.id},
        process.env.JWT_SECRET,
        {expiresIn:"10m"}
    )
    const refreshToken = jwt.sign(
        {id:req.user.id},
        process.env.REFRESH_SECRET,
        {expiresIn:"7d"}
    )
    req.user.refreshToken = refreshToken;
    await req.user.save();
    res.cookie("refreshToken",refreshToken,{
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge : 7*24*60*60*1000
    });
    res.redirect(`${process.env.ORIGIN_URL}/oauth-success?token=${accessToken}`);
}


export {
    signup,
    login,
    fetchUsers,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    googleCallback
}