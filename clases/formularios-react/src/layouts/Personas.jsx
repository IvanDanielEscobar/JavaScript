import { useEffect, useState } from "react"
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { useNavigate } from "react-router-dom"

const PERSONAS_KEY = 'personas';

const colorLabel = (c)=> c === 'red' ? 'Rojo' : c === 'yellow' ? 'Amarillo' : c === 'green' ? 'verde' : 'gray'
const Personas = () => {
    const [personas, setPersonas] = useState([])

    const cargarPersonas = () =>{
        const data = localStorage.getItem(PERSONAS_KEY)
        const formatedData = data ? JSON.parse(data) : []
        setPersonas(formatedData)
    }
    useEffect(() => {
        cargarPersonas()
    },[])

    console.log("personas", personas);

    const colorTemplate = (row) => colorLabel(row?.color)
    const fechaTemplate = (row) => row?.createdAt ? new Date(row?.createdAt).toLocaleString():row?.createdAt

    const accionesTemplate = (row) =>{
        <div>
            <Button icon='pi pi-trash' label='Eliminar' />
            <Button icon='pi pi-pencil' label='Editar' />
        </div>
    }

    return (
    <Card title='Personas guardadas'>
        <div>
            <Button label="Refrescar" onClick={()=> cargarPersonas()} />
            <Button label="Ir a la home" onClick={()=> useNavigate('/')} />
            <Button label="Nueva persona" onClick={()=> useNavigate('/tarjeta')} />
        </div>
        <DataTable value={personas} emptyMessage='No hay personas registradas'>
            <Column field='nombre' header='Nombre' />
            <Column field='email' header='Email' />
            <Column header='Color' body={colorTemplate} />
            <Column header='Fecha de Creadcion' body={fechaTemplate} />
            <Column header='Acciones' body={accionesTemplate} />
            
        </DataTable>
    </Card>
    )
}
export default Personas