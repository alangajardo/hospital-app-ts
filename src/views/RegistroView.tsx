import React, { useState } from "react"
import MainLayout from "../layouts/MainLayout"
import RegistroForm from "../components/RegistroForm"
import { createUsuario } from "../services/api"

const RegistroView = () => {
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        dni: "",
        nombre: "",
        fechaNacimiento: "",
        genero: "",
        correo: "",
        clave: "",
        confirmarClave: "",
        rol: "paciente"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(formData.clave != formData.confirmarClave){
            setError("Las claves no coinciden!")
            return
        }
        try {
            const {confirmarClave, ...usuarioSinConfirmarClave} = formData
            const token = localStorage.getItem('user')
            if(!token){
                setError("No se encontró un token válido. Inicia sesión de nuevo")
                return
            }
            await createUsuario(usuarioSinConfirmarClave, token)
            alert("Paciente registrado con éxito")
            setError("")
            setFormData({
                dni: "",
                nombre: "",
                fechaNacimiento: "",
                genero: "",
                correo: "",
                clave: "",
                confirmarClave: "",
                rol: ""
            })
        } catch (err) {
            setError("Error al registrar paciente")
        }
    }

    return (
        <MainLayout>
            <h2 className="text-center mt-3 mb-4">Registro de paciente</h2>
            <RegistroForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
            {error && <p className="text-danger text-center">{error}</p>}
        </MainLayout>
    )
}

export default RegistroView
