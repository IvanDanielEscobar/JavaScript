const form = document.getElementById('formulario')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const usuario = document.getElementById('usuario').value
    const email = document.getElementById('correo').value

    const errorUsuario = document.getElementById("errorUsuario")

    if (usuario === '') {
        errorUsuario.innerText = 'El nombre de usuario es requerido'
        errorUsuario.style.color = 'red'
        errorUsuario.style.fontWeight = 'bold'
        errorUsuario.style.fontSize = '15px'
        document.getElementById("mensaje").innerText = ''
    } else if (email === '') {
        document.getElementById("errorCorreo").innerText = 'El email es requerido'
        document.getElementById("mensaje").innerText = ''
    } else {
        document.getElementById("errorUsuario").innerText = ''
        document.getElementById("errorCorreo").innerText = ''
        document.getElementById("mensaje").innerText = `Bienvenido ${usuario}`
    }

})