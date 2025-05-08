document.addEventListener('DOMContentLoaded', function() {
    // inputs 
    const form = document.getElementById('registro_formu');
    const nombre_input = document.getElementById('nombre');
    const edad_input = document.getElementById('edad');
    const correo_input = document.getElementById('correo');
    const contrasena_input = document.getElementById('contrasena');
    
    // errores
    const error_nombre_mostrar = document.getElementById('error_nombre');
    const error_edad_mostrar = document.getElementById('error_edad');
    const error_correo_mostrar = document.getElementById('error_correo');
    const error_contrasena_mostrar = document.getElementById('error_contrasena');
    
    // mensajes
    const mensaje_final_mostrar = document.getElementById('mensaje');
    const datos_mostrados_div = document.getElementById('datos');


    form.addEventListener('submit', function(e) {
        e.preventDefault();// evita que la pagina se recargue 
        console.log("--- Validación Iniciada (Estilo Individual - Sin Estilos CSS) ---");

        // errores sin nada predefinido
        // textContent es una propiedad que permite ver o cambiar todo el texto que hay ignorando las etiquetas de html
        error_nombre_mostrar.textContent = '';
        error_edad_mostrar.textContent = '';
        error_correo_mostrar.textContent = '';
        error_contrasena_mostrar.textContent = '';
        mensaje_final_mostrar.textContent = '';
        datos_mostrados_div.innerHTML = '';
        
        // quitar el borde rojo si tenian algun error
        nombre_input.style.borderColor = '';
        edad_input.style.borderColor = '';
        correo_input.style.borderColor = '';
        contrasena_input.style.borderColor = '';
        
        // variables
        // .trim() quita espacios en blanco al inicio y al final
        const nombre = nombre_input.value.trim();
        const edad = edad_input.value.trim();
        const correo = correo_input.value.trim();
        const contrasena = contrasena_input.value.trim();

        // si es valido true
        let valido = true;

        // si los nombres de los campos estan mal, osea, si un campo no es valido entonces se aniadira el nombre de ese campo a esta lista para poder mostrar en el mensaje cuales campos tienen errores
        let inputs_con_errores = [];

        //validacion de nombre
        if (nombre === '') { // si el nombre esta vacio
            error_nombre_mostrar.textContent = 'El nombre completo es obligatorio.'; // salta error
            nombre_input.style.borderColor = 'red'; // pone borde rojo
            valido = false; // marcamos nombre = flase
            inputs_con_errores.push('nombre'); // anadimos el 'nombre' a la lista
        }

        //validacion de edad
        if (edad === '') {
            error_edad_mostrar.textContent = 'La edad es obligatoria.';
            edad_input.style.borderColor = 'red';
            valido = false;
            inputs_con_errores.push('edad');    
        } else {
            // convertimos la edad(string) a numero int
            const num_edad = parseInt(edad);
            if (isNaN(num_edad) || num_edad < 18) {
                error_edad_mostrar.textContent = 'Debes ser mayor o igual a 18 años.';
                edad_input.style.borderColor = 'red';
                valido = false;
                if (!inputs_con_errores.includes('edad')) inputs_con_errores.push('edad');//el metodo includes se usa en array para ver si un elemento ya existe dentro de ese array
                //logicaa si el array input_con_errores no contiene edad sera false, la edad no esta en la lista
            }
        }
        //validacion de correo
        if (correo === '') {
            error_correo_mostrar.textContent = 'El correo electrónico es obligatorio.';
            correo_input.style.borderColor = 'red';
            valido = false;
            inputs_con_errores.push('correo electronico');
        } else if (!correo.includes('@')) { //si el correo no tiene un arroba entonces
                error_correo_mostrar.textContent = 'El formato del correo no es válido (debe contener @).';
                correo_input.style.borderColor = 'red';
                valido = false;
                if (!inputs_con_errores.includes('correo electronico')) inputs_con_errores.push('correo electronico');
            }

        //validacion de contrasena
        if (contrasena === '') {
            error_contrasena_mostrar.textContent = 'La contraseña es obligatoria.';
            contrasena_input.style.borderColor = 'red';
            valido = false;
            inputs_con_errores.push('contrasena');
        } else if (contrasena.length < 6) {
                error_contrasena_mostrar.textContent = 'La contraseña debe tener al menos 6 caracteres.';
                contrasena_input.style.borderColor = 'red';
                valido = false;
                if (!inputs_con_errores.includes('contrasena')) inputs_con_errores.push('contrasena');
            }
            
            // verificacion valido
            if (valido) {
            mensaje_final_mostrar.textContent = `🎉 ¡Registro exitoso! Bienvenido, ${nombre}.`;
             datos_mostrados_div.innerHTML = `
                <h3>Datos Registrados:</h3>
                <ul>
                    <li>Nombre: ${nombre}</li>
                    <li>Edad: ${edad}</li>
                    <li>Correo: ${correo}</li>
                </ul>`;

            form.reset(); 
        } else {
            mensaje_final_mostrar.textContent = `Por favor, corrige los siguientes campos: ${inputs_con_errores.join(', ')}.`;
            mensaje_final_mostrar.style.color = 'red';
        }
    });
});
