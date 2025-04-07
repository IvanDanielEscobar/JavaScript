let cuenta;

while (true) {
    const cuentaStr = prompt("Ingrese el total de la cuenta:");
    cuenta = parseFloat(cuentaStr);
    if (!isNaN(cuenta) && cuenta > 0) {
        break;
    } else {
        alert("Por favor, ingrese un valor válido para la cuenta.");
      }
}

const dejarPropina = confirm("¿Desea dejar propina?");
let propinaPorcentaje = 0;

if (dejarPropina) {
    let servicio;
    while (true) {
        servicio = prompt("¿Cómo estuvo el servicio? (malo, bueno, excelente)").toLowerCase();
        //la estructura switch se usa como alternativa para una larga cadena de sentencias if-else
        if (servicio === "malo" || servicio === "bueno" || servicio === "excelente") {
            switch (servicio) {
                case "malo": //los bloques case van seguido de un valor especifico y ":" esta se compara con el resultado de la expresion en este caso es el servicio
                    propinaPorcentaje = 0.10;
                    break; //esta sentencia termina con la ejecucion del bloque switch
                case "bueno":
                    propinaPorcentaje = 0.15;
                    break;
                case "excelente":
                    propinaPorcentaje = 0.20;
                    break;
                /*
                    default:// esta sentencia es opcional, este se ejecuta en caso de que ninguno de los 'case' funcionen
                    alert("Opción no válida. Se tomará la propina como 0.");
                    propinaPorcentaje = 0; // Aseguramos que tenga un valor por defecto
                    */
            }
            break;
        } else {
                alert("Por favor, ingrese un valor válido para el servicio.");
            }
    }
}

let mensajeFinal = `El total a pagar es $${cuenta}`;
let propina = 0;

if (dejarPropina) { //solo si el usuario decide dejar propina cambia el mensaje final
    propina = cuenta * propinaPorcentaje;
    const total = cuenta + propina;
    mensajeFinal = `El total a pagar es $${total}, incluyendo una propina del ${propinaPorcentaje * 100}% ($${propina}).`;
} else {
    mensajeFinal += ". No se agregó propina.";
}

alert(mensajeFinal);