import {body , validationResult} from "express-validator";

export const signupValidation = [
    body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({min:5,max:15})
    .withMessage("Username must be 5-15 characters"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:5,max:30})
    .withMessage("Password must be 5-30 characters"),
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not Valid"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({
            errors : errors.array()
        });
        next();
    }
];

export const loginValidation = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email"),
    body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min:5,max:30})
    .withMessage("Password must be atleast 5-30 characters"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({
            errors : errors.array()
        });
        next();
    }
];
    
export const verifyMailValidation = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()
    .withMessage("Email is invalid"),
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({
            errors : errors.array()
        })
        next();
    }

];