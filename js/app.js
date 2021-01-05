/****** CAMPOS DEL FORMULARIO ******/
const mascotaInput = document.querySelector("#mascota");
const propietarioInput = document.querySelector("#propietario");
const telefonoInput = document.querySelector("#telefono");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const sintomasInput = document.querySelector("#sintomas");

/****** UI ******/
const formulario = document.querySelector("#nueva-cita");
const contenedor = document.querySelector("#citas");

class Citas {
  constructor() {
    this.citas = [];
  }
}

class UI {
  imprimirAlerta(mensaje, tipo) {
    // Crea el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert", "d-block", "col-12");

    // Agrega clase en base al tipo de error
    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    // Mensaje de error
    divMensaje.textContent = mensaje;

    // Agrega al DOM
    document
      .querySelector("#contenido")
      .insertBefore(divMensaje, document.querySelector(".agregar-cita"));

    // Quitar la alerta
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

// Instanciamos las clases creadas de forma global
const ui = new UI();
const administrarCitas = new Citas();

/****** REGISTRAR EVENTOS ******/
eventListeners();
function eventListeners() {
  mascotaInput.addEventListener("input", datosCita);
  propietarioInput.addEventListener("input", datosCita);
  telefonoInput.addEventListener("input", datosCita);
  fechaInput.addEventListener("input", datosCita);
  horaInput.addEventListener("input", datosCita);
  sintomasInput.addEventListener("input", datosCita);

  formulario.addEventListener("submit", nuevaCita);
}

// Creamos un objeto
const citaObj = {
  mascota: "",
  propietario: "",
  telefono: "",
  fecha: "",
  hora: "",
  sintomas: "",
};

// Agrega datos al objeto de cita
function datosCita(e) {
  citaObj[e.target.name] = e.target.value;

  console.log(citaObj);
}

// Valida y agrega una nueva ctia a a clase de Citas
function nuevaCita(e) {
  e.preventDefault();

  // Extraer la información de objeto de cita
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

  // Validar
  if (
    mascota === "" ||
    propietario === "" ||
    telefono === "" ||
    fecha === "" ||
    hora === "" ||
    sintomas === ""
  ) {
    ui.imprimirAlerta("Todos los campos son obligatorios", "error");
    console.log("todos los  campos son obligatorios");

    return; // para que no se ejecute la sguiente línea
  }

  // Crea una nueva cita
}
