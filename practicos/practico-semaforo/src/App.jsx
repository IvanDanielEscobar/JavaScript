import { useState } from 'react'

const App = () => {
  // color inicial rojo
  const [colorInicial, setColorIni] = useState('rojo');

  //orden
  const colores = ['rojo', 'verde', 'amarillo']

  //boton para cambiar de color
  const cambioColor = () => {
    // indice para el color activo en mi listado
    const indexOf = colores.indexOf(colorInicial);
    // % para volver a 0 al ultimo
    const siguienteColor = (indexOf + 1) % colores.length;
    setColorIni(colores[siguienteColor]);
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center p-4">
      <h1 className="my-5 text-dark">semaforo de react</h1>
      
      <article className="rounded-3 flex- columd-flex align-items-center m-2">
        <div className={`luz rojo ${colorInicial === 'rojo' ? 'activo' : ''}`}></div>
        <div className={`luz amarillo ${colorInicial === 'amarillo' ? 'activo' : ''}`}></div>
        <div className={`luz verde ${colorInicial === 'verde' ? 'activo' : ''}`}></div>
      </article>

      {/* El único botón en el medio que cambia el color. */}
      <div className="mt-5 d-flex gap-2">
        <button
          onClick={cambioColor}
          className="btn btn-primary btn-lg rounded-pill shadow"
        >
          Cambiar Color
        </button>
      </div>
      {/* Estilos CSS personalizados para el semáforo. */}
      <style>
        {`
          .luz {
            width: 120px;
            height: 120px;
            border-radius: 100%;
            background-color: #444;
            border: 4px solid #333;
            transition: all 0.3s ease;
          }
          .luz.rojo.activo {
            background-color: #dc3545;
            box-shadow: 0 0 20px #dc3545, inset 0 0 10px rgba(255, 255, 255, 0.5);
          }
          .luz.amarillo.activo {
            background-color: #ffc107;
            box-shadow: 0 0 20px #ffc107, inset 0 0 10px rgba(255, 255, 255, 0.5);
          }
          .luz.verde.activo {
            background-color: #198754;
            box-shadow: 0 0 20px #198754, inset 0 0 10px rgba(255, 255, 255, 0.5);
          }
        `}
      </style>
    </div>
  )
}


export default App
