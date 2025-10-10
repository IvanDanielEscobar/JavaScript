import { useRef, useState, Fragment } from "react";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Personas from "./Personas";
import Swal from "sweetalert2";

const opcionesColor = [
    { label: 'Rojo', value: 'red' },
    { label: 'Amarillo', value: 'yellow' },
    { label: 'Verde', value: 'green' },
];

const Tarjeta = () => {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("gray");
    const [email, setEmail] = useState('');
    const [acepta, setAcepta] = useState(false);
    const toast = useRef(null);

    const emailValido = email.includes('@') && email.includes('.')
    const formValido = nombre.trim() !== "" && emailValido && color !== 'gray' && acepta !== false


    const guardarEnLocalStorage = (persona) => {
        const existente = localStorage.getItem('personas')
        const lista = existente ? JSON.parse(existente):[]
        lista.push(persona)
        localStorage.setItem('personas', JSON.stringify(lista))
    }

    const borrarDatosFotmulario = () => {
        setNombre("")
        setEmail('')
        setColor("gray")
        setAcepta(false) 
    }
    const confirmarForm = () => {
        Swal.fire({
              title: "Desea confirmar los datos?",
              text: `Nombre : ${nombre || `Sin nombre` } | Email: ${email}| Color: ${color}`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText:'Guardar',
              cancelButtonText:'Cancelar'         
        }).then((result)=>{
            if(result.isConfirmed){
                guardarEnLocalStorage({
                    nombre: nombre || 'Sin nombre',
                    email,
                    color: color || 'Sin color',
                    aceptaTerminos: acepta,
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

            <Card title="Tarjeta de Presentación">
                <div style={{ marginBottom: "1rem" }}>
                    <span className="p-float-label" style={{ display: "grid" }}>
                        <InputText
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <label htmlFor="nombre">Nombre</label>
                    </span>
                    {!nombre.trim() && <p>Debes esctibir tu nombre</p>}
                </div>

                <span className="p-float-label">
                    <InputText 
                    id='email'
                     value={email}
                      onChange={(e) => setEmail(e.target.value)} 
                      />
                    <label htmlFor="email">Email</label>
                </span>
                {!email && !emailValido && <p>Email invalido</p>}

                <div>
                    <small>Color de Fondo</small>
                    <SelectButton
                        value={color}
                        onChange={(e) => setColor(e.value)}
                        options={opcionesColor}
                    />
                </div>

                <div>
                    <span className="p-float-label">Acepta los Terminos?
                        <Checkbox inputId="acepta" checked={acepta} onChange={(e)=>setAcepta(e.checked)}/>
                    </span>
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
                />
                <Button
                label="Limpiar"
                icon='pi pi-eraser'
                style={{margin: 20}}
                onClick={()=> {
                    borrarDatosFotmulario()      
                }}
                />
            </div>
        </Fragment>
    );
};

export default Tarjeta;
