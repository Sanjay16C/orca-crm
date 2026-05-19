import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`DB connected : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("DB Failed to connect",error.message);
    }
}