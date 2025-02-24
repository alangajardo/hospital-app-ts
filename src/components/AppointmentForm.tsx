import React, { useEffect, useRef, useState } from "react"
import { getUsuarios } from "../services/api"
import DOMPurify from "dompurify"
import { IUsuario } from "../interfaces/IUsuario";
import { IAppointmentForm } from "../interfaces/IAppointmentForm";

const AppointmentForm: React.FC<IAppointmentForm> =  ({submitForm}) => {
    const [doctores, setDoctores] = useState<IUsuario[]>([])
    const [error, setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsuarios()
                setDoctores(data.filter((doc: IUsuario) => doc.rol==='doctor'))
            } catch (error) {
                if(error instanceof Error){
                    setError(error.message)
                    setDoctores([])
                }
            }
        }
        fetchData()
    }, [])

    const [formCita, setFormCita] = useState({
        nombre: '',
        doctor: '',
        especialidad: '',
        fecha: ''
    })

    const nombreRef = useRef<HTMLInputElement>(null)
    const doctorRef = useRef<HTMLSelectElement>(null)
    const especialidadRef = useRef<HTMLInputElement>(null)
    const fechaRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(nombreRef.current){
            nombreRef.current.focus()
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = DOMPurify.sanitize(e.target.value)
        setFormCita({...formCita, [e.target.name]: sanitizedValue})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await submitForm(formCita)
        setFormCita({ nombre: "", doctor: "", especialidad: "", fecha: "" })
        if (doctorRef.current) {
            doctorRef.current.value = "";
        }
    }

    const selectEspecialidad = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const [especialidad, doctor] = e.target.value.split(",")
        setFormCita((prev) => ({...prev, especialidad: DOMPurify.sanitize(especialidad.trim()), doctor: DOMPurify.sanitize(doctor.trim())}))
    }

    const recargarDoctores = async () => {
        try {
            const data = await getUsuarios()
            setDoctores(data.filter((doc: IUsuario) => doc.rol==='doctor'))
        } catch (error) {
            if(error instanceof Error){
                setError(error.message)
                setDoctores([])
            }
        }
    }

    if(error) return <p>Error: {error}</p>

    return (
        <form className="bg-light p-4 shadow rounded m-4" onSubmit={handleSubmit}>
            <h1 className="text-center mb-4">Formulario de Citas</h1>
            <div className="mb-3">
                <label className="form-label">Nombre</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
                    <input className="form-control" type="text" name="nombre" value={formCita.nombre} ref={nombreRef} onChange={handleChange} placeholder="Ingrese su nombre" required/>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Doctor</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-capsule"></i></span>
                    <select ref={doctorRef} className="form-select" onChange={selectEspecialidad} name="doctor" required>
                        <option value="">Seleccionar Doctor</option>
                        {
                            doctores.map(doctor=>(
                                <option key={doctor.id} value={`${doctor.especialidad}, ${doctor.nombre}`}>{doctor.nombre}</option>
                            ))
                        }
                    </select>
                    <button className="btn btn-outline-secondary" onClick={() => recargarDoctores()}><i className="bi bi-arrow-clockwise"></i></button>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Especialidad</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-capsule"></i></span>
                    <input className="form-control" type="text" name="especialidad" value={formCita.especialidad} ref={especialidadRef} required disabled/>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Fecha</label>
                <div className="input-group">
                    <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                    <input className="form-control" type="date" name="fecha" value={formCita.fecha} ref={fechaRef} onChange={handleChange} required/>
                </div>
            </div>
            <button type="submit" className="btn btn-outline-secondary w-100">
                <i className="bi bi-send-fill"></i> Enviar
            </button>
        </form>
    )
}

export default AppointmentForm
