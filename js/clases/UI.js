import { eliminarCita, cargarEdicion } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

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

  imprimirCitas({ citas }) {
    this.limpiarHtml();

    citas.forEach((cita) => {
      const {
        mascota,
        propietario,
        telefono,
        fecha,
        hora,
        sintomas,
        id,
      } = cita;

      const divCita = document.createElement("div");
      divCita.classList.add("cita", "p-3");
      divCita.dataset.id = id;

      // Scripting de los elementos de la cita
      const mascotaParrafo = document.createElement("h2");
      mascotaParrafo.classList.add("card-title", "font-weight-bolder");
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement("p");
      propietarioParrafo.innerHTML = `
        <span clas="font-weight-bolder">Propietario: </span>${propietario}
      `;

      const telefonoParrafo = document.createElement("p");
      telefonoParrafo.innerHTML = `
        <span clas="font-weight-bolder">Teléfono: </span>${telefono}
      `;

      const fechaParrafo = document.createElement("p");
      fechaParrafo.innerHTML = `
        <span clas="font-weight-bolder">Fecha: </span>${fecha}
      `;

      const horaParrafo = document.createElement("p");
      horaParrafo.innerHTML = `
        <span clas="font-weight-bolder">Hora: </span>${hora}
      `;

      const sintomasParrafo = document.createElement("p");
      sintomasParrafo.innerHTML = `
        <span clas="font-weight-bolder">Síntomas: </span>${sintomas}
      `;

      // Botón para eliminar una cita
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "btn",
        "btn-danger",
        "mr-2",
        "d-flex",
        "align-items-center"
      );
      btnEliminar.innerHTML =
        'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';

      btnEliminar.onclick = () => eliminarCita(id);

      // Botón para editar una cita
      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "btn",
        "btn-info",
        "d-flex",
        "align-items-center"
      );
      btnEditar.innerHTML =
        'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

      btnEditar.onclick = () => cargarEdicion(cita);

      // Agregar los párrafos al divCita
      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);

      // Agregar las citas al Html
      contenedorCitas.appendChild(divCita);
    });
  }

  limpiarHtml() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}

export default UI;
