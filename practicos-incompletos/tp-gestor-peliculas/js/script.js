let peliculas = JSON.parse(localStorage.getItem("peliculas")) || []
let peliculasFavoritas = JSON.parse(localStorage.getItem("peliculasFavoritas")) || []


const agregarPeliculas = () => {
    const pelicula = document.getElementById("pelicula").value.trim()

    if (pelicula !== '') {
        
        peliculas.push({ pelicula })
        
        localStorage.setItem("peliculas", JSON.stringify(peliculas))

        console.log("peliculas: ", peliculas)

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
            <button onclick="eliminarPelicula(${index})">Eliminar</button>
        </td>
        `

        tablaP.appendChild(fila)
    })
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
}  

const agregarFavorito = (index) =>{

    const peliculaFavorita = peliculas[index]
        
    peliculasFavoritas.push(peliculaFavorita)
        
    localStorage.setItem("peliculasFavoritas", JSON.stringify(peliculasFavoritas))

    peliculas.splice(index, 1)

    localStorage.setItem("peliculas", JSON.stringify(peliculas))

    renderizarFavoritos()
    renderizarPeliculas()
}


const eliminarPelicula = (index) => {
    peliculas.splice(index, 1)

    localStorage.setItem("peliculas", JSON.stringify(peliculas))

    renderizarPeliculas()
}

const eliminarFavorito = (index) => {
    peliculasFavoritas.splice(index, 1)

    localStorage.setItem("peliculasFavoritas", JSON.stringify(peliculasFavoritas))

    renderizarFavoritos()
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarPeliculas()
    renderizarFavoritos()
})