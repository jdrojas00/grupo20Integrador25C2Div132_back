import express from "express";
const app = express();

import environments from "./src/api/config/environments.js";
const PORT = environments.port;

import cors from "cors";

import { loggerUrl, requireLogin } from "./src/api/middlewares/middlewares.js";

import { productRoutes } from "./src/api/routes/index.js";

import { join, __dirname } from "./src/api/utils/index.js";
import connection from "./src/api/database/db.js";

import session from "express-session";
const SESSION_KEY = environments.session_key;



/* Middlewares */
app.use(cors());

app.use(loggerUrl);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "src", "public")));

app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));


app.set("view engine", "ejs");
app.set("views", join(__dirname, "src", "views"));


/* Endpoints */

app.use("/api/products", productRoutes);

app.get("/", requireLogin, async (req, res) => {

    try {
        const [rows] = await connection.query("SELECT * FROM productos");

        res.render("index", {
            title: "Indice",
            about: "Lista de productos",
            products: rows
        });

    } catch (error) {
        console.log(error);
    }
});

app.get("/consultar", requireLogin, (req, res) => {
    res.render("consultar", {
        title: "Consultar",
        about: "Consultar producto por id:"
    });
});

app.get("/crear", requireLogin, (req, res) => {
    res.render("crear", {
        title: "Crear",
        about: "Crear producto"
    });
});

app.get("/modificar", requireLogin, (req, res) => {
    res.render("modificar", {
        title: "Modificar",
        about: "Actualizar producto"
    });
})

app.get("/eliminar", requireLogin, (req, res) => {
    res.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar producto"
    });
})

// Vista de login
app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Login dashboard"
    });
});

app.post("/api/ticket", async (req, res) => {
    const { producto_id, nombre_usuario, precio_total } = req.body;

    if (!Array.isArray(producto_id) || producto_id.length === 0) {
        return res.status(400).json({ error: "producto_id debe ser un array con IDs de productos" });
    }
    if (!nombre_usuario || !precio_total) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    try {
        const [ticketResult] = await connection.query(
            `INSERT INTO tickets (nombreUsuario, precioTotal, fechaEmision) VALUES (?, ?, CURDATE())`,
            [nombre_usuario, precio_total]
        );

        const ticketId = ticketResult.insertId;

        for (const idProd of producto_id) {
            await connection.query(
                `INSERT INTO productos_tickets (idProducto, idTicket) VALUES (?, ?)`,
                [idProd, ticketId]
            );
        }
        res.json({
            mensaje: "Compra registrada correctamente",
            ticketId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al registrar la compra" });
    }
});


// Endpoint para iniciar sesion
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "Login",
                about: "Login dashboard",
                error: "Todos los campos son obligatorios"
            });
        }

        const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
        const [rows] = await connection.query(sql, [email, password]);

        if (rows.length === 0) {
            return res.render("login", {
                title: "Login",
                about: "Login dashboard",
                error: "Credenciales incorrectas"
            })
        }

        const user = rows[0];
        console.table(user);

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        }

        res.redirect("/");


    } catch (error) {
        console.error("Error en el login", error);
    }
});

app.post("/logout", (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            console.log("Error al destruir la sesion", err);
            return res.status(500).json({
                error: "Error al cerrar la sesion"
            });
        }

        res.redirect("/login");
    });
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});