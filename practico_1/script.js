const edad = parseInt(prompt("¿Cuál es tu edad?"));

if (edad <= 5 || edad >= 80) {
    alert("Entrada gratuita.");
} else if (edad < 13) {
    alert("El precio de la entrada es $1000.");
} else if (edad >= 13 && edad <17) {
    alert("El precio de la entrada es $1500.");
} else {
    alert("El precio de la entrada es $2000.");
}
