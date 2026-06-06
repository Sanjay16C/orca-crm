import { Router } from "express";
import { createWorkspace, deleteWorkspace, getMembership, getMyWorkspace, joinWorkspace, removeMember, searchWorkspace, updateRole } from "../controllers/workspace.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";

const workspaceRouter = Router();

workspaceRouter.post("/create",authMiddleware,createWorkspace);
workspaceRouter.get("/getAll",authMiddleware,getMyWorkspace);
workspaceRouter.post("/search",authMiddleware,searchWorkspace);
workspaceRouter.post("/join",authMiddleware,joinWorkspace);
workspaceRouter.post("/update-role",authMiddleware,requireRole(["owner","admin"]),updateRole);
workspaceRouter.get("/getMembership/:workspaceId",authMiddleware,getMembership);
workspaceRouter.delete("/removeMember",authMiddleware,requireRole(["owner"]),removeMember);
workspaceRouter.delete("/delete-workspace/:workspaceId",authMiddleware,requireRole(["owner"]),deleteWorkspace);

export default workspaceRouter;