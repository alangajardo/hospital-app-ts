import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import ProtectedRoutes from "./ProtectedRoutes"
import CitasView from "../views/CitasView"
import EquipoView from "../views/EquipoView"
import HomeView from "../views/HomeView"
import LoginView from "../views/LoginView"
import RegistroView from "../views/RegistroView"
import ReservasView from "../views/ReservasView"
import AdmEquipoView from "../views/AdmEquipoView"

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/citas" element={
                        <ProtectedRoutes allowRoles={['paciente']}>
                            <CitasView />
                        </ProtectedRoutes>
                    }/>
                    <Route path="/equipo" element={  <EquipoView /> }/>
                    <Route path="/" element={ <HomeView /> }/>
                    <Route path="/login" element={ <LoginView /> }/>
                    <Route path="/registro" element={ <RegistroView /> }/>
                    <Route path="/reservas" element={
                        <ProtectedRoutes allowRoles={['doctor', 'admin']}>
                            <ReservasView />
                        </ProtectedRoutes>
                    }/>
                    <Route path="/adm-equipo" element={
                        <ProtectedRoutes allowRoles={['admin']}>
                            <AdmEquipoView />
                        </ProtectedRoutes>
                    }/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default AppRoutes
