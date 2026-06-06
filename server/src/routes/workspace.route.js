import { Router } from "express";
import { createWorkspace, getMembership, getMyWorkspace, joinWorkspace, searchWorkspace, updateRole } from "../controllers/workspace.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";

const workspaceRouter = Router();

workspaceRouter.post("/create",authMiddleware,createWorkspace);
workspaceRouter.get("/getAll",authMiddleware,getMyWorkspace);
workspaceRouter.post("/search",authMiddleware,searchWorkspace);
workspaceRouter.post("/join",authMiddleware,joinWorkspace);
workspaceRouter.post("/update-role",authMiddleware,requireRole(["owner","admin"]),updateRole);
workspaceRouter.get("/getMembership/:workspaceId",authMiddleware,getMembership);

export default workspaceRouter;