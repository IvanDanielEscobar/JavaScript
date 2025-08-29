import { useRef, useState, Fragment } from "react";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import Swal from "sweetalert2";

const opcionesColor = [
    { label: 'Rojo', value: 'red' },
    { label: 'Amarillo', value: 'yellow' },
    { label: 'Verde', value: 'green' },
];

const Tarjeta = () => {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("gray");
    const toast = useRef(null);

    const guardarEnLocalStorage = (persona) => {
        const existente = localStorage.getItem('personas')
        const lista = existente ? JSON.parse(existente):[]
        lista.push(persona)
        localStorage.setItem('personas', JSON.stringify(lista))
    }
    const confirmarForm = () => {
        Swal.fire({
              title: "Desea confirmar los datos?",
              text: `Nombre : ${nombre || `Sin nombre` } | Color: ${color}`,
              icon: 'question',
              showCancelButton: true,
              confirmButtonText:'Guardar',
              cancelButtonText:'Cancelar'         
        }).then((result)=>{
            if(result.isConfirmed){
                guardarEnLocalStorage({
                    nombre: nombre || 'Sin nombre',
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
                </div>

                <div>
                    <small>Color de Fondo</small>
                    <SelectButton
                        value={color}
                        onChange={(e) => setColor(e.value)}
                        options={opcionesColor}
                    />
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
                    setNombre("")
                    setColor("gray")       
                }}
                />
            </div>
        </Fragment>
    );
};

export default Tarjeta;
