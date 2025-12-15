import db from "../database/db.js";

export async function insertEncuesta(encuesta) {
    const sql = `
        INSERT INTO encuestas (email, opinion, puntuacion, imagen, fecha)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
        encuesta.email,
        encuesta.opinion,
        encuesta.puntuacion,
        encuesta.imagen,
        encuesta.fecha
    ];
    await db.query(sql, params);
}

export async function getAllEncuestas() {
    const sql = `SELECT * FROM encuestas ORDER BY fecha DESC`;
    const [rows] = await db.query(sql);
    return rows;
}