let peso; 
let altura; 
 

while (true) { 
    const inputPeso = prompt("Ingrese su peso en kg (ej: 70.5)");
    peso = parseFloat(inputPeso); 
    if (!isNaN(peso) && peso > 0 && peso < 700) {
        break; 
    } else {
        alert("Peso inválido. Ingrese Nuevamente.");
    }
}

while (true) {
    const inputAltura = prompt("Ingrese su altura en metros (ej: 1.80)");
    altura = parseFloat(inputAltura); 

    if (!isNaN(altura) && altura > 0 && altura < 3) {
        break; 
    } else {
        alert("Altura inválida. Ingrese nuevamente.");
        
    }
}

let imc = peso / (altura * altura);
let imcRedondeado = imc.toFixed(1);
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