import { Router } from "express";
import { fetchUsers, login, signup } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post("/login",login);
userRouter.post("/signup",signup);
userRouter.get("/fetchusers",authMiddleware,fetchUsers)

export default userRouter;