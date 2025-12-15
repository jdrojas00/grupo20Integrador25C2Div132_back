import express from "express";
const app = express();

import environments from "./src/api/config/environments.js";
const PORT = environments.port;

import cors from "cors";

import { loggerUrl } from "./src/api/middlewares/middlewares.js";

import { productRoutes, viewRoutes, ticketRoutes, encuestaRoutes, registrosRoutes } from "./src/api/routes/index.js";

import { join, __dirname } from "./src/api/utils/index.js";

import session from "express-session";
const SESSION_KEY = environments.session_key;

app.use("/api", encuestaRoutes);

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

app.use("/", viewRoutes);

app.use("/api/ticket", ticketRoutes);


/* Server */
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});

app.use(registrosRoutes);