import nodemailer from "nodemailer";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();
dns.setDefaultResultOrder("ipv4first");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure:true,
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

export const sendMail = async(to,subject,text) =>{
    await transporter.sendMail({
        from : process.env.EMAIL_USER,
        to, subject , text
    });
};