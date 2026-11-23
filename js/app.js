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


// --- Contador de tareas pendientes ---
const marioContadorElemento = document.getElementById("contador");

const actualizarContadorMario = () => {
    if (!marioListaTareas || !marioContadorElemento) return;

    const todasLasTareas = marioListaTareas.querySelectorAll("li");
    let pendientes = 0;

    todasLasTareas.forEach((tarea) => {
        if (!tarea.classList.contains("completada")) {
            pendientes++;
        }
    });

    marioContadorElemento.textContent = pendientes;
};

if (marioListaTareas) {
    const observadorTareasMario = new MutationObserver(() => {
        actualizarContadorMario();
    });

    observadorTareasMario.observe(marioListaTareas, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class"]
    });
}

actualizarContadorMario();