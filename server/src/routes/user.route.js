import { Router } from "express";
import { fetchUsersInWorkspaces, forgotPassword, googleCallback, login, logout, refreshAccessToken, resetPassword, signup, verificationStatus, verifyMail, verifyMailToken } from "../controllers/user.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.js";
import { loginValidation, signupValidation, verifyMailValidation } from "../middlewares/validation.middleware.js";
import passport from "passport";
import { authLimiter } from "../middlewares/rateLimit.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";

const userRouter = Router();

userRouter.post("/login",authLimiter,loginValidation,login);
userRouter.post("/signup",authLimiter,signupValidation,signup);
userRouter.get("/fetchusers/:workspaceId/users",authMiddleware,fetchUsersInWorkspaces);
userRouter.get("/fetchusers/:workspaceId/members",authMiddleware,requireRole(["owner","admin"]),fetchUsersInWorkspaces);
userRouter.post("/refresh",refreshAccessToken);
userRouter.post("/logout",logout);
userRouter.post("/forgot-password",authLimiter,forgotPassword);
userRouter.post("/reset-password/:token",authLimiter,resetPassword);
userRouter.get("/google",authLimiter,
    passport.authenticate("google",{scope:["profile","email"]})
);
userRouter.get(
    "/google/callback",
    passport.authenticate("google",{session:false,failureRedirect:"/"}),
    googleCallback
);
userRouter.post("/verify-mail",verifyMailValidation,verifyMail);
userRouter.get("/verify-mail/:token",verifyMailToken);
userRouter.get("/verification-status/:email",verificationStatus);

export default userRouter;