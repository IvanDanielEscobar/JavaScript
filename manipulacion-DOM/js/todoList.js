const boton = document.getElementById('agregarTarea')
const input = document.getElementById('nuevaTarea')
const lista = document.getElementById('listaTareas')
const errorMensaje = document.getElementById('errorMensaje')

boton.addEventListener('click', () => {
    const texto = input.value.trim()

    if (texto === ''){
        errorMensaje.innerText = 'Ingrese un valor'
        return
    }  else {
        errorMensaje.innerText = ''
    }

    const li = document.createElement('li')
    li.innerText = texto

    li.addEventListener('click', () => {
        li.classList.toggle("completada")
    })

    const btnEliminar = document.createElement('button')
    btnEliminar.innerText = 'Eliminar tarea'
    btnEliminar.style.marginLeft = '10px'
    btnEliminar.addEventListener('click', () => {
        lista.removeChild(li)
    })
    li.appendChild(btnEliminar)
    lista.appendChild(li)
    input.value = ''
})
