import React, { useEffect, useState } from "react"
import { createUsuario } from "../services/api"
import { IUsuario } from "../interfaces/IUsuario"

const useFormularioRegistro = () => {
    const [formData, setFormData] = useState<IUsuario>({
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
        descripcion: "",
        latLong: {lat: 0, long: 0}
    })
    const [error, setError] = useState("")

    useEffect(() => {
        const getLocation = () => {
            if("geolocation" in navigator){
                navigator.geolocation.getCurrentPosition((position) => {
                    setFormData({...formData, latLong: {lat: position.coords.latitude, long: position.coords.longitude}})
                }, (error) => {
                  console.log("Error obteniendo la ubicación: ", error)
                })
              }else{
                console.log("La geolocación no está disponible en este navegador.")
              }
        }
        getLocation()
    }, [])

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const file = e.target.files[0]
            if(file){
                const reader = new FileReader()
                reader.onloadend = () => {
                    setFormData({...formData, imagen: reader.result as string | undefined})
                }
                reader.readAsDataURL(file)
            }
        }
    }

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
                descripcion: "",
                latLong: {lat: 0, long: 0}
            })
        } catch (err) {
            setError("Error al registrar usuario")
        }
    }

    return {
        formData, error, handleChange, handleCapture, handleSubmit
    }
}

export default useFormularioRegistro
