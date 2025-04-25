const boton = document.getElementById('saludar')

boton.addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value
    console.log("nombre", nombre)
    document.getElementById('resultado').innerText = `Hola, ${nombre}`
})