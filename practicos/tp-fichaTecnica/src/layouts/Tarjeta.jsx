import { useRef, useState, Fragment } from "react";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';
import Swal from "sweetalert2";

const opcionesColor = [
    { label: 'Rojo', value: 'red' },
    { label: 'Amarillo', value: 'yellow' },
    { label: 'Verde', value: 'green' },
];  
    



const Tarjeta = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [color, setColor] = useState("gray");
    const [checkTerms, setCheckTerms] = useState(false)
    const toast = useRef(null);
    const emailValido = email?.includes("@") && email?.includes(".");
    const Invalido = !nombre || !emailValido || color === "gray" || !checkTerms;
    

    

    const guardarEnLocalStorage = (persona) => {
        const existente = localStorage.getItem('personas')
        const lista = existente ? JSON.parse(existente):[]
        lista.push(persona)
        localStorage.setItem('personas', JSON.stringify(lista))
    }

    const confirmarForm = () => {
        Swal.fire({
              title: "Desea confirmar los datos?",
              text: `Nombre : ${nombre || `Sin nombre` } | Email: ${email} | Color: ${color}`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText:'Guardar',
              cancelButtonText:'Cancelar'         
        }).then((result)=>{
            if(result.isConfirmed){
                guardarEnLocalStorage({
                    nombre: nombre || 'Sin nombre',
                    email: email || 'sin email', 
                    color: color || 'Sin color',
                    createdAt: new Date()
                })
                toast.current?.show({
                    severity: "success",
                    summary: 'Guardado',
                    detail: 'Tarjeta de presentacion guardada',
                })
            }
        })
    }

    return (
        <Fragment>
            <Toast ref={toast} position="top-center" />

            <Card title="Tarjeta de Presentación"  style={{
              width: "400px", margin: "20px auto", padding: "25px", borderRadius: "12px" }}>
                <div style={{ marginBottom: "15px" }}>
                    <span className="p-float-label" style={{ display: "grid" }}>
                        <InputText
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </span>
                    <span className="p-float-label" style={{ display: "grid", marginTop: "25px" }}>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>

                <div>
                    <small>Color de Fondo</small>
                    <SelectButton
                        value={color}
                        onChange={(e) => setColor(e.value)}
                        options={opcionesColor}
                    />
                </div>

                <div style={{ marginTop: "15px" }} > 
                    <div className="p-field-checkbox">
                        <Checkbox inputId="terminos" onChange={e => setCheckTerms(e.checked)} checked={checkTerms} />
                        <label htmlFor="terminos">Aceptar Terminos y condiciones</label>
                    </div>
                </div>

            </Card>

            <div
                style={{
                    backgroundColor: color,
                    borderRadius: 12,
                    padding: 16,
                    marginTop: 16,
                    color: "black",
                    textAlign: "center",
                }}
            >
                <h2>Hola, soy {nombre || "______"}</h2>
                <p>Mi color favorito es {color !== 'gray' ? opcionesColor.find((item)=>item.value === color)?.label : 'Gris'}</p>
            </div>
            <div style={{marginTop:10, display:'flex', justifyContent:'center' }}>
                <Button 
                label="Guardar"
                icon='pi pi-check'
                onClick={()=>{confirmarForm()}}
                style={{margin: 20}}
                disabled={Invalido}
                />
                <Button
                label="Limpiar"
                icon='pi pi-eraser'
                style={{margin: 20}}
                onClick={()=> {
                    setNombre("")
                    setEmail("")
                    setColor("gray")
                    setCheckTerms(false)
                }}
                />
            </div>
        </Fragment>
    );
};

export default Tarjeta;
