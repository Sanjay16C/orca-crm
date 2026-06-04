import mongoose,{ mongo, Schema } from "mongoose";

const WorkspaceMemberSchema = new Schema(
    {   
        workspace : {
            type : Schema.Types.ObjectId,
            ref : "Workspace",
            required : true
        },
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        role : {
            type : String,
            enum : ["owner","admin","member"],
            default : "member"
        }
    },
    {
        timestamps : true
    }
);

export const WorkspaceMember = mongoose.model(
    "WorkspaceMember",WorkspaceMemberSchema);