import axios from 'axios'
import CryptoJS from 'crypto-js'
import { IUsuario } from '../interfaces/IUsuario'
import { ICita } from '../interfaces/ICita'

const URL_BASE = "http://localhost:5050"
const SECRET_KEY = "hospital_care_secret_key"

//DOCTORES:
export const getUsuarios = async () => {
    const response = await axios.get(`${URL_BASE}/usuarios`)
    const usuariosDesencriptados = response.data.map((usuario: IUsuario) => ({
        ...usuario,
        clave: CryptoJS.AES.decrypt(usuario.clave, SECRET_KEY).toString(CryptoJS.enc.Utf8)})
    )
    return usuariosDesencriptados
}

export const createUsuario = async (usuario: IUsuario, token: string) => {
    const usuarioEncriptado = {
        ...usuario,
        clave: CryptoJS.AES.encrypt(usuario.clave, SECRET_KEY).toString()
    }
    const response = await axios.post(`${URL_BASE}/usuarios`, usuarioEncriptado, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const deleteUsuario = async (id: string, token: string) => {
    const response = await axios.delete(`${URL_BASE}/usuarios/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

//CITAS
export const getCitas = async (token: string) => {
    const response = await axios.get(`${URL_BASE}/citas`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

export const createCita = async (cita: ICita) => {
    const response = await axios.post(`${URL_BASE}/citas`, cita)
    return response.data
}

export const deleteCita = async (id: string, token: string) => {
    const response = await axios.delete(`${URL_BASE}/citas/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}

//SERVICIOS
export const getServicios = async () => {
    const response = await axios.get(`${URL_BASE}/servicios`)
    return response.data
}
