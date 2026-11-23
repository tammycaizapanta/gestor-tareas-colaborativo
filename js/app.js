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
// ===== ZONA MARIO: eliminar y contador =====
const marioListaTareas = document.getElementById("listaTareas");
const marioContadorElemento = document.getElementById("contador");

const sincronizarEstiloTareaMario = (tareaElemento) => {
    if (!tareaElemento || tareaElemento.tagName !== "LI") return;

    // 1. Asegurar botón .btn-eliminar sin tachado ni estilos heredados raros
    let botonEliminar = tareaElemento.querySelector(".btn-eliminar");
    if (!botonEliminar) {
        botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "btn-eliminar";
        botonEliminar.textContent = "Eliminar";
        tareaElemento.appendChild(botonEliminar);
    }

    // 2. Si hay nodos de texto directos dentro del LI (puestos por agregarTarea),
    // envolverlos en un span para controlar el tachado sin afectar al botón
    let textoSpan = tareaElemento.querySelector(".mario-texto-tarea");
    if (!textoSpan) {
        textoSpan = document.createElement("span");
        textoSpan.className = "mario-texto-tarea";

        const nodosTexto = [];
        tareaElemento.childNodes.forEach((nodo) => {
            if (nodo.nodeType === Node.TEXT_NODE && nodo.textContent.trim() !== "") {
                nodosTexto.push(nodo);
            }
        });

        if (nodosTexto.length > 0) {
            nodosTexto.forEach((nodo) => {
                textoSpan.appendChild(document.createTextNode(nodo.textContent));
                nodo.remove();
            });
            tareaElemento.insertBefore(textoSpan, botonEliminar);
        }
    }

    // 3. Aplicar o quitar tachado solo al texto si el LI tiene .completada
    const estaCompletada = tareaElemento.classList.contains("completada");
    if (textoSpan) {
        textoSpan.style.textDecoration = estaCompletada ? "line-through" : "none";
        textoSpan.style.color = estaCompletada ? "var(--texto-suave)" : "";
    }

    // Garantizar que el botón nunca se tache
    botonEliminar.style.textDecoration = "none";
    botonEliminar.style.textDecorationLine = "none";
    botonEliminar.style.color = "var(--texto)";
    botonEliminar.style.background = "var(--fondo)";
    botonEliminar.style.display = "inline-block";
};

const actualizarContadorMario = () => {
    if (!marioListaTareas || !marioContadorElemento) return;

    const todasLasTareas = marioListaTareas.querySelectorAll("li");
    let pendientes = 0;

    todasLasTareas.forEach((tarea) => {
        sincronizarEstiloTareaMario(tarea);
        if (!tarea.classList.contains("completada")) {
            pendientes++;
        }
    });

    marioContadorElemento.textContent = String(pendientes);
};

const manejarEliminarTareaMario = (event) => {
    const botonEliminar = event.target.closest(".btn-eliminar");
    if (!botonEliminar) return;

    const tareaElemento = botonEliminar.closest("li");
    if (tareaElemento) {
        tareaElemento.remove();
        actualizarContadorMario();
    }
};

if (marioListaTareas) {
    marioListaTareas.querySelectorAll("li").forEach(sincronizarEstiloTareaMario);
    marioListaTareas.addEventListener("click", manejarEliminarTareaMario);

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