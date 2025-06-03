const boton = document.getElementById('agregarParticipantes')
const input = document.getElementById('nuevoParticipante')
const listaParticipantes = document.getElementById('listaParticipantes')
const listaPresentes = document.getElementById('listaPresentes')
const errorMensaje = document.getElementById('errorMensaje')

boton.addEventListener('click', () => {
    const texto = input.value.trim()

    if (texto === ''){
        errorMensaje.innerText = 'Ingrese un valor'
        return
    }  else {
        errorMensaje.innerText = ''
    }

    const listaPar = document.createElement('li')
    listaPar.innerText = texto;

    listaPar.addEventListener('click', () => {
        listaPar.classList.toggle("completada")
    })

    const btnEliminar = document.createElement('button')
    btnEliminar.innerText = 'Eliminar Participante'
    btnEliminar.style.marginLeft = '10px'

    btnEliminar.addEventListener('click', () => {
        listaParticipantes.removeChild(listaPar)
        
    })

    const btnPresente = document.createElement('button')
    btnPresente.innerText = 'Presente'
    btnPresente.style.marginLeft = '10px'

    btnPresente.addEventListener('click', () => {    
        
        const listaPre = document.createElement('li')
        listaPre.innerText = texto

          
        const btnEliminarP = document.createElement('button')
        btnEliminarP.innerText = 'Eliminar presente'
        btnEliminarP.style.marginLeft = '10px'

        btnEliminarP.addEventListener('click', () => {
            listaPresentes.removeChild(listaPre)
        })

        listaPre.appendChild(btnEliminarP)

        listaPresentes.appendChild(listaPre)

        listaParticipantes.removeChild(listaPar)
        
    })

    listaPar.appendChild(btnEliminar)
    listaPar.appendChild(btnPresente)
    
    
    listaParticipantes.appendChild(listaPar)
    
    input.value = ''

})

