import { Router } from "express";
import { createWorkspace, getMyWorkspace, joinWorkspace, searchWorkspace } from "../controllers/workspace.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const workspaceRouter = Router();

workspaceRouter.post("/create",authMiddleware,createWorkspace);
workspaceRouter.get("/getAll",authMiddleware,getMyWorkspace);
workspaceRouter.post("/search",authMiddleware,searchWorkspace);
workspaceRouter.post("/join",authMiddleware,joinWorkspace);

export default workspaceRouter;