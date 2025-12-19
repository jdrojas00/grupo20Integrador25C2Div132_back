// Mostrar / ocultar bloques al hacer clic
document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.target;
        const el = document.getElementById(target);

        if (el.style.display === "none") {
            el.style.display = "block";
            btn.innerText = "Ocultar";
        } else {
            el.style.display = "none";
            btn.innerText = "Mostrar";
        }
    });
});

// ---------------------------
// DESCARGAR TABLA EN EXCEL
// ---------------------------
document.querySelectorAll(".download-excel").forEach(btn => {
    btn.addEventListener("click", () => {
        const tableId = btn.dataset.table;
        exportTableToExcel(tableId, "registros.xlsx");
    });
});

function exportTableToExcel(tableID, filename = '') {
    const table = document.getElementById(tableID);
    if (!table) return alert("Tabla no encontrada");

    let dataType = 'application/vnd.ms-excel';
    let tableHTML = table.outerHTML.replace(/ /g, '%20');

    filename = filename ? filename : 'excel_data.xls';

    let downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    downloadLink.download = filename;
    downloadLink.click();
    downloadLink.remove();
}

// ---------------------------
// DESCARGAR EXCEL DESDE API
// ---------------------------
function descargarEncuestasExcel() {
    fetch('/api/encuestas/excel')
        .then(resp => {
            if (!resp.ok) throw new Error('Error descargando Excel');
            return resp.blob();
        })
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'encuestas.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al descargar el Excel de encuestas');
        });
}