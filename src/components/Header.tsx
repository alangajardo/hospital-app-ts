import React, { useMemo } from "react"
import MenuItem from "./MenuItem";
import { IHeader } from "../interfaces/IHeader";

const Header: React.FC<IHeader> = ({user, logout}) => {
    const views = useMemo(() => [
        { view: "", text: "Home", condition: true },
        { view: "citas", text: "Citas", condition: user?.rol==='paciente' },
        { view: "equipo", text: "Equipo", condition: true },
        { view: "login", text: "Login", condition: user===null || user===undefined },
        { view: "registro", text: "Registro", condition: user===null || user===undefined },
        { view: "reservas", text: "Reservas", condition: user && (user?.rol==="doctor" || user?.rol==="admin") },
        { view: "adm-equipo", text: "Adm. Equipo", condition: user?.rol==="admin" },
        { view: "logout", text: "Logout", condition: !!user },
    ], [user])

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
                <div className="container-fluid">
                    <img className="navbar-brand menu-style" src="assets/logo.png" alt="logo hospital" />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {views.filter((view) => view.condition).map((view, index) => (
                                <MenuItem key={index} view={view.view} text={view.text} logout={view.view === "logout" ? logout : undefined} />
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
