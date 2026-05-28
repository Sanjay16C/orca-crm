import { Router } from "express";
import { fetchUsers, forgotPassword, googleCallback, login, logout, refreshAccessToken, resetPassword, signup } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { loginValidation, signupValidation } from "../middlewares/validation.middleware.js";
import passport from "passport";

const userRouter = Router();

userRouter.post("/login",loginValidation,login);
userRouter.post("/signup",signupValidation,signup);
userRouter.get("/fetchusers",authMiddleware,fetchUsers);
userRouter.post("/refresh",refreshAccessToken);
userRouter.post("/logout",logout);
userRouter.post("/forgot-password",forgotPassword);
userRouter.post("/reset-password/:token",resetPassword);
userRouter.get("/google",passport.authenticate("google",{scope:["profile","email"]}));
userRouter.get(
    "/google/callback",
    passport.authenticate("google",{session:false,failureRedirect:"/"}),
    googleCallback
);

export default userRouter;