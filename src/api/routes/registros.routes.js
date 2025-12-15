import express from "express";
import { mostrarRegistros } from "../controllers/registros.controllers.js";

const router = express.Router();

// Página principal de registros
router.get("/registros", mostrarRegistros);

export default router;