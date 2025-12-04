import { AuthModel } from "../models/auth.models.js";

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render("login", {
                title: "Login",
                about: "Login dashboard",
                error: "Todos los campos son obligatorios"
            });
        }

        const [rows] = await AuthModel.getUser(email, password);
        if (rows.length === 0) {
            return res.status(401).render("login", {
                title: "Login",
                about: "Login dashboard",
                error: "Credenciales incorrectas"
            })
        }

        const user = rows[0];

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        }

        res.redirect("/");


    } catch (error) {
        console.error("Error en el login", error);
    }
};

export const logoutUser = (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesion", err);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    });
};