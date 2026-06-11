import { Queue } from "bullmq";

export const followupQueue = new Queue(
    "followup-reminders",
    {
        connection : {
            host : "127.0.0.1",
            port : 6379
        }
    }
);

