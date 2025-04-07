let edad;

while (true) {
    const edadStr = prompt("¿Cuál es tu edad?");
    edad = parseInt(edadStr);

    if (!isNaN(edad) && edad >= 0) {
        // numero válido (no NaN) y es mayor o igual a 0
        break; // Salimgo del bucle while porque la edad es válida
    } else {
        alert("Por favor, ingrese una edad válida (un número mayor o igual a cero).");
    }
}

if (edad <= 5 || edad >= 80) {
    alert("Entrada gratuita.");
} else if (edad < 13) {
    alert("El precio de la entrada es $1000.");
} else if (edad >= 13 && edad <= 17) {
    alert("El precio de la entrada es $1500.");
} else {
    alert("El precio de la entrada es $2000.");
}