import connection from "../database/db.js";

export const RegistrosModel = {

    // Top 10 productos más vendidos
    getTopProductos() {
        const sql = `
            SELECT 
                p.id,
                p.nombre,
                p.tipo,
                p.precio,
                p.imagen,
                COUNT(pt.idProducto) AS total_vendido
            FROM productos_tickets pt
            JOIN productos p ON p.id = pt.idProducto
            WHERE p.activo = 1
            GROUP BY p.id, p.nombre, p.tipo, p.precio, p.imagen
            ORDER BY total_vendido DESC
            LIMIT 10;
        `;
        return connection.query(sql);
    },

    // Top 10 ventas más caras
    getTopVentas() {
          const sql = `
        SELECT 
            id,
            nombreUsuario AS usuario,
            precioTotal AS total,
            fechaEmision AS fecha
        FROM tickets
        ORDER BY precioTotal DESC
        LIMIT 10;
    `;
        return connection.query(sql);
    },

    // Logs de administradores
    getLogsAdmin() {
        const sql = `
            SELECT * 
            FROM logs_admin
            ORDER BY fecha DESC;
        `;
        return connection.query(sql);
    },

     //Estadísticas
    getTotalVentas() {
        return connection.query(`SELECT COUNT(*) AS precioTotal FROM tickets;`);
    },

    getTotalRecaudado() {
        return connection.query(`SELECT SUM(precioTotal) AS precioTotal FROM tickets;`);
    }
};
