import { WorkspaceMember } from "../models/workspaceMember.model.js";

export const requireRole = (roles) =>{
    return async(req,res,next)=>{
            try {
                const workspaceId = req.body?.workspaceId || req.params?.workspaceId;
                const membership = await WorkspaceMember.findOne({
                    user : req.user.id,
                    workspace : workspaceId
                });
                
                if(!membership) return res.status(403).json({
                    message : "Not a member of this workspace"
                })
                
                if(!roles.includes(membership.role)) return res.status(403).json({
                    message : "Permission Denied !!!"
                })
                req.membership = membership;
                next();
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    message : "Internal Server Error"
                })
            }
        };
    
}