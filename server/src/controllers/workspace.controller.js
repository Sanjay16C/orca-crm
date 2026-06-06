import { Workspace } from "../models/workspace.model.js";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { WorkspaceMember } from "../models/workspaceMember.model.js";

const createWorkspace = async(req,res) =>{
    try {
        const {name} = req.body;
        const code = crypto.randomBytes(3).toString("hex").toUpperCase();
        const workspace = await Workspace.create({
            name,
            code,
            owner : req.user.id
        });
        const exists = await WorkspaceMember.findOne({
            workspace : workspace._id,
            user : req.user.id
        });
        if(exists) return res.status(400).json({
            message : "User is already a member"
        })
        await WorkspaceMember.create({
            workspace : workspace._id,
            user : req.user.id,
            role : "owner"
        });
        await workspace.populate("owner");
        res.status(200).json({
            message : "Workspace created successfully" , workspace
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const getMyWorkspace = async(req,res) =>{
    try {
        const memberships = await WorkspaceMember
        .find({user:req.user.id}).populate("workspace");
        let workspaces = memberships.map((membership)=>membership.workspace);
        workspaces =  await Promise.all(
            workspaces.map((workspace)=> workspace.populate("owner"))
        );
        res.status(200).json({workspaces});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const searchWorkspace = async(req,res) =>{
    try {
        const {code} = req.body;
        const workspace = await Workspace.findOne({code});
        if(!workspace) return res.status(404).json({
            message : "No workspace Found"
        })
        await workspace.populate("owner");
        res.status(200).json({
            message : "Workspace retreived" , workspace
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const joinWorkspace = async(req,res) =>{
    try {
        const {code} = req.body;
        const workspace = await Workspace.findOne({code});
        const workspaceMember = await WorkspaceMember.create({
            workspace : workspace._id,
            user : req.user.id,
            role : "member"
        });
        res.status(200).json({
            message : "Joined Workspace" , workspaceMember
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const updateRole = async(req,res) =>{
    try {
        const {role,userId,workspaceId} = req.body;
        const membership = await WorkspaceMember.findOne(
            {workspace:workspaceId,user:userId}
        );
        if(!membership){
            return res.status(404).json({
                message:"Member not found"
            });
        }
        if(req.membership.role==="admin"){
            if(membership.role==="owner") return res.status(403).json({
                message : "Admins cannot modify owner roles"
            })
            if(role==="owner") return res.status(403).json({
            message : "Only owners can assign owners"
        })
        } 
        membership.role = role;
        await membership.save();
        res.status(200).json({
            membership
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

const getMembership = async(req,res) =>{
    try {
        const {workspaceId} = req.params;
        const membership = await WorkspaceMember.findOne({
            user : req.user.id,
            workspace : workspaceId
        });
        res.status(200).json({
            role : membership.role
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Internal Server Error"
        });
    }
}

export{
    createWorkspace,
    getMyWorkspace,
    searchWorkspace,
    joinWorkspace,
    updateRole,
    getMembership
};