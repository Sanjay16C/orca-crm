import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addCustomer, addNote, deleteCustomer, deleteNote, getAllCustomers, getOneCustomerForNotes, updateCustomer, updateNote } from "../controllers/cust.controller.js";
import { requireRole } from "../middlewares/requireRole.middleware.js";

const custRouter = Router();

custRouter.post("/create",authMiddleware,requireRole(["owner","admin","member"]),addCustomer);
custRouter.get("/getall/:workspaceId",authMiddleware,requireRole(["owner","admin","member"]),getAllCustomers);
custRouter.patch("/update/:id",authMiddleware,requireRole(["owner","admin"]),updateCustomer);
custRouter.delete("/:workspaceId/delete/:id",authMiddleware,requireRole(["owner","admin"]),deleteCustomer);
custRouter.get("/:workspaceId/:id",authMiddleware,requireRole(["owner","admin","member"]),getOneCustomerForNotes);
custRouter.post("/:id/notes",authMiddleware,requireRole(["owner","admin","member"]),addNote);
custRouter.delete("/:workspaceId/:custId/notes/:noteId",authMiddleware,requireRole(["owner","admin"]),deleteNote);
custRouter.patch("/:custId/notes/:noteId",authMiddleware,requireRole(["owner","admin"]),updateNote);

export default custRouter;