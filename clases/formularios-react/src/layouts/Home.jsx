import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Home = () => {
    const navigate = useNavigate()
    
    return (
        <div>
        <Button label="Ir al Formulario" onClick={()=> navigate('/tarjeta')} />

        <Button label="ver personas" onClick={()=> navigate('/personas')} />
        </div>
    )
}

export default Home