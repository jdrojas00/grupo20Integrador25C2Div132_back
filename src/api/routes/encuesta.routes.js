import express from "express";
import multer from "multer";

import { guardarEncuesta, descargarExcel } from "../controllers/encuestaController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/encuestas/" });

router.post("/encuesta", upload.single("imagen"), guardarEncuesta);
router.get("/encuestas/excel", descargarExcel);

export default router;