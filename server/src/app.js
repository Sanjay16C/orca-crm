import express from "express";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import custRouter from "./routes/customer.route.js";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import workspaceRouter from "./routes/workspace.route.js";

dotenv.config({
    path : "./.env"
});

const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cors({
    origin : `${process.env.ORIGIN_URL}`,
    credentials : true
}));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/auth",userRouter);
app.use("/customer",custRouter);
app.use("/workspace",workspaceRouter);

export default app;