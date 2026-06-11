import app from "./app.js";
import { connectDB } from "./config/database.js";
import "../src/workers/followup.worker.js";
import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});

const startServer = async() =>{
    try {
        await connectDB();
        const PORT = process.env.PORT || 8000;
        app.listen(PORT,()=>{
            console.log(`Server running on port : ${PORT}`);
        });
    } catch (error) {
        console.log("Server Failed to run",error.message);
    }
}

startServer();