import { Worker } from "bullmq";
import { User } from "../models/user.model.js";
import { sendMail } from "../utils/sendMail.js";
import { logger } from "../utils/logger.js";

const followupWorker = new Worker(
    "followup-reminders",
    async(job)=>{
        logger.info(`Followup for ${job.data.customerName}`);
        const user = await User.findById(job.data.assignedTo);
        if(!user) return;
        await sendMail(
            user.email,
            "CRM Follow-up Reminder",
            `Customer: ${job.data.customerName}
            Priority: ${job.data.customerPriority}
            Please contact this customer today.`
        );
        logger.info(`Customer: ${job.data.customerName}
            Priority: ${job.data.customerPriority}
            Please contact this customer today.`);
    },
    {
        connection: {
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379
        }
    }
);

followupWorker.on("completed",(job)=>{
    logger.info(`Job ${job.id} completed`);
});
followupWorker.on("failed",(job,error)=>{
    logger.info(`Job ${job.id} failed`,error.message);
});