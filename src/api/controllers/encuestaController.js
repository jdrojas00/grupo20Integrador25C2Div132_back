import { insertEncuesta, getAllEncuestas } from "../models/encuesta.model.js";
import XLSX from "xlsx";
import fs from "fs";
import { join, __dirname } from "../utils/index.js";

// --------------------------------------
// GUARDAR ENCUESTA
// --------------------------------------
export async function guardarEncuesta(req, res) {
    try {
        const { email, opinion, puntuacion } = req.body;

        console.log('guardarEncuesta - body:', req.body);
        console.log('guardarEncuesta - file:', req.file);

        if (!email || !opinion || !puntuacion) {
            return res.status(400).json({ msg: "Datos incompletos" });
        }

        const imagen = req.file ? `encuestas/${req.file.filename}` : null;

        const result = await insertEncuesta({
            email,
            opinion,
            puntuacion,
            imagen,
            fecha: new Date()
        });

        console.log('insertEncuesta result:', result);

        return res.status(201).json({ msg: "Encuesta guardada", result });

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
        console.log('descargarExcel - request received');
        const encuestas = await getAllEncuestas();

        console.log('descargarExcel - rows:', encuestas.length);

        const worksheet = XLSX.utils.json_to_sheet(encuestas);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Encuestas");

        const tmpDir = join(__dirname, "tmp");
        try {
            fs.mkdirSync(tmpDir, { recursive: true });
        } catch (err) {
            console.error('Could not create tmp dir:', err);
        }

        const filePath = join(tmpDir, "encuestas.xlsx");
        XLSX.writeFile(workbook, filePath);

        console.log('descargarExcel - file written to', filePath);

        return res.download(filePath, "encuestas.xlsx", (err) => {
            if (err) {
                console.error('res.download error:', err);
                if (!res.headersSent) return res.status(500).json({ msg: 'Error al descargar archivo' });
            } else {
                console.log('descargarExcel - download sent');
                try {
                    fs.unlinkSync(filePath);
                    console.log('descargarExcel - temp file deleted');
                } catch (unlinkErr) {
                    console.error('Error deleting temp file:', unlinkErr);
                }
            }
        });

    } catch (error) {
        console.error("Error generando Excel:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
}