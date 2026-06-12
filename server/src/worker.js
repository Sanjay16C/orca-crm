import "../src/workers/followup.worker.js"
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});

const startWorker = async() =>{
    try {
        await connectDB();
        console.log("Worker Started");
        
    } catch (error) {
        console.log("Worker Failed to run",error.message);
    }
}

startWorker();