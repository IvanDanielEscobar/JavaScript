let libros = JSON.parse(localStorage.getItem("libros")) || []

let editando = false;
let indiceEditar = null;
let ordenAscendente = true;

const agregarLibros= () => {
    const titulo = document.getElementById("titulo").value.trim()
    const autor = document.getElementById("autor").value.trim()  
    const anio = document.getElementById("anio").value
    const genero = document.getElementById("genero").value.trim()

    if (titulo !== '' && autor !== '' && anio !== '' && genero !== '') {
        
        if (editando) {
            libros[indiceEditar] = { titulo, autor, anio, genero }
            editando=false
            indiceEditar=null

            document.querySelector('button[type=submit]').innerText = 'Agregar libro'
        } else {
            libros.push({ titulo, autor, anio, genero  })
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
    }
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
        <td>${libro.anio}</td>
        <td>${libro.genero}</td>
        <td>
            <button onclick="editarLibro(${indexReal})">Editar</button>
            <button onclick="eliminarLibro(${indexReal})">Eliminar</button>
        </td>
        `

        tabla.appendChild(fila)
    })
}  

const editarLibro = (index) => {
    const libro = libros[index]
    document.getElementById('titulo').value = libro.titulo
    document.getElementById('autor').value = libro.autor
    document.getElementById('anio').value = libro.anio
    document.getElementById('genero').value = libro.genero
    // document.getElementById('buttonForm').innerText='Editar Auto'
    document.querySelector('button[type=submit]').innerText = 'Actualizar Libro'
    editando=true
    indiceEditar = index
}

const mostrarResumen = () => {
    const resumen = document.getElementById('resumenLibros') 
    
    if (libros.lengh === 0) {
        resumen.innerText = 'No existen libros cargados'
        return;
    }
    const total = libros.length

    const sumaAnios = libros.reduce((acum, libro) => acum + parseInt(libro.anio), 0)
    
    const promedio = Math.round(sumaAnios/total)
    
    
    //filtro libro posteriores a 2015
    const posterioresA2015 = libros.filter(libro => libro.anio > 2015).length
    
    
    //filtro libro mas reciente
    const libroNuevo = libros.reduce((nuevo, libro) => (libro.anio > nuevo.anio ? libro : nuevo), libros[0])
    
    
    //filtro libro mas antiguo
    const libroViejo = libros.reduce((nuevo, libro) => (libro.anio < nuevo.anio ? libro : nuevo), libros[0])
    
    resumen.innerHTML = `
    <p>total de Librps: ${total}</p>
    <p>Promedio: ${promedio}</p>
    <p>Libros Posteriores a 2015: ${posterioresA2015}</p>
    <p>Libro mas nuevo: ${libroNuevo.titulo} ${libroNuevo.autor} ${libroNuevo.anio} ${libroNuevo.genero}</p>
    <p>Libro mas viejo: ${libroViejo.titulo} ${libroViejo.autor} ${libroViejo.anio} ${libroViejo.genero}</p>
    `
}

const eliminarLibro = (index) => {
    libros.splice(index, 1)

    localStorage.setItem("libros", JSON.stringify(libros))

    renderizarLibros()
    mostrarResumen()
}

const ordenarPorAnio = () => {
    const librosOrdenados = [...libros].sort((a, b)=>{
        return ordenAscendente ? a.anio - b.anio : b.anio - a.anio
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


document.addEventListener('DOMContentLoaded', () => {
    renderizarLibros()
    mostrarResumen()
    actualizarSelectGenero()
})