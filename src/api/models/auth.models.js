import connection from "../database/db.js";

const getUser = (correo, password) => {
    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";
    return connection.query(sql, [correo, password]);
}

export const AuthModel = {
    getUser
};