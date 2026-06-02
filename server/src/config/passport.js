import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config({
    path : "./.env"
});

passport.use(
    new Strategy(
        {
            clientID : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET,
            callbackURL : `${process.env.SERVER_URL}/auth/google/callback`
        },
        async(accessToken,refreshToken,profile,done)=>{
            try {
                let user = await User.findOne({googleId:profile.id});
                if(!user){
                    user = await User.create({
                        googleId : profile.id,
                        username : profile.displayName,
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(32).toString("hex"),
                        verifiedUser : true
                    })
                }
                done(null,user);
            } catch (error) {
                done(error,null);
            }
            
        }
    )
);

export default passport;