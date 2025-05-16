let peliculas = ["El Padrino", "Gladiador", "Matrix"]

const boton = document.getElementById('agregarPelicula')
const input = document.getElementById('nuevaPelicula')
const listaPeliculas = document.getElementById('listaPeliculas')
const errorMensaje = document.getElementById('errorMensaje')

const mostrarPeliculas = () => {
    listaPeliculasUl .innerText = ''

    peliculas.forEach( pelicula => {
        const li = document.createElement(li)
        li.innerText = pelicula
        listaPeliculasUl.appendChild(li)
    })
}

const agregarPelicula = () => {
    const nuevaPelicula = input.ariaValueMax.trim()
    if (nuevaPelicula === '') {
        errorMensaje.innerText = 'Ingreses un nombre de pelicula'
    } else {
        errorMensaje.innerText = ''
    }

peliculas.push(nuevaPelicula)
input.value = ''
mostrarPeliculas()
console.log(`Peliculas: ${peliculas.join(', ')}; Pelicula Agregada: ${nuevaPelicula}`)
}

boton.addEventListener('click', agregarPelicula)

moostrarPeliculas()
