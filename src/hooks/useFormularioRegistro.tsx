import React, { useState } from "react"
import { createUsuario } from "../services/api"

const useFormularioRegistro = () => {
    const [formData, setFormData] = useState({
        dni: "",
        nombre: "",
        fechaNacimiento: "",
        genero: "",
        correo: "",
        clave: "",
        confirmarClave: "",
        rol: "",
        imagen: "",
        especialidad: "",
        aniosExp: 0,
        descripcion: ""
    })
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const validarFormulario = () => {
        if (!formData.dni || !formData.nombre || !formData.fechaNacimiento || !formData.genero || !formData.correo) {
            return "Todos los campos son obligatorios.";
        }
        if (formData.clave !== formData.confirmarClave) {
            return "Las claves no coinciden.";
        }
        if (formData.rol === "doctor") {
            formData.nombre = "Dr. " + formData.nombre
            if (!formData.especialidad || !formData.aniosExp || !formData.descripcion) {
                return "Los campos de doctor son obligatorios.";
            }
        }
        return "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const mensajeError = validarFormulario();
        if (mensajeError) {
            setError(mensajeError);
            return;
        }
        try {
            const {confirmarClave, ...usuarioSinConfirmarClave} = formData
            const token = localStorage.getItem('user')
            if(!token){
                setError("No se encontró un token válido. Inicia sesión de nuevo")
                return
            }
            await createUsuario(usuarioSinConfirmarClave, token)
            alert("Usuario registrado con éxito")
            setError("")
            setFormData({
                dni: "",
                nombre: "",
                fechaNacimiento: "",
                genero: "",
                correo: "",
                clave: "",
                confirmarClave: "",
                rol: "",
                imagen: "",
                especialidad: "",
                aniosExp: 0,
                descripcion: ""
            })
        } catch (err) {
            setError("Error al registrar usuario")
        }
    }

    return {
        formData, error, handleChange, handleSubmit
    }
}

export default useFormularioRegistro
