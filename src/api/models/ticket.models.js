import connection from "../database/db.js";

export const insertTicket = (nombre_usuario, precio_total) => {

    const sql = `INSERT INTO tickets (nombreUsuario, precioTotal, fechaEmision) VALUES (?, ?, CURDATE())`;
    return connection.query(sql, [nombre_usuario, precio_total]);
}

export const insertTicketProduct = (idProducto, idTicket) => {
    const sql = `INSERT INTO productos_tickets (idProducto, idTicket) VALUES (?, ?)`;
    return connection.query(sql, [idProducto, idTicket]);
}