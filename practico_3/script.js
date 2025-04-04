let peso; // fuera del bucle para que exista después
let altura; // fuera del bucle
 
// Bucle para pedir el peso 
while (true) { 
    const inputPeso = prompt("Ingrese su peso en kg (ej: 70.5)");
    peso = parseFloat(inputPeso); // convertir la entrada a número

    // si es un número (no NaN) Y si es mayor que 0
    if (!isNaN(peso) && peso > 0) {
        break; 
        // Si es válido, salimos del bucle del peso
    } else {
        alert("Peso inválido. Ingrese Nuevamente.");
        // Si no es válido, intentar de nuevo
    }
}
// Bucle para pedir la altura solo despues del peso valido
while (true) {
    const inputAltura = prompt("Ingrese su altura en metros (ej: 1.80)");
    altura = parseFloat(inputAltura); 
    // convertir la entrada a número

    if (!isNaN(altura) && altura > 0) {
        break; 
    } else {
        alert("Altura inválida. Ingrese nuevamente.");
        
    }
}
let imc = peso / (altura * altura);
let imcRedondeado = imc.toFixed(1);
//toFixed para procesar numeros decimales
    let clase = "";
    if (imc < 18.5) {
        clase = "Tienes bajo peso.";
    } else if (imc < 25) {
        clase = "Tienes un peso normal.";
    } else if (imc < 30) {
        clase = "Tienes sobrepeso.";
    } else {
        clase = "Tienes obesidad.";
    }

    let mensaje = `Tu IMC es ${imcRedondeado}. ${clase} `;
    alert(mensaje);
    