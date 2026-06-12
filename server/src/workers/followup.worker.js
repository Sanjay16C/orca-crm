import { Worker } from "bullmq";
import { User } from "../models/user.model.js";
import { sendMail } from "../utils/sendMail.js";

const followupWorker = new Worker(
    "followup-reminders",
    async(job)=>{
        console.log(`Followup for ${job.data.customerName}`);
        const user = await User.findById(job.data.assignedTo);
        if(!user) return;
        await sendMail(
            user.email,
            "CRM Follow-up Reminder",
            `Customer: ${job.data.customerName}
            Priority: ${job.data.customerPriority}
            Please contact this customer today.`
        );
        console.log(`Customer: ${job.data.customerName}
            Priority: ${job.data.customerPriority}
            Please contact this customer today.`);
    },
    {
        connection : {
            host : "127.0.0.1",
            port : 6379
        }
    }
);

followupWorker.on("completed",(job)=>{
    console.log(`Job ${job.id} completed`);
});
followupWorker.on("failed",(job,error)=>{
    console.log(`Job ${job.id} failed`,error.message);
});