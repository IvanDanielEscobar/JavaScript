let peliculas = JSON.parse(localStorage.getItem("peliculas")) || []
let peliculasFavoritas = JSON.parse(localStorage.getItem("peliculasFavoritas")) || []

const ordenAlfabetico = () => {
    peliculas.sort((a, b) => {
        const peliA = a.pelicula.toLowerCase()
        const peliB = b.pelicula.toLowerCase()
        if (peliA < peliB) return -1
        if (peliA > peliB) return 1
        return 0
    })
    localStorage.setItem("peliculas", JSON.stringify(peliculas))
}
const agregarPeliculas = () => {
    const pelicula = document.getElementById("pelicula")
    const peliculaNombre = pelicula.value.trim()

    if (peliculaNombre !== '') {

        let repetida = false
        const peliculaRepetida = peliculaNombre.toLowerCase()
        
        peliculas.forEach(peliRepetida =>{
            if(peliRepetida.pelicula.toLowerCase() === peliculaRepetida) {
                repetida = true
            }
        })

        if (repetida) {
            alert('La pelicula ya esta en la lista')
            pelicula.value = ''
        return
        }
        peliculas.push({ pelicula: peliculaNombre })
        
        localStorage.setItem("peliculas", JSON.stringify(peliculas))

        console.log("peliculas: ", peliculas)

        ordenAlfabetico()
        renderizarPeliculas()
         
        document.getElementById("pelicula").value = ''
        
    }
}

const renderizarPeliculas = () => {
    const tablaP = document.getElementById("tablaPeliculas").querySelector('tbody')

    tablaP.innerHTML = ''
    
    peliculas.forEach((pelis, index) => {
        const fila = document.createElement('tr')
        
        fila.innerHTML=`
        <td>${index + 1}</td>
        <td>${pelis.pelicula}</td>
        <td>
            <button onclick="agregarFavorito(${index})">Agregar</button>
        </td>
        <td>
            <button onclick="editarPelicula(${index})">Editar</button>
        </td>
        
        <td>
            <button onclick="eliminarPelicula(${index})">Eliminar</button>
        </td>
        `

        tablaP.appendChild(fila)
    })

    const totalPeliculas = document.getElementById('totalPeliculas')
    if (totalPeliculas){
        totalPeliculas.textContent = `Total de películas: ${peliculas.length}`
    }
}  


const renderizarFavoritos = () => {
    const tablaF = document.getElementById("tablaFavoritos").querySelector('tbody')

    tablaF.innerHTML = ''
    
    peliculasFavoritas.forEach((pelis, index) => {
        const fila = document.createElement('tr')
        
        fila.innerHTML=`
        <td>${index + 1}</td>
        <td>${pelis.pelicula}</td>
        <td>
            <button onclick="eliminarFavorito(${index})">Eliminar</button>
        </td>
        `

        tablaF.appendChild(fila)
    })

    const pelisFavoritas = document.getElementById('totalFavoritas')
    if (pelisFavoritas) {
        pelisFavoritas.textContent = `Total de películas favoritas: ${peliculasFavoritas.length}`
    }
}  

const agregarFavorito = (index) =>{

    const peliculaFavorita = peliculas[index]
        
    peliculasFavoritas.push(peliculaFavorita)
        
    localStorage.setItem("peliculasFavoritas", JSON.stringify(peliculasFavoritas))

    peliculas.splice(index, 1)

    localStorage.setItem("peliculas", JSON.stringify(peliculas))

    ordenAlfabetico()
    renderizarFavoritos()
    renderizarPeliculas()
}



const eliminarPelicula = (index) => {

    peliculas.splice(index, 1)

    localStorage.setItem("peliculas", JSON.stringify(peliculas))

    ordenAlfabetico()
    renderizarPeliculas()
}

const eliminarFavorito = (index) => {

    const devolverPelicula = peliculasFavoritas[index]

    peliculasFavoritas.splice(index, 1)

    localStorage.setItem("peliculasFavoritas", JSON.stringify(peliculasFavoritas))

    if (devolverPelicula) {
        peliculas.push(devolverPelicula)
        localStorage.setItem("peliculas", JSON.stringify(peliculas))
    }

    ordenAlfabetico()
    renderizarFavoritos()
    renderizarPeliculas() 
}


const editarPelicula = (index) => {
    const peliculaRenombrar = peliculas[index]
    const nuevoNombre = prompt(`Editar pelicula "${peliculaRenombrar.pelicula}"`, peliculaRenombrar.pelicula)
    
    if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
        let repetido = false
        const nombreNuevo = nuevoNombre.trim().toLowerCase()

        peliculas.forEach((peliExistente, indexx) => {
            if (indexx !== index && peliExistente.pelicula.toLocaleLowerCase() === nombreNuevo) {
                repetido = true
            }
        })
        if (repetido) {
            alert('Nombre existente')
            return
        }

        peliculas[index].pelicula = nuevoNombre.trim()
        localStorage.setItem("peliculas", JSON.stringify(peliculas))
        ordenAlfabetico()
        renderizarPeliculas()
    }
    else if (nuevoNombre !== null) {
        alert('inserte nombre')
    }
}
document.addEventListener('DOMContentLoaded', () => {
    ordenAlfabetico()
    renderizarPeliculas()
    renderizarFavoritos()
})