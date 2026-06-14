import { createClient } from "redis";
import dotenv from "dotenv";
import { logger } from "../utils/logger.js";

dotenv.config();

export const redisClient = createClient({
    url : process.env.REDIS_URL || "redis://localhost:6379"
});

redisClient.on('error',(err)=>{
    logger.error("Redis Error : ",err);
})

await redisClient.connect();

logger.info("Redis connected");