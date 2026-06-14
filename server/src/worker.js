import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
import { logger } from "./utils/logger.js";
dotenv.config({
    path : "./.env"
});

const startWorker = async() =>{
    try {
        await connectDB();
        await import("../src/workers/followup.worker.js");
        logger.info("Worker Started");
        
    } catch (error) {
        logger.error(`Worker Failed to run: ${error.message}`);
    }
}

startWorker();