import { Router } from "express";
import { productsView } from "../controllers/view.controllers.js";
import { loginUser, logoutUser } from "../controllers/auth.controllers.js";
import { requireLogin } from "../middlewares/middlewares.js";
import { mostrarRegistros } from "../controllers/registros.controllers.js";
const router = Router();

router.get("/", requireLogin, productsView);

router.get("/consultar", requireLogin, (req, res) => {

    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id"
    });
});

router.get("/crear", requireLogin, (req, res) => {

    res.render("crear", {
        title: "Crear",
        about: "Crear"
    });
});

router.get("/modificar", requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    })
});

router.get("/eliminar", requireLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    })
});

router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Login dashboard"
    });
});

router.get("/registros", mostrarRegistros, requireLogin, (req, res) => {
    res.render("registros", {
        title: "Modificar",
        about: "Actualizar producto"
    })
});

router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;