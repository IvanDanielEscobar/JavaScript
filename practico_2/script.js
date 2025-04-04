const cuenta = parseInt(prompt("Ingrese el total de la cuenta:"));
let servicio = prompt("¿Cómo estuvo el servicio? (malo, bueno, excelente)").toLowerCase();
let propina = 0;

if (servicio === "malo") {
    propina = cuenta * 0.10;
} else if (servicio === "bueno") {
    propina = cuenta * 0.15;
} else if (servicio === "excelente") {
    propina = cuenta * 0.20;
} else {
    alert("Opción no válida. Se tomará la propina como 0.");
}

let total = cuenta + propina;
alert(`El total a pagar es $${total}, incluyendo una propina de $${propina}.`);
