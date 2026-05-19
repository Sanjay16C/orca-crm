import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { addCustomer, addNote, deleteCustomer, deleteNote, getAllCustomers, getOneCustomer, updateCustomer, updateNote } from "../controllers/cust.controller.js";


const custRouter = Router();

custRouter.post("/create",authMiddleware,addCustomer);
custRouter.get("/getall",authMiddleware,getAllCustomers);
custRouter.get("/:id",authMiddleware,getOneCustomer)
custRouter.patch("/update/:id",authMiddleware,updateCustomer);
custRouter.delete("/delete/:id",authMiddleware,deleteCustomer);
custRouter.post("/:id/notes",authMiddleware,addNote);
custRouter.delete("/:custId/notes/:noteId",authMiddleware,deleteNote);
custRouter.patch("/:custId/notes/:noteId",authMiddleware,updateNote);
export default custRouter;