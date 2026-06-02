import mongoose,{ Schema } from "mongoose";

const VerificationSchema = new Schema(
    {
        email : {
            type : String,
            trim : true,
            required : true,
            unique:true
        },
        verifiedMail : {
            type : Boolean,
            default : false
        },
        verifyMailToken : {
            type : String,
            default : null
        },
        verifyMailExpiry : {
            type : Date,
            default : null
        }
    }
);

export const Verification = mongoose.model("Verification",VerificationSchema);

