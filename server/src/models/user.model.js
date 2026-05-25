import mongoose,{Schema} from "mongoose";

const UserSchema = new Schema(
    {
        email : {
            type : String,
            trim : true,
            required : true
        },
        password : {
            type : String,
            required : true
        },
        username : {
            type : String,
            trim : true,
            required : true,
            min : 5,
            max : 15
        },
        refreshToken : {type : String }
    },
    {
        timestamps:true
    }
);

export const User = mongoose.model("User",UserSchema);