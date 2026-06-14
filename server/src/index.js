import app from "./app.js";
import { connectDB } from "./config/database.js";
import dotenv from "dotenv";
import { logger } from "./utils/logger.js";
dotenv.config({
    path : "./.env"
});

const startServer = async() =>{
    try {
        await connectDB();
        const PORT = process.env.PORT || 8000;
        app.listen(PORT,()=>{
            logger.info(`Server running on port : ${PORT}`);
        });
    } catch (error) {
        logger.error(`Server Failed to run: ${error.message}`);
    }
}

startServer();