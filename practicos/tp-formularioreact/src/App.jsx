import './App.css'
import Tarjeta from './layouts/Tarjeta'
import Home from './layouts/Home'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tarjeta' element={< Tarjeta />} /> 
      </Routes>
    </>
  )
}

export default App
