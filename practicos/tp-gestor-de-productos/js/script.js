let productos = JSON.parse(localStorage.getItem("productos")) || []



const agregarProductos = () => {
    const nombre = document.getElementById("nombre").value.trim()
    const categoria = document.getElementById("categoria").value.trim()  
    const precio = document.getElementById("precio").value

    if (nombre !== '' && categoria !== '' && precio !== '') {
        
        productos.push({ nombre, categoria, precio })
        
        localStorage.setItem("productos", JSON.stringify(productos))

        console.log("Productos: ", productos)

        renderizarProductos()
         
        document.getElementById("nombre").value = ''
        document.getElementById("categoria").value = ''  
        document.getElementById("precio").value = ''

    }
}

const renderizarProductos = () => {
    const tabla = document.getElementById("tablaProductos").querySelector('tbody')

    tabla.innerHTML = ''
    
    productos.forEach((producto, index) => {
        const fila = document.createElement('tr')
        
        fila.innerHTML=`
        <td>${index + 1}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.precio}</td>
        <td>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
        `

        tabla.appendChild(fila)
    })
    const totalProductos = document.getElementById('totalProductos')
    if (totalProductos){
        totalProductos.textContent = `Total de productos: ${productos.length}`
    }
}  

const eliminarProducto = (index) => {
    productos.splice(index, 1)

    localStorage.setItem("productos", JSON.stringify(productos))

    renderizarProductos()
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos()
})