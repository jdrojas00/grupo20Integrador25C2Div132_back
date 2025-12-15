import { insertEncuesta, getAllEncuestas } from "../models/encuesta.model.js";
import XLSX from "xlsx";

// --------------------------------------
// GUARDAR ENCUESTA
// --------------------------------------
export async function guardarEncuesta(req, res) {
    try {
        const { email, opinion, puntuacion } = req.body;

        if (!email || !opinion || !puntuacion) {
            return res.status(400).json({ msg: "Datos incompletos" });
        }

        const imagen = req.file ? `encuestas/${req.file.filename}` : null;

        await insertEncuesta({
            email,
            opinion,
            puntuacion,
            imagen,
            fecha: new Date()
        });

        return res.status(201).json({ msg: "Encuesta guardada" });

    } catch (error) {
        console.error("Error guardando encuesta:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}


// --------------------------------------
// DESCARGAR EXCEL
// --------------------------------------
export async function descargarExcel(req, res) {
    try {
        const encuestas = await getAllEncuestas();

        const worksheet = XLSX.utils.json_to_sheet(encuestas);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Encuestas");

        const filePath = "tmp/encuestas.xlsx";
        XLSX.writeFile(workbook, filePath);

        return res.download(filePath, "encuestas.xlsx");

    } catch (error) {
        console.error("Error generando Excel:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}