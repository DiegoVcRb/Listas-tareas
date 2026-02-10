/*  Referencias al documento DOM  */

const tareaEntrada = document.getElementById("tareaEntrada");
const botonAgregar = document.getElementById("botonAgregar");
const contenedorTareas = document.getElementById("contenedorTareas");
const mensaje = document.getElementById("mensaje");
const contadorTotales = document.getElementById("contadorTotales");
const contadorTerminadas = document.getElementById("contadorTerminadas");
const botonOcultar = document.getElementById('botonOcultar');
const botonEliminar = document.getElementById('botonEliminar')

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


/* Función Ocultar y Mostrar las tareas completadas */

let tareasOcultas = false;

function toggleOcultarCompletadas() {
    // Contamos los elementos con la clase tarea-completada
    const tareasCompletadas = document.querySelectorAll('.tarea-completada')

    tareasCompletadas.forEach( (tarea) => {
        // Codigo que se ejucuta por cada una de  las tareas
        if(tareasOcultas) {
            // Asiganar un display flex. hacerlas visibles.
            tarea.style.display = 'flex';
        } else {
        // Asiganar un display nonde. hace que se oculten
            tarea.style.display = 'none';
        }

    } );
    // Cambiamos el estado de la variable tareas ocultas
    tareasOcultas = !tareasOcultas;

    // Cambiamos el texto del boton

    if(tareasOcultas) {
        botonOcultar.textContent = 'Mostrar Completadas'
    }else{
        botonOcultar.textContent = 'Ocultar Completadas'
    }

}

/* toggleOcultarCompletadas() */
/* Funcion Eliminar Todas las Traeas Completadas */

function elieminarCompletadas() {
    // Contar las tareas con la clase tarea-completada
    const tareasCompletadas = document.querySelectorAll('.tarea-completada');

    // Eliminar cada tarea comlletada
    tareasCompletadas.forEach( (tarea) => { tarea.remove() } )

    // Actualizar los contadores
    actualizarContadores();
}


/* Escuchadores de Botones*/

botonAgregar.addEventListener("click" , agregarTarea);
botonOcultar.addEventListener("click" , toggleOcultarCompletadas);
botonEliminar.addEventListener("click" , elieminarCompletadas)


/* Función Agregar el Elemento Tarea */

    function agregarTarea(){

        //Generar la constante para evaluar si hay texto o no
        const texto = tareaEntrada.value.trim();

        // Evaluar constante de texto
        if(texto) {
            
            // Traemos ele elemento retornado por la funcion crearElementoTarea
            const elementoTarea = crearElementoTarea();
            contenedorTareas.append(elementoTarea);

            // Reiniciar el value del input
            tareaEntrada.value = '';

            // Mostrar el menaje de tarea creada satisfactoriamente 
            mensaje.textContent = 'Tarea creada correctamente! 👍';

            // Actualizamos los contadores
            actualizarContadores();

        } else {
           // Ejecutas esto otro
           mensaje.textContent = 'No escribiste nada pa! 💢'; 
            
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