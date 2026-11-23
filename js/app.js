// ===== ZONA DANIELA: agregar y completar =====


// ===== ZONA MARIO: eliminar y contador =====
// --- Eliminar tareas ---
const marioListaTareas = document.getElementById("listaTareas");

const manejarEliminarTareaMario = (event) => {
    const botonEliminar = event.target.closest(".btn-eliminar");
    if (!botonEliminar) return;

    const tareaElemento = botonEliminar.closest("li");
    if (tareaElemento) {
        tareaElemento.remove();
        if (typeof actualizarContadorMario === "function") {
            actualizarContadorMario();
        }
    }
};

if (marioListaTareas) {
    marioListaTareas.addEventListener("click", manejarEliminarTareaMario);
}