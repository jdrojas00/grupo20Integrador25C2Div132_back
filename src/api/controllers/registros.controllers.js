import { RegistrosModel } from "../models/registros.models.js";

export const mostrarRegistros = async (req, res) => {
    try {

        const [topProductos] = await RegistrosModel.getTopProductos();
        const [topVentas] = await RegistrosModel.getTopVentas();
        const [logsAdmin] = await RegistrosModel.getLogsAdmin();
        const [[totalVentas]] = await RegistrosModel.getTotalVentas();
        const [[totalRecaudado]] = await RegistrosModel.getTotalRecaudado();

        return res.render("registros", {
            title: "Registros",
            about: "Panel de administración",
            topProductos,
            topVentas,
            logsAdmin,
            totalVentas,
            totalRecaudado
        });

    } catch (error) {
        console.log("Error al cargar registros:", error);
        return res.status(500).send("Error interno del servidor");
    }
};
