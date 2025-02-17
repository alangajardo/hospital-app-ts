import React, { createContext, useContext, useEffect, useState } from "react";
import { decryptData, encryptData } from "../util/encryption";
import { IUsuario } from "../interfaces/IUsuario";
import { IAuthProvider } from "../interfaces/IAuthProvider";
import { IAuthContextType } from "../interfaces/IAuthContextType";

const AuthContext = createContext<IAuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<IAuthProvider> = ({children}) => {
    const [user, setUser] = useState<IUsuario | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(storedUser){
            const decryptedUser = decryptData(storedUser)
            setUser(decryptedUser)
        }
        setLoading(false)
    }, [])

    const login = (usuario: IUsuario) => {
        const encryptedUser = encryptData(usuario)
        localStorage.setItem('user', encryptedUser)
        setUser(usuario)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const value = {
        user, login, logout, isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={value} >
            {!loading ? children : <p>Cargando...</p>}
        </AuthContext.Provider>
    )
}

export const useAuth = (): IAuthContextType => {
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("UseAuth debe estar dentro de AuthProvider")
    }
    return context
}