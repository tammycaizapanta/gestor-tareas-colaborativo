// ===== ZONA DANIELA: agregar y completar =====

const formTarea = document.querySelector("#formTarea");
const inputTarea = document.querySelector("#inputTarea");
const listaTareas = document.querySelector("#listaTareas");

function agregarTarea(evento) {
    evento.preventDefault();

    const texto = inputTarea.value.trim();

    if (texto === "") {
        return;
    }

    const tarea = document.createElement("li");
    tarea.textContent = texto;

    listaTareas.appendChild(tarea);

    inputTarea.value = "";
    inputTarea.focus();
}

function marcarCompletada(evento) {
    if (evento.target.tagName === "LI") {
        evento.target.classList.toggle("completada");
    }
}


formTarea.addEventListener("submit", agregarTarea);
listaTareas.addEventListener("click", marcarCompletada);



// ===== ZONA MARIO: eliminar y contador =====