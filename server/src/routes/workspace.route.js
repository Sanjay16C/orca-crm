import { Router } from "express";
import { createWorkspace, deleteWorkspace, fetchWCode, getMembership, getMyWorkspace, joinWorkspace, removeMember, rotateWorkspaceCode, searchWorkspace, updateRole } from "../controllers/workspace.controller.js";
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
workspaceRouter.patch("/rotateCode",authMiddleware,requireRole(["owner"]),rotateWorkspaceCode);
workspaceRouter.get("/fetchWCode/:workspaceId",authMiddleware,requireRole(["owner","admin"]),fetchWCode);

export default workspaceRouter;