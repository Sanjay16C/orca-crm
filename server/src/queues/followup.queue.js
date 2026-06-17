import { Queue } from "bullmq";

const redisConnection =
  process.env.NODE_ENV === "production"
    ? { url: process.env.REDIS_URL }
    : {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379
      };

export const followupQueue = new Queue(
    "followup-reminders",
    {
        connection : redisConnection
    }
);

