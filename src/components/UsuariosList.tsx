import { useEffect, useState } from "react"
import { deleteUsuario, getUsuarios } from "../services/api"
import { IUsuario } from "../interfaces/IUsuario"

const UsuariosList = () => {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsuarios()
                setUsuarios(data.filter((usu: IUsuario) => usu.rol!=='admin'))
            } catch (error) {
                setError(error+"")
            }
        }
        fetchUsers()
    }, [])

    const handleDelete = async (id: string | undefined) => {
        if(id){
            const confirmacion = window.confirm("¿Está seguro de eliminar a este usuario?")
            if(!confirmacion) return
    
            try {
                const token = localStorage.getItem('user')
                if(!token){
                    setError("No se encontró un token válido. Inicia sesión de nuevo")
                    return
                }
                await deleteUsuario(id, token)
                setUsuarios(usuarios.filter((usuario: IUsuario) => usuario.id!==id))
            } catch (error) {
                alert("Error al eliminar al usuario, intenelo nuevamente más tarde")
            }
        }
    }

    if(error) return <p>{error}</p>

    return (
        <ul className="list-group mt-3 p-3">
            {usuarios.map((usuario: IUsuario) => (
                <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-action" key={usuario.id}>
                    <span className="m-2">{usuario.nombre} ({usuario.rol}) </span>
                    <span>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                    </span>
                </li>
            ))}
        </ul>
    )
}

export default UsuariosList
