import CryptoJS from 'crypto-js'
import { IUsuario } from '../interfaces/IUsuario'

const SECRET_KEY = "hospital_care_secret_key"

export const encryptData = (data: IUsuario) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString()
}

export const decryptData = (data: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } catch (error) {
        console.log("Error al desencriptar datos",error)
    }
}
