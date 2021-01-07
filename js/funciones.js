import Citas from "./clases/Citas.js";
import UI from "./clases/UI.js";

import {
  mascotaInput,
  propietarioInput,
  telefonoInput,
  fechaInput,
  horaInput,
  sintomasInput,
  formulario,
} from "./selectores.js";

// Instanciamos las clases creadas
const ui = new UI();
const administrarCitas = new Citas();

let editando;

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
export function datosCita(e) {
  citaObj[e.target.name] = e.target.value;
}

// Valida y agrega una nueva ctia a a clase de Citas
export function nuevaCita(e) {
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

  if (editando) {
    ui.imprimirAlerta("Editado correctamente");

    // Pasar el objeto de la cita a edición
    administrarCitas.editarCita({ ...citaObj });

    // Regresa el texto del botón a su estado original
    formulario.querySelector("button[type='submit']").textContent =
      "Crear Cita";

    // Quitar modo edición
    editando = false;
  } else {
    // Generar un ID único
    citaObj.id = Date.now();

    // Crea una nueva cita
    administrarCitas.agregarCita({ ...citaObj });

    // Mensaje de agregado correctamente
    ui.imprimirAlerta("Se agregó correctamente");
  }

  // Reiniciar el objeto para la validación
  reiniciarObjeto();

  // Reinicia el formulario
  formulario.reset();

  // Mostar el Html de las citas
  ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
  citaObj.mascota = "";
  citaObj.propietario = "";
  citaObj.telefono = "";
  citaObj.fecha = "";
  citaObj.hora = "";
  citaObj.sintomas = "";
}

export function eliminarCita(id) {
  // Eliminar cita
  administrarCitas.eliminarCita(id);

  // Muestra mensaje
  ui.imprimirAlerta("Cita eliminada exitosamente");

  // Refresca las citas
  ui.imprimirCitas(administrarCitas);
}

// Carga los datos y el modo edición
export function cargarEdicion(cita) {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  // Llenar el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  // Cambiar el texto del botón
  formulario.querySelector("button[type='submit']").textContent =
    "Guardar Cambios";

  editando = true;
}
