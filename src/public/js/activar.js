const botones = document.querySelectorAll(".btn-actualizar");

botones.forEach(boton => {
    boton.addEventListener("click", async () => {
        let idProducto = boton.dataset.id;
        let confirmacion = confirm("Querés activar este producto?");

        if (!confirmacion) {
            alert("Activacion cancelada");

        } else {
            await activarProducto(idProducto);
        }
    });
});

async function activarProducto(idProducto) {
    try {
            let response = await fetch(`http://localhost:3000/api/products/${idProducto}`);
            let resultado = await response.json();

            let producto = resultado.payload[0];

            let dataActualizar = {
                id: producto.id,
                name: producto.nombre,
                image: producto.imagen,
                category: producto.tipo,
                price: producto.precio,
                active: 1
            };

            let updateResponse = await fetch("http://localhost:3000/api/products", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataActualizar)
            });

            let result = await updateResponse.json();

            if (updateResponse.ok) {
                alert(result.message);
                console.log(result.message);
                location.reload();
            } else {
                alert("Error al activar el producto" + result.message);
                console.error(result.message);
            }

        } catch (error) {
            console.error("Error al activar producto:", error);
            alert("Error al activar el producto");
        }

}