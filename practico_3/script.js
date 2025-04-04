const peso = parseInt(prompt("Ingrese su peso en kg:"));
const altura = parseInt(prompt("Ingrese su altura en metros:"));

let imc = peso / (altura * altura);
let mensaje = `Tu IMC es ${imc}. `;

if (imc < 18.5) {
    mensaje += "Tienes bajo peso.";
} else if (imc < 25) {
    mensaje += "Tienes un peso normal.";
} else if (imc < 30) {
    mensaje += "Tienes sobrepeso.";
} else {
    mensaje += "Tienes obesidad.";
}

alert(mensaje);
