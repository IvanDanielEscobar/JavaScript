import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Button } from './Button'
import { Saludo } from './Saludo'
import OcultarTexto from './OcultarTexto'
import { Button } from 'primereact/button'
        
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <Saludo nombre='Ricardo'/>
        <OcultarTexto />
        <Button label='Hola mundo' tooltip='Hola mundo'></Button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
