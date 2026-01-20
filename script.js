/* Referencias al documento del DOM */

const tareaEntrada = document.getElementById ('tareaEntrada');
const botonAgregar = document.getElementById (botonAgregar);
const contenedorTareas = document.getElementById (contenedorTareas);

/* Función para crear el elemento tarea (función creadora de Nodo Tarea) */

function crearElementoTarea (){
  // Crear elemento de la tarea
  const tareaContenedor = document.createElement('div');
  const tareaTexto = document.createElement('p');
  const iconosContenedor = document.createElement('div');
  const iconoCompletada = document.createElement('i');
  const iconoEliminar = document.createElement('i');

  // Creamos la estructura de la tarea
  iconosContenedor.append(iconoCompletada, iconoEliminar);
  tareaContenedor.append(tareaTexto, iconosContenedor);

  // Agregamos las clases a los elementos de la tarea
  tareaContenedor.classList.add('tarea');
  tareaTexto.classList.add('tarea-texto');
  iconosContenedor.classList.add('tarea-iconos');
  iconoCompletada.classList.add('bi', 'bi-dash-circle');
  iconoEliminar.classList.add('bi', 'bi-trash2');


  // Agregamos el texto de usuario
  tareaTexto.innerText = tareaEntrada.value;

  // Retomammos la estructura de la tarea 
  return tareaContenedor; 
}

/* Escuchador */
botonAgregar.addEventListener('click',crearElementoTarea);

// Funcion para agregar El elemento tarea

function agregarTareaa() {
  // Traemos el elemnto retornado por la funcion crearElementoTarea
  const elementoTarea = crearElementoTarea();
  contenedorTareas.append(elementoTarea);

  // Reiniciar el valor del input
  tareaEntrada.value = '';
}
