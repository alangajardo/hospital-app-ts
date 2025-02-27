import AppRoutes from "./routes/AppRoutes"
import "./App.css"
import { useEffect, useState } from "react"
import { addData, limpiarTabla, sincronizarData } from "./services/indexedDB"
import { IUsuario } from "./interfaces/IUsuario"
import { getServicios, getUsuarios } from "./services/api"
import { IServicio } from "./interfaces/IServicio"

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true))
    window.addEventListener('offline', () => setIsOnline(false))
    return () => {
      window.removeEventListener('online', () => setIsOnline(true))
      window.removeEventListener('offline', () => setIsOnline(false))
    }
  }, [])

  useEffect(() => {
    const syncData = async () => {
      if(isOnline){
        //falta enviarlos a la API de vuelta si se trabaja offline?
        await sincronizarData()
        
        const usuarios: IUsuario[] = await getUsuarios()
        const servicios: IServicio[] = await getServicios()

        limpiarTabla('usuarios')
        limpiarTabla('servicios')
        usuarios.forEach((usuario) => {addData('usuarios', usuario)})
        servicios.forEach((servicio) => addData('servicios', servicio))
      }else{
        console.log("Offline: usando datos de IndexedDB")
      }
    }
    syncData()
  }, [isOnline])

  return (
    <AppRoutes />
  )  
}

export default App
