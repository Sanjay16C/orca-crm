import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) =>{
    try {
        const tokenHeader = req.headers.authorization;
        if(!tokenHeader) return res.status(401).json({
            message : "No Token"
        })
        const token = tokenHeader.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message : "Invalid Token"
        })
    }
}