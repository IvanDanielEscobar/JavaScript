let autos = JSON.parse(localStorage.getItem("autos")) || []

let editando = false;
let indiceEditar = null;
let ordenAscendente = false;

const agregarAutos = () => {
    const marca = document.getElementById("marca").value.trim()
    const modelo = document.getElementById("modelo").value.trim()  
    const anio = document.getElementById("anio").value

    if (marca !== '' && modelo !== '' && anio !== '') {
        
        if (editando) {
            autos[indiceEditar] = { marca, modelo, anio }
            editando=false
            indiceEditar=null

            document.querySelector('button[type=submit]').innerText = 'Agregar Auto'
        } else {
            const yaExiste = autos.some(auto=>
                auto.marca.toLowerCase() === marca.toLowerCase() && 
                auto.modelo.toLowerCase() === modelo.toLowerCase()
            )
            if(yaExiste){
                alert("Este auto ya esta registrado en el listado")
                return
            }

            autos.push({ marca, modelo, anio })
        }
            
        localStorage.setItem("autos", JSON.stringify(autos))

        console.log("Autos: ", autos)

        renderizarAutos()
        mostrarResumen()
        actualizarSelectMarca()

        document.getElementById("marca").value = ''
        document.getElementById("modelo").value = ''  
        document.getElementById("anio").value = ''
    }
}

const filtrarAutos = () => {
    const texto = document.getElementById('busqueda').value.toLowerCase()
    const autosFiltrados = autos.filter(auto => auto.marca.toLowerCase().includes(texto))
    
    renderizarAutos(autosFiltrados)
}

const renderizarAutos = (lista = autos) => {
    const tabla = document.getElementById("tablaAutos").querySelector('tbody')

    tabla.innerHTML = ''
    
    lista.forEach((auto) => {
        const indexReal = autos.indexOf(auto)

        const fila = document.createElement('tr')
        
        fila.innerHTML=`
        <td>${indexReal + 1}</td>
        <td>${auto.marca}</td>
        <td>${auto.modelo}</td>
        <td>${auto.anio}</td>
        <td>
            <button onclick="editarAuto(${indexReal})">Editar</button>
            <button onclick="eliminarAuto(${indexReal})">Eliminar</button>
        </td>
        `

        tabla.appendChild(fila)
    })
}  

const editarAuto = (index) => {
    const auto = autos[index]
    document.getElementById('marca').value = auto.marca
    document.getElementById('modelo').value = auto.modelo
    document.getElementById('anio').value = auto.anio
    // document.getElementById('buttonForm').innerText='Editar Auto'
    document.querySelector('button[type=submit]').innerText = 'Actualizar Auto'
    editando=true
    indiceEditar = index
}

const eliminarAuto = (index) => {
    autos.splice(index, 1)

    localStorage.setItem("autos", JSON.stringify(autos))

    renderizarAutos()
    mostrarResumen()
}

const ordenarPorAnio = () => {
    const autosOrdenados = [...autos].sort((a, b)=>{
        return ordenAscendente ? a.anio - b.anio : b.anio - a.anio
    })

    ordenAscendente = !ordenAscendente
    renderizarAutos(autosOrdenados)
}

const mostrarResumen = () => {
    const resumen = document.getElementById('resumenAutos') 
    
    if (autos.lenght === 0) {
        resumen.innerText = 'No existen autos cargados'
        return;
    }
    const total = autos.length

    const sumaAnios = autos.reduce((acum, auto) => acum + parseInt(auto.anio), 0)
    
    const promedio = Math.round(sumaAnios/total)
    
    
    //filtro autos posteriores a 2015
    const posterioresA2015 = autos.filter(auto => auto.anio > 2015).length
    
    
    //filtro auto mas reciente
    const autoNuevo = autos.reduce((nuevo, auto) => (auto.anio > nuevo.anio ? auto : nuevo), autos[0])
    
    
    //filtro auto mas antiguo
    const autoViejo = autos.reduce((nuevo, auto) => (auto.anio < nuevo.anio ? auto : nuevo), autos[0])
    
    resumen.innerHTML = `
    <p>total de autos: ${total}</p>
    <p>Promedio: ${promedio}</p>
    <p>Autos Posteriores a 2015: ${posterioresA2015}</p>
    <p>Auto mas nuevo: ${autoNuevo.marca} ${autoNuevo.modelo} ${autoNuevo.anio}</p>
    <p>Auto mas viejo: ${autoViejo.marca} ${autoViejo.modelo} ${autoViejo.anio}</p>
    `
}

const actualizarSelectMarca = () => {
    const select = document.getElementById('filtroMarca')
    const marcasUnicas = [...new Set(autos.map(auto=> auto.marca))]
    select.innerHTML = `<option value="todas">Todas</option>`
    marcasUnicas.forEach(marca=>{
        const option = document.createElement("option")
        option.value = marca
        option.text = marca
        select.appendChild(option)
    })
}

const filtrarPorMarca = () => {
    const marca = document.getElementById('filtroMarca').value
    
    if (marca === 'todas'){
        renderizarAutos()
    } else {
        const autosFiltrados = autos.filter(auto => auto.marca === marca)
        renderizarAutos(autosFiltrados)
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderizarAutos()
    mostrarResumen()
    actualizarSelectMarca()
})