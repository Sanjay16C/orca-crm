import { Router } from "express";
import { fetchUsers, login, logout, refreshAccessToken, signup } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { loginValidation, signupValidation } from "../middlewares/validation.middleware.js";

const userRouter = Router();

userRouter.post("/login",loginValidation,login);
userRouter.post("/signup",signupValidation,signup);
userRouter.get("/fetchusers",authMiddleware,fetchUsers);
userRouter.post("/refresh",refreshAccessToken);
userRouter.post("/logout",logout);

export default userRouter;