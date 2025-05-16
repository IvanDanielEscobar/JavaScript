let frutas = ["banana", "manzana", "pera"]


const agregarFruta = () => {
    const nuevaFruta = document.getElementById('nuevaFruta').value
    frutas.push(nuevaFruta)
    alert(`Nueva fruta agregada: ${nuevaFruta}`)

    console.log("frutas: ", frutas);
}

const eliminarFruta = () => {
    const posicionFruta = document.getElementById('posicionFruta').value
    const cantidadFrutas = document.getElementById('cantidadFruta').value

    frutas.splice(posicionFruta, cantidadFrutas)
    console.log(`frutas: ${frutas}` );
}

const mostrarFrutas = () => {
    const listaFrutas = document.getElementById("listaFrutas")
    listaFrutas.inertHTML = ''
    frutas.forEach(frutas => {
        const li = document.createElement('li')
        li.innerText = frutas
        listaFrutas.appendChild(li)
        console.log(frutas);
    })
}
const transformarFrutas = () => {
    const resultadoFrutas = document.getElementById('resultadoFrutas')
    const listaFrutasEnMayuscula = frutas.map(item => item.toUpperCase())
    console.log(listaFrutasEnMayuscula)
    resultadoFrutas.innerText = "Frutas en Mayuscula: " + listaFrutasEnMayuscula.join (', ')
}