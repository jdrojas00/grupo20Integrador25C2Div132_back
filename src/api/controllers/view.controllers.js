import ProductModels from "../models/product.models.js";

export const productsView = async (req, res) => {

    try {
        const [rows] = await ProductModels.selectAllProducts();

        res.render("index", {
            title: "Indice",
            about:"Lista de Productos",
            products: rows
        });

    } catch (error) {
        console.error(error);
    }
}