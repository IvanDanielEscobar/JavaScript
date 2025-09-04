import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

const Home = () => {
    const navigate = useNavigate()
    
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", gap: "20px" }}>
            <h1>Práctico: Mini Formulario con Confirmación + Router + LocalStorage</h1>
            <Button label="Ir al Formulario" onClick={()=> navigate('/tarjeta')} />
        </div>
    )
}

export default Home