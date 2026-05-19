import express from "express";
import userRouter from "./routes/user.route.js";
import cors from "cors";
import custRouter from "./routes/customer.route.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth",userRouter)
app.use("/customer",custRouter)

export default app;