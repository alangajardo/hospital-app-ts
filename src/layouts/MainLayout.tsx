import React from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useAuth } from "../context/AuthContext"
import { IMainLayout } from "../interfaces/IMainLayout"

const MainLayout: React.FC<IMainLayout> = ({children}) => {
    const {user, logout} = useAuth()
    
    return (
        <React.Fragment>
            <Header user={user} logout={logout}/>
            <main>{children}</main>
            <Footer />
        </React.Fragment>
    )
}

export default MainLayout
