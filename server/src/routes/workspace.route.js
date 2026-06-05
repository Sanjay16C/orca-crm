import { Router } from "express";
import { createWorkspace, getMyWorkspace, joinWorkspace, searchWorkspace, updateRole } from "../controllers/workspace.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const workspaceRouter = Router();

workspaceRouter.post("/create",authMiddleware,createWorkspace);
workspaceRouter.get("/getAll",authMiddleware,getMyWorkspace);
workspaceRouter.post("/search",authMiddleware,searchWorkspace);
workspaceRouter.post("/join",authMiddleware,joinWorkspace);
workspaceRouter.post("/update-role",authMiddleware,updateRole);

export default workspaceRouter;