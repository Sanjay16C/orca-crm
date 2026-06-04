import mongoose , { Schema } from "mongoose";

const WorkspaceSchema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        code : {
            type : String,
            unique : true,
            required : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true
        }
    },
    {
        timestamps:true
    }
);

export const Workspace = mongoose.model("Workspace",WorkspaceSchema);