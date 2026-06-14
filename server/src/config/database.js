import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

export const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        logger.info(`DB connected : ${connectionInstance.connection.host}`);
    } catch (error) {
        logger.error(`DB Failed to connect: ${error.message}`);
    }
}