import React from "react"
import { IRegistroForm } from "../interfaces/IRegistroForm"

const RegistroForm: React.FC<IRegistroForm> = ({formData, handleChange, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
            <div className="mb-3">
                <label className="form-label" htmlFor="dni">DNI</label>
                <input className="form-control" type="text" name="dni" value={formData.dni} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="nombre">Nombre completo</label>
                <input className="form-control" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="fechaNacimiento">Fecha nacimiento</label>
                <input className="form-control" type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="genero">Género</label>
                <select className="form-select" name="genero" value={formData.genero} onChange={handleChange} required>
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="correo">Correo</label>
                <input className="form-control" type="email" name="correo" value={formData.correo} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="clave">Clave</label>
                <input className="form-control" type="password" name="clave" value={formData.clave} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="confirmarClave">Confirmar clave</label>
                <input className="form-control" type="password" name="confirmarClave" value={formData.confirmarClave} onChange={handleChange} required/>
            </div>
            <button className="btn btn-primary w-100" type="submit">Registrar</button>
        </form>
    )
}

export default RegistroForm
