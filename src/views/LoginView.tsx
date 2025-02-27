import React, { useState } from "react"
import LoginForm from "../components/LoginForm"
import MainLayout from "../layouts/MainLayout"
import { getUsuarios } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { IUsuario } from "../interfaces/IUsuario"
import { ILoginData } from "../interfaces/ILoginData"

const LoginView =  () => {
    const {login} = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState<ILoginData>({correo: "", clave: ""})
    const [error, setError] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const usuarios = await getUsuarios()
            console.log(usuarios)
            const usuarioEncontrado = usuarios.find((user: IUsuario) => user.correo==formData.correo && user.clave==formData.clave)
            if(usuarioEncontrado){
                login(usuarioEncontrado)
                navigate("/")
            }else{
                alert("Usuario o clave incorrectos!")
            }
        } catch (error) {
            setError("Error al rescatar datos")
        }

    }

    return (
        <MainLayout>
            <h2 className="text-center mt-3 mb-4">Login</h2>
            <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
            {error && <p className="text-danger text-center"></p>}
        </MainLayout>
    )
}

export default LoginView
