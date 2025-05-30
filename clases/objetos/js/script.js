let autos = JSON.parse(localStorage.getItem("autos")) || []



const agregarAutos = () => {
    const marca = document.getElementById("marca").value.trim()
    const modelo = document.getElementById("modelo").value.trim()  
    const anio = document.getElementById("anio").value

    if (marca !== '' && modelo !== '' && anio !== '') {
        
        autos.push({ marca, modelo, anio })
        
        localStorage.setItem("autos", JSON.stringify(autos))

        console.log("Autos: ", autos)

        renderizarAutos()
         
        document.getElementById("marca").value = ''
        document.getElementById("modelo").value = ''  
        document.getElementById("anio").value = ''

    }
}

const renderizarAutos = () => {
    const tabla = document.getElementById("tablaAutos").querySelector('tbody')

    tabla.innerHTML = ''
    
    autos.forEach((auto, index) => {
        const fila = document.createElement('tr')
        
        fila.innerHTML=`
        <td>${index + 1}</td>
        <td>${auto.marca}</td>
        <td>${auto.modelo}</td>
        <td>${auto.anio}</td>
        <td>
            <button onclick="eliminarAuto(${index})">Eliminar</button>
        </td>
        `

        tabla.appendChild(fila)
    })
}  

const eliminarAuto = (index) => {
    autos.splice(index, 1)

    localStorage.setItem("autos", JSON.stringify(autos))

    renderizarAutos()
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarAutos()
})