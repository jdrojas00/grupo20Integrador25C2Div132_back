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
    try {
        const [result] = await db.query(sql, params);
        return result;
    } catch (error) {
        console.error('DB error insertEncuesta:', error);
        throw error;
    }
}

export async function getAllEncuestas() {
    const sql = `SELECT * FROM encuestas ORDER BY fecha DESC`;
    try {
        const [rows] = await db.query(sql);
        console.log('getAllEncuestas - rows fetched:', rows.length);
        return rows;
    } catch (error) {
        console.error('DB error getAllEncuestas:', error);
        throw error;
    }
}