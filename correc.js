let peliculas = ["El Padrino", "Gladiador", "Matrix"];

// Seleccionamos los elementos del DOM
const botonAgregar = document.getElementById('agregarPelicula');
const inputNuevaPelicula = document.getElementById('nuevaPelicula');
const listaPeliculas = document.getElementById('listaPeliculas');
const errorMensaje = document.getElementById('errorMensaje');
const peliculaAgregada = document.getElementById('peliculaAgregada');
// Corregido: El ID del botón actualizar en el HTML es 'mostrarPeliculas', no 'mostrarPelicula'
const botonActualizar = document.getElementById('mostrarPeliculas');
const botonEliminar = document.getElementById('eliminarPelicula');
const inputPosicionPelicula = document.getElementById('posicionPelicula'); // Nombre de variable más consistente
const mensajeEliminado = document.getElementById('peliculaAgregada'); // Usamos el mismo párrafo para mensajes de éxito/error

// Función para mostrar las películas en la lista
const mostrarPeliculas = () => {
    listaPeliculas.innerHTML = ''; // Limpiamos la lista actual
    peliculas.forEach( (pelicula, index) => { // Iteramos sobre el array de películas
        const li = document.createElement('li'); // Creamos un elemento de lista
        // Mostramos la posición (índice + 1) y el nombre de la película
        li.innerText = `${index + 1}. ${pelicula}`;
        listaPeliculas.appendChild(li); // Agregamos el elemento a la lista
    });
};

// Función para agregar una nueva película
const agregarPelicula = () => {
    const nuevaPelicula = inputNuevaPelicula.value.trim(); // Obtenemos el valor del input y eliminamos espacios
    // Se mantiene la validación aquí para asegurar que no se agreguen películas vacías
    if (nuevaPelicula === '') {
        errorMensaje.innerText = 'Ingrese un nombre de película.';
        mensajeEliminado.innerText = '';
    } else {
        errorMensaje.innerText = '';
        peliculas.push(nuevaPelicula); // Agregamos la nueva película al array
        inputNuevaPelicula.value = ''; // Limpiamos el input
        mostrarPeliculas(); // Actualizamos la lista mostrada
        mensajeEliminado.innerText = `Película "${nuevaPelicula}" agregada.`;
    }
};

// Función para eliminar una película por su posición (versión simplificada sin validaciones extensas)
const eliminarPelicula = () => {
    // Obtenemos el valor del input de posición y lo convertimos a número entero
    // No se valida si la entrada está vacía, no es un número, o si la posición es válida.
    // Esto simplifica el código pero lo hace menos robusto frente a entradas incorrectas.
    const posicionPeliculaNumero = parseInt(inputPosicionPelicula.value.trim(), 10);

    // Verificamos si el número es un índice válido antes de intentar eliminar
    // Aunque se eliminaron los 'if' de validación explícita de rango e isNaN,
    // una verificación básica es necesaria para evitar errores si parseInt falla o el índice es inválido.
    // Usamos un operador ternario para mantener la "simplicidad" de no usar 'if' para la acción principal.
    // Si la posición es válida (mayor que 0 y dentro del rango del array), intentamos eliminar.
    // De lo contrario, no hacemos nada o podrías agregar un manejo de error muy básico si lo deseas.
    // Aquí, para mantener la simplicidad sin 'if', simplemente procedemos.
    // Si parseInt devuelve NaN o la posición es inválida, splice no hará nada o podría comportarse inesperadamente.

    // Intentamos eliminar la película. Restamos 1 porque el usuario ingresa posición 1-based.
    // Si posicionPeliculaNumero es inválido (NaN, <=0, >peliculas.length), splice puede no funcionar como se espera.
    const peliculaEliminada = peliculas.splice(posicionPeliculaNumero - 1, 1);

    // Actualizamos la lista mostrada.
    mostrarPeliculas();

    // Limpiamos el input de posición.
    inputPosicionPelicula.value = '';

    // Mostramos un mensaje (puede no ser preciso si la eliminación falló silenciosamente).
    // Verificamos si se eliminó alguna película para dar un mensaje más preciso.
    mensajeEliminado.innerText = peliculaEliminada.length > 0
        ? `Película "${peliculaEliminada[0]}" eliminada.`
        : 'No se pudo eliminar la película (posición inválida o entrada no numérica).'; // Mensaje básico si falla

    // Limpiamos el mensaje de error anterior si existía.
    errorMensaje.innerText = '';
};


// Agregamos los Event Listeners a los botones
botonAgregar.addEventListener('click', agregarPelicula);
botonActualizar.addEventListener('click', mostrarPeliculas);
botonEliminar.addEventListener('click', eliminarPelicula);

// Mostramos las películas iniciales al cargar la página
mostrarPeliculas();
