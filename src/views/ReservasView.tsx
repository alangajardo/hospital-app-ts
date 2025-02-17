import { useEffect, useState } from "react"
import MainLayout from "../layouts/MainLayout"
import { getCitas } from "../services/api"
import { ICita } from "../interfaces/ICita"

const ReservasView = () => {
    const [citas, setCitas] = useState([])
    const [error, setError] = useState<string | null>(null)
    
    useEffect( ()=> {
        const fetchCitas = async () => {
            try {
                const token = localStorage.getItem('user')
                if(!token){
                    setError("No se encontró un token válido. Inicia sesión de nuevo")
                    return
                }
                const data = await getCitas(token)
                setCitas(data)
            } catch (err) {
                setError(`Error: ${err}`)
            }
        }
        fetchCitas()
    }, [])

    return (
        <MainLayout>
            {error && <p>Error de carga de las citas...</p>}
            <h1 className="text-center mt-3">Reservas</h1>

            <ul className="list-group mt-3 p-3">
                {citas.map((cita: ICita, index: number) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action" key={index}>
                        <span className="m-2">{cita.nombre}</span>
                        <span className="m-2">{cita.doctor} - {cita.especialidad}</span>
                        <span className="m-2">{cita.fecha}</span>
                    </li>
                ))}
            </ul>
        </MainLayout>
    )
}

export default ReservasView
