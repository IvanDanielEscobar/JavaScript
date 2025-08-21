import { Fragment, useState } from "react";
import { Button } from "primereact/button";

const OcultarTexto = () =>{

    const [visible, setVisible] = useState(true) 

    return(
        <div>
            <Button onClick={()=>setVisible(!visible)} label={visible ? 'Ocultar' :'Mostrar' } />
            
            {visible && <h3>Hola, react</h3>}
        </div>
    )

}

export default OcultarTexto