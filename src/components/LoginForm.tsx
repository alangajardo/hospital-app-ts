import React from "react"
import { ILoginForm } from "../interfaces/ILoginForm"

const LoginForm: React.FC<ILoginForm> = ({formData, handleChange, handleSubmit}) => {
    return (
        <form className="p-4 border rounded bg-light m-4" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label" htmlFor="correo">Correo</label>
                <input className="form-control" type="email" name="correo" value={formData.correo} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="clave">Clave</label>
                <input className="form-control" type="password" name="clave" value={formData.clave} onChange={handleChange} required/>
            </div>
            <button className="btn btn-primary w-100" type="submit">Ingresar</button>
        </form>
    )
}

export default LoginForm
