import { Router } from "express";
const router = Router();
import { createTicket } from "../controllers/ticket.controllers.js";


router.post("/", createTicket); 


export default router;