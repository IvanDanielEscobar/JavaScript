let libros = JSON.parse(localStorage.getItem("libros")) || []

libros = libros.map(libro => {
    if (isNaN(libro.anioNumero) || typeof libro.anioNumero !== 'number') {
        const anioRecuperado = Number(libro.anio);
        libro.anioNumero = isNaN(anioRecuperado) ? 0 : anioRecuperado;
        delete libro.anio;
    }
  
    if (typeof libro.leido === 'undefined') {
        libro.leido = false;
    }
    return libro;
});

let editando = false;
let indiceEditar = null;
let ordenAscendente = true;

const agregarLibros= () => {
    const titulo = document.getElementById("titulo").value.trim()
    const autor = document.getElementById("autor").value.trim()
    const anio = document.getElementById("anio").value.trim()
    const genero = document.getElementById("genero").value.trim()
    const leido = document.getElementById("leido").checked
    
    
    

    if (titulo === '' || autor === '' || anio === '' || genero === '') {
        
        alert("Ingrese todos los campos para continuar")
        return
    }
    
    const anioNumero = Number(anio);
    

    if (isNaN(anioNumero) || anioNumero < 1900 || anioNumero > 2025) {
        alert("El año ingresado es invalido. Por favor, ingrese un año entre 1900 y 2025.")
        return
    }

          
        if (editando) {
            libros[indiceEditar] = { titulo, autor, anioNumero, genero, leido }
            editando=false
            indiceEditar=null

            document.querySelector('button[type=submit]').innerText = 'Agregar libro'
        } else {
            const yaExiste = libros.some(libro => 
                libro.titulo.toLowerCase() === titulo.toLowerCase() &&
                libro.autor.toLowerCase() === autor.toLowerCase()
            )
            if (yaExiste) {
                alert("Este libro ya existe")
                return
            }

            libros.push({ titulo, autor, anioNumero, genero, leido })
        }
            
        localStorage.setItem("libros", JSON.stringify(libros))

        console.log("Libros: ", libros)

        renderizarLibros()
        mostrarResumen()
        actualizarSelectGenero()

        document.getElementById("titulo").value = ''
        document.getElementById("autor").value = ''  
        document.getElementById("anio").value = ''
        document.getElementById("genero").value = ''
        document.getElementById("leido").checked = false
}


const filtrarLibros = () => {
    const texto = document.getElementById('busqueda').value.toLowerCase()
    const librosFiltrados = libros.filter(libro => libro.titulo.toLowerCase().includes(texto))
    
    renderizarLibros(librosFiltrados)
}

const renderizarLibros = (lista = libros) => {
    const tabla = document.getElementById("tablaLibros").querySelector('tbody')

    tabla.innerHTML = ''
    
    lista.forEach((libro) => {
        const indexReal = libros.indexOf(libro)

        const fila = document.createElement('tr')
        
        fila.innerHTML=`
        <td>${indexReal + 1}</td>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.anioNumero}</td>
        <td>${libro.genero}</td>
        <td>
            <button class="btn btn-primary" onclick="editarLibro(${indexReal})">Editar</button>
            <button class="btn btn-primary" onclick="eliminarLibro(${indexReal})">Eliminar</button>
        </td>
        <td><input type="checkbox" onchange="checkLeido(${indexReal})" ${libro.leido ? 'checked' : ''}>Leido?</td>
        `

        tabla.appendChild(fila)
    })
}  

const editarLibro = (index) => {
    const libro = libros[index]
    document.getElementById('titulo').value = libro.titulo
    document.getElementById('autor').value = libro.autor
    document.getElementById('anio').value = libro.anioNumero
    document.getElementById('genero').value = libro.genero
    document.getElementById('leido').checked = libro.leido
    // document.getElementById('buttonForm').innerText='Editar Auto'
    document.querySelector('button[type=submit]').innerText = 'Actualizar Libro'
    editando=true
    indiceEditar = index
}

const mostrarResumen = () => {
    const resumen = document.getElementById('resumenLibros') 
    
    if (libros.length === 0) {
        resumen.innerText = 'No existen libros cargados'
        return;
    }
    const total = libros.length

    const librosLeidos = libros.filter(libro => libro.leido).length

    const sumaAnios = libros.reduce((acum, libro) => acum + libro.anioNumero, 0)
    
    const promedio = Math.round(sumaAnios/total)
    
    
    //filtro libro posteriores a 2010
    const posterioresA2010 = libros.filter(libro => libro.anioNumero > 2010).length
    
    
    //filtro libro mas reciente
    const libroNuevo = libros.reduce((nuevo, libro) => (libro.anioNumero > nuevo.anioNumero ? libro : nuevo), libros[0])
    
    
    //filtro libro mas antiguo
    const libroViejo = libros.reduce((nuevo, libro) => (libro.anioNumero < nuevo.anioNumero ? libro : nuevo), libros[0])
    
    resumen.innerHTML = `
    <p>total de Libros: ${total}</p>
    <p>Libros Leidos: ${librosLeidos} de ${total}</p>
    <p>Promedio: ${promedio}</p>
    <p>Libros Posteriores al 2010: ${posterioresA2010}</p>
    <p>Libro mas nuevo:<br>Titulo: ${libroNuevo.titulo}<br>Año: ${libroNuevo.anioNumero}.</p>
    <p>Libro mas viejo:<br>Titulo:  ${libroViejo.titulo}<br>Año: ${libroViejo.anioNumero}.</p>
    `
}

const eliminarLibro = (index) => {
    libros.splice(index, 1)

    localStorage.setItem("libros", JSON.stringify(libros))

    renderizarLibros()
    mostrarResumen()
}
const checkLeido = (index) => {
    libros[index].leido = !libros[index].leido
    localStorage.setItem("libros", JSON.stringify(libros))
    // Actualizamos el resumen para que refleje el nuevo conteo de leídos
    mostrarResumen()
}
const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b)=>{
        return ordenAscendente ? a.anioNumero - b.anioNumero : b.anioNumero - a.anioNumero
    })

    ordenAscendente = !ordenAscendente
    renderizarLibros(librosOrdenados)
}

const actualizarSelectGenero = () => {
    const select = document.getElementById('filtroGenero')
    const generosUnicos = [...new Set(libros.map(libro=> libro.genero))]
    select.innerHTML = `<option value="todas">Todas</option>`
    generosUnicos.forEach(genero=>{
        const option = document.createElement("option")
        option.value = genero
        option.textContent = genero
        select.appendChild(option)
    })
}

const filtrarPorGenero = () => {
    const generoSeleccionado = document.getElementById('filtroGenero').value
    
    if (generoSeleccionado === 'todas'){
        renderizarLibros(libros)
    } else {
        const librosFiltrados = libros.filter(libro => libro.genero === generoSeleccionado)
        renderizarLibros(librosFiltrados)
    }
}
const actualizarSelectEstado = () => {
    const select = document.getElementById('filtroEstado')
    select.innerHTML = 
        `<option value="todas">Todas</option>
        <option value="true">Leidos</option>
        <option value="false">No leidos</option>`
    
}


const filtrarPorEstado = () => {
    const estadoSeleccionado = document.getElementById('filtroEstado').value
    
    if (estadoSeleccionado === 'todas'){
        renderizarLibros(libros)
    } else {
        const estadoLibro = estadoSeleccionado === 'true'
        const librosFiltrados = libros.filter(libro => libro.leido === estadoLibro);
        
        renderizarLibros(librosFiltrados)
    }
}
document.addEventListener('DOMContentLoaded', () => {
    renderizarLibros()
    mostrarResumen()
    actualizarSelectGenero()
    actualizarSelectEstado()
})