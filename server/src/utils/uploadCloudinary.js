import streamifier from "streamifier";
import cloudinary from "../config/cloud.js";

export const uploadToCloudinary = (buffer) =>{
    return new Promise((resolve,reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder : "orca-crm-profile-pictures"
            },
            (error,result)=>{
                if(error) reject(error);
                else resolve(result);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};