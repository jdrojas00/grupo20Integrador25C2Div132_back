import connection from "../database/db.js";

const selectAllProducts = () => {
    const sql = "SELECT * FROM productos";
    return connection.query(sql);
}

const selectProductById = (id) => {
    let sql = "SELECT * FROM productos WHERE productos.id = ?";
    return connection.query(sql, [id]);
}

//Custom - Obtener productos por categoria
const selectProductbyType = (category) => {
    let sql = "SELECT * FROM productos WHERE productos.tipo = ?";
    return connection.query(sql, [category]);
}

const insertProduct = (name, category, price, image) => {
    let sql = "INSERT INTO productos (nombre, tipo, precio, imagen) VALUES (?, ?, ?, ?)";
    return connection.query(sql, [name, category, price, image]);
}

const updateProduct = (name, image, category, price, active, id) => {
    let sql = `
        UPDATE productos
        SET name = ?, image = ?, category = ?, price = ?, active = ?
        WHERE id = ?
    `;

    return connection.query(sql, [name, image, category, price, active, id]);
}

const deleteProduct = (id) => {
    //let sql = `DELETE FROM productos WHERE id = ?`;

    // Opcion 2: Baja logica
    let sql2 = `UPDATE productos set active = 0 WHERE id = ?`;

    return connection.query(sql2, [id]);
}

export default {
    selectAllProducts,
    selectProductById,
    selectProductbyType,
    insertProduct,
    updateProduct,
    deleteProduct
}