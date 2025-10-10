import './App.css'
import Tarjeta from './layouts/Tarjeta'
import Home from './layouts/Home'
import { Routes, Route } from 'react-router-dom'
import Personas from './layouts/Personas'

function App() {

  return (
    <>
      <h1>Vite + React</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tarjeta' element={< Tarjeta />} />
        <Route path='/personas' element={<Personas />} /> 
      </Routes>
    </>
  )
}

export default App
