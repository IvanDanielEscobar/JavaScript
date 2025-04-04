const peso = parseFloat(prompt("Ingrese su peso en kg(ej: 70.5)"));
//parseFloat = sirve para transformar un string en decimales
const altura = parseFloat(prompt("Ingrese su altura en metros(ej: 1.80)"));

if (isNaN(peso) || peso <= 0 || isNaN(altura) || altura <=0) {
    alert("Por favor ingrese nuevamente");
    // isNaN = is not a number comprueba si el dato es o puede transformarse en un dato numerico
} else {  
    let imc = peso / (altura * altura);
    let imcRedondeado = imc.toFixed(1);
    //toFixed
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
}