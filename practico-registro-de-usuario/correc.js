// esperamos a que toda la pagina html se cargue antes de hacer nada
document.addEventListener('DOMContentLoaded', function () {
    // aqui agarramos el formulario del html por su id
    const form = document.getElementById('registroFormu');
    // agarramos el campo (input) para el nombre
    const nombreInput = document.getElementById('nombre');
    // agarramos el campo para la edad
    const edadInput = document.getElementById('edad');
    // agarramos el campo para el correo
    const correoInput = document.getElementById('correo');
    // agarramos el campo para la contrasena
    const contrasenaInput = document.getElementById('contrasena');

    // agarramos el parrafo donde mostraremos el error del nombre
    const errorNombre = document.getElementById('errorNombre');
    // agarramos el parrafo para el error de la edad
    const errorEdad = document.getElementById('errorEdad');
    // agarramos el parrafo para el error del correo
    const errorCorreo = document.getElementById('errorCorreo');
    // agarramos el parrafo para el error de la contrasena
    const errorContrasena = document.getElementById('errorContrasena');

    // agarramos el parrafo donde mostraremos el mensaje general (de exito o error)
    const mensajeGeneralP = document.getElementById('mensaje');
    // agarramos el div donde mostraremos los datos del usuario si se registra bien
    const datosDiv = document.getElementById('datos');

    // esto se ejecuta cuando alguien intenta enviar el formulario (hace clic en "registrarse")
    form.addEventListener('submit', function (event) {
        // esto evita que la pagina se recargue, que es lo que hacen los formularios normalmente
        event.preventDefault();

        // primero, limpiamos cualquier mensaje de error que haya de antes
        errorNombre.textContent = '';
        errorEdad.textContent = '';
        errorCorreo.textContent = '';
        errorContrasena.textContent = '';
        mensajeGeneralP.textContent = '';
        datosDiv.innerHTML = ''; // tambien limpiamos los datos que se mostraron antes

        // quitamos el borde rojo de los campos por si tenian error antes
        nombreInput.style.borderColor = '';
        edadInput.style.borderColor = '';
        correoInput.style.borderColor = '';
        contrasenaInput.style.borderColor = '';

        // agarramos lo que el usuario escribio en cada campo
        // .trim() quita espacios en blanco al inicio y al final
        const nombre = nombreInput.value.trim();
        const edad = edadInput.value.trim();
        const correo = correoInput.value.trim();
        const contrasena = contrasenaInput.value.trim();

        // esta variable nos dira si todo esta bien para registrar
        let todoEsValido = true;
        let camposConErrores = [];

        // validamos el nombre
        if (nombre === '') { // si el nombre esta vacio
            errorNombre.textContent = 'el nombre es obligatorio.'; // mostramos mensaje de error
            nombreInput.style.borderColor = 'red'; // ponemos borde rojo al campo
            todoEsValido = false; // marcamos que algo salio mal
            camposConErrores.push('nombre'); // anadimos 'nombre' a la lista de errores
        }

        // validamos la edad
        if (edad === '') { // si la edad esta vacia
            errorEdad.textContent = 'la edad es obligatoria.';
            edadInput.style.borderColor = 'red';
            todoEsValido = false;
            camposConErrores.push('edad');
        } else {
            // convertimos la edad (que es texto) a un numero
            const edadNumero = parseInt(edad);
            // isNaN dice si no es un numero. tambien vemos si es menor de 18
            if (isNaN(edadNumero) || edadNumero < 18) {
                errorEdad.textContent = 'debes ser mayor o igual a 18 anos.';
                edadInput.style.borderColor = 'red';
                todoEsValido = false;
                if (!camposConErrores.includes('edad')) camposConErrores.push('edad'); // solo anadimos si no estaba ya
            }
        }

        // validamos el correo
        if (correo === '') { // si el correo esta vacio
            errorCorreo.textContent = 'el correo es obligatorio.';
            correoInput.style.borderColor = 'red';
            todoEsValido = false;
            camposConErrores.push('correo electronico');
        } else if (!correo.includes('@')) { // si el correo no tiene un '@'
            errorCorreo.textContent = 'el correo debe tener un @.';
            correoInput.style.borderColor = 'red';
            todoEsValido = false;
            if (!camposConErrores.includes('correo electronico')) camposConErrores.push('correo electronico');
        }

        // validamos la contrasena
        if (contrasena === '') { // si la contrasena esta vacia
            errorContrasena.textContent = 'la contrasena es obligatoria.';
            contrasenaInput.style.borderColor = 'red';
            todoEsValido = false;
            camposConErrores.push('contrasena');
        } else if (contrasena.length < 6) { // si la contrasena tiene menos de 6 letras/numeros
            errorContrasena.textContent = 'la contrasena debe tener al menos 6 caracteres.';
            contrasenaInput.style.borderColor = 'red';
            todoEsValido = false;
            if (!camposConErrores.includes('contrasena')) camposConErrores.push('contrasena');
        }

        // despues de todas las validaciones, vemos si todo estuvo bien
        if (todoEsValido) {
            // si todo esta bien, mostramos mensaje de exito
            mensajeGeneralP.textContent = `🎉 ¡registro exitoso! bienvenido, ${nombre}.`;
            mensajeGeneralP.style.color = 'green'; // ponemos el texto en verde

            // mostramos los datos que ingreso el usuario (menos la contrasena, por seguridad)
            datosDiv.innerHTML = `<h3>datos registrados:</h3><ul><li><strong>nombre:</strong> ${nombre}</li><li><strong>edad:</strong> ${edad}</li><li><strong>correo:</strong> ${correo}</li></ul>`;

            // limpiamos el formulario para que quede vacio
            form.reset();
        } else {
            // si algo fallo, mostramos un mensaje general con los campos que estan mal
            mensajeGeneralP.textContent = `por favor, corrige los siguientes campos: ${camposConErrores.join(', ')}.`;
            mensajeGeneralP.style.color = 'red'; // ponemos el texto en rojo
        }
    });
});