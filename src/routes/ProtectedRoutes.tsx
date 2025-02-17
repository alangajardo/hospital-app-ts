import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import React from "react"
import { IProtectedRoutes } from "../interfaces/IProtectedRoutes"

const ProtectedRoutes: React.FC<IProtectedRoutes> = ({children, allowRoles}) => {
    const {user, isAuthenticated} = useAuth()

    if(user===undefined || user===null){
        return <p>No cuentas con los permisos suficientes, vuelve a la página principal <Link to="/">AQUÍ</Link></p>
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }

    if(!allowRoles.includes(user.rol)){
        return <Navigate to="/" replace/>
    }

    return children
}

export default ProtectedRoutes
