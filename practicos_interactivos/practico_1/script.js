let edad;
const precioMenor13 = 1000;
const precioEntre13y17 = 1500;
const precioMayor17 = 2000;

while (true) {
    const edadStr = prompt("¿Cuál es tu edad?");
    edad = parseInt(edadStr);

    if (!isNaN(edad) && edad >= 0) {
        break; 
    } else {
        alert("Por favor, ingrese una edad válida (un número mayor o igual a cero).");
    }
}

let mensajeFinal = ""

if (edad <= 5 || edad >= 80) {
    mensajeFinal = `Edad ${edad}: la entrada es gratuita`;
} else if (edad < 13) {
    mensajeFinal = `Edad ${edad}: el precio de la entrada es $${precioMenor13}.`;
} else if (edad >= 13 && edad <= 17) {
    mensajeFinal = `Edad ${edad}: el precio de la entrada es $${precioEntre13y17}.`;
} else {
    mensajeFinal = `Edad ${edad}: el precio de la entrada es $${precioMayor17}.`;
}

alert(mensajeFinal)