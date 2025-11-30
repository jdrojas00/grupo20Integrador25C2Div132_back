import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, getProductsByCategory, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

// Custom - Obtener productos por categoria
router.get("/type/:category", getProductsByCategory);

router.post("/", createProduct);

router.put("/", modifyProduct);

router.delete("/:id", validateId, removeProduct);


export default router;