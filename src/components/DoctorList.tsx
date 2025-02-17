import { useEffect, useState } from "react"
import DoctorCard from "./DoctorCard"
import { IUsuario } from "../interfaces/IUsuario"
import { getUsuarios } from "../services/api"
import { IDoctor } from "../interfaces/IDoctor"

const DoctorList = () => {
    const [doctores, setDoctores] = useState([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docs = await getUsuarios()
                setDoctores(docs.filter((doc: IUsuario) => doc.rol==='doctor'))
            } catch (error) {
                setError(error+"")
            }
        }
        fetchData()
    }, [])

    if(error) return <p style={{color: 'red'}}>Error: {error}</p>
    
    if(!doctores) return <p>Loading...</p>
    
    return (
        <section className="row px-5 m-4">
            {
                doctores.map((doctor: IDoctor) => (
                    <DoctorCard
                        key = {doctor.id}
                        imagen = {doctor.imagen}
                        nombre = {doctor.nombre}
                        especialidad = {doctor.especialidad}
                        aniosExp = {doctor.aniosExp}
                        descripcion = {doctor.descripcion}
                    />
            ))
            }
        </section>
    )
}

export default DoctorList
