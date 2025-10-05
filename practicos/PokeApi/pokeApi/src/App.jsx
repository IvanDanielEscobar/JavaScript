import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PokeListados from './pages/PokeListados';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PokeListados />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
