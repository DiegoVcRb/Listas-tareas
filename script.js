/*  Referencias al documento DOM  */

const tareaEntrada = document.getElementById("tareaEntrada");
const botonAgregar = document.getElementById("botonAgregar");
const contenedorTareas = document.getElementById("contenedorTareas");
const mensaje = document.getElementById("mensaje");
const contadorTotales = document.getElementById("contadorTotales");
const contadorTerminadas = document.getElementById("contadorTerminadas");

/* Función para crear el elemnto tarea (Función creadora del Nodo Tarea) */

function crearElementoTarea(){

    // Crear los elemntos html de la tarea
    const tareaContenedor = document.createElement('div');
    const tareaTexto = document.createElement('p');
    const iconoContenedor = document.createElement('div');
    const iconoCompletada = document.createElement('i');
    const iconoEliminar = document.createElement('i');

    /* Creamos la estructura de la tarea */

    iconoContenedor.append(iconoCompletada , iconoEliminar);
    tareaContenedor.append(tareaTexto , iconoContenedor);

    /* Agregamos las clases a los contenedores de la tarea */

    tareaContenedor.classList.add('tarea');
    tareaTexto.classList.add('tarea-texto');
    iconoContenedor.classList.add('tarea-iconos');
    iconoCompletada.classList.add('bis' , 'bi-check-circle');
    iconoEliminar.classList.add('bis' , 'bi-trash2');

    /* Agregamos el texto del usuario */
    tareaTexto.innerText = tareaEntrada.value;

    /* Escuchadores de los Iconos */
    iconoCompletada.addEventListener('click', (e) => {

        const tareaElemento = e.target.parentNode.parentNode
        const esCompletada = tareaElemento.classList.contains('tarea-completada')

        tareaElemento.classList.toggle('tarea-completada');
        if(esCompletada){
            e.target.classList.remove('bi-dash-circle')
            e.target.classList.add('bi-check-circle');
        }else{
            e.target.classList.add('bi-dash-circle');
            e.target.classList.remove('bi-check-circle')
        }

        //  Actualizamos los contadores
        actualizarContadores();

    })

    iconoEliminar.addEventListener('click', (e) => {
        const tareaElemento = e.target.parentNode.parentNode;
        tareaElemento.remove();
        //  Actualizamos los contadores
        actualizarContadores();
    })

    /* Retornamos la estructura de la tarea */
    return tareaContenedor;

}

/*  Función Actualizar Contadores  */

function actualizarContadores(){
    // Contamos los elementos con la clase tarea
    const tareasTotales = document.querySelectorAll('.tarea');
    const tareasCompletadas = document.querySelectorAll('.tarea-completada');

    // Actualizamos los contadores en el DOM
   contadorTotales.textContent = tareasTotales.length;
   contadorTerminadas.textContent = tareasCompletadas.length;
}

/* Escuchador */

botonAgregar.addEventListener("click" , agregarTarea);

/* Función Agregar el Elemento Tarea */

    function agregarTarea(){

        //Consante para evaluar si hay texto o no.
        const texto = tareaEntrada.value.trim();

        if(!texto) {
            mensaje.textContent = 'Agrega texto! 💢';
        }else{
             // Traemos el elemento retornado por la función crearElementoTarea
             const elementoTarea = crearElementoTarea();
             contenedorTareas.append(elementoTarea);

             // Reiniciar el value del input
             tareaEntrada.value = ' ';

             mensaje.textContent = 'Tarea creada correctamente! 👍';

             //  Actualizamos los contadores
             actualizarContadores();
        }

    }

/*  Hacemos que al presionar enter en el input se agregue la tarea */

document.addEventListener('keydown', (e) => {
    if(e.key == "Enter") {
        agregarTarea();
    }
})

tareaEntrada.addEventListener('input', () => {
    if(tareaEntrada.value.trim() === ""){
        mensaje.textContent = 'Escribe tu próxima tarea c:'
    }else{
        mensaje.textContent = 'Presiona enter! c:'
    }
})