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
        if (servicio === "malo" || servicio === "bueno" || servicio === "excelente") {
            switch (servicio) {
                case "malo": 
                    propinaPorcentaje = 0.10;
                    break; 
                case "bueno":
                    propinaPorcentaje = 0.15;
                    break;
                case "excelente":
                    propinaPorcentaje = 0.20;
                    break;
            }
            break;
        } else {
                alert("Por favor, ingrese un valor válido para el servicio.");
            }
    }
}

let mensajeFinal = `El total a pagar es $${cuenta}`;
let propina = 0;

if (dejarPropina) {
    propina = cuenta * propinaPorcentaje;
    const total = cuenta + propina;
    mensajeFinal = `El total a pagar es $${total}, incluyendo una propina del ${propinaPorcentaje * 100}% ($${propina}).`;
} else {
    mensajeFinal += ". No se agregó propina.";
}

alert(mensajeFinal);