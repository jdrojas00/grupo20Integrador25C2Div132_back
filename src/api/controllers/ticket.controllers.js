import { insertTicket, insertTicketProduct } from "../models/ticket.models.js";

export const createTicket = async (req, res) => {
    const { producto_id, nombre_usuario, precio_total } = req.body;

    if (!Array.isArray(producto_id) || producto_id.length === 0) {
        return res.status(400).json({ error: "producto_id debe ser un array con IDs de productos" });
    }
    if (!nombre_usuario || !precio_total) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    try {
        const [ticketResult] = await insertTicket(nombre_usuario, precio_total);
        const ticketId = ticketResult.insertId;

        for (const idProd of producto_id) {
            await insertTicketProduct(idProd, ticketId);
        }

        res.status(201).json({
            mensaje: "Compra registrada correctamente",
            ticketId
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error al registrar la compra" });
    }
};