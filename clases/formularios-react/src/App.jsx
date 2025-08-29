import './App.css'
import Tarjeta from './layouts/Tarjeta'
import Home from './layouts/Home'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <h1>Vite + React</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tarjeta' element={< Tarjeta />} /> 
      </Routes>
    </>
  )
}

export default App
