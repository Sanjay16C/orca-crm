import {Schema} from "mongoose";
import mongoose from "mongoose";

const CustSchema = new Schema(
    {
        name : {
            type : String,
            required:true,
            min:3,
            max:30
        },
        email : {
            type : String,
            required : true
        },
        phone : {type : String},
        company : {type : String},
        status : {
            type : String,
            enum : ["Lead","Qualified","Proposal","Won","Lost"],
            default : "Lead"
        },
        priority : {
            type : Number,
            enum : [1,2,3,4,5],
            default : 1
        },
        assignedTo : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        notes : [
            {
                title : {
                    type:String
                },
                content : {
                    type:String
                },
                createdAt : {
                    type : Date,
                    default : Date.now
                }
            }
        ],
        lastcontacted : {
            type : Date,
            default : null
        },
        nextFollowup : {
            type:Date,
            default : null
        },
        workspace : {
            type : Schema.Types.ObjectId,
            ref : "Workspace",
            required : true
        },
        nextFollowupJobId : {
            type : String,
            default : null
        }
    },
    {
        timestamps:true
    }
);

export const Cust = mongoose.model("Customer",CustSchema);