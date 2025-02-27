import axios from 'axios'
import CryptoJS from 'crypto-js'
import { IUsuario } from '../interfaces/IUsuario'
import { ICita } from '../interfaces/ICita'
import { addData, deleteData, getAllData } from './indexedDB'

const URL_BASE = "http://localhost:5050"
const SECRET_KEY = "hospital_care_secret_key"

//DOCTORES:
export const getUsuarios = async () => {
    const getUsuariosDesencriptados = (usuarios: IUsuario[]) => usuarios.map((usuario: IUsuario) => ({
        ...usuario,
        clave: CryptoJS.AES.decrypt(usuario.clave, SECRET_KEY).toString(CryptoJS.enc.Utf8)
    }));

    if(navigator.onLine){
        try {
            const responseAPI = await axios.get(`${URL_BASE}/usuarios`);
            return getUsuariosDesencriptados(responseAPI.data);
        } catch (error) {
            console.log("No hay conexión a la API: ", error);
        }
    }
    const responseDB = await getAllData('usuarios');
    return getUsuariosDesencriptados(responseDB);
}

export const createUsuario = async (usuario: IUsuario, token: string) => {
    const usuarioEncriptado = {
        ...usuario,
        clave: CryptoJS.AES.encrypt(usuario.clave, SECRET_KEY).toString()
    }

    const responseDB = await addData('usuarios',usuarioEncriptado)
    if(navigator.onLine){
        try {
            await axios.post(`${URL_BASE}/usuarios`, usuarioEncriptado, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })    
        } catch (error) {
            console.log("No hay conexión a la API: ", error)
            await addData('pendiente', {action: 'post', table:'usuarios', data: usuarioEncriptado, token})
        }
    }else{
        await addData('pendiente', {action: 'post', table:'usuarios', data: usuarioEncriptado, token})
    }
    return responseDB
}

export const createPaciente = async (usuario: IUsuario) => {
    const usuarioEncriptado = {
        ...usuario,
        clave: CryptoJS.AES.encrypt(usuario.clave, SECRET_KEY).toString()
    }

    const responseDB = await addData('usuarios',usuarioEncriptado)
    if(navigator.onLine){
        try {
            await axios.post(`${URL_BASE}/usuarios`, usuarioEncriptado)
        } catch (error) {
            console.log("No hay conexión a la API: ", error)
            await addData('pendiente', {action: 'post', table:'usuarios', data: usuarioEncriptado})
        }
    }else{
        await addData('pendiente', {action: 'post', table:'usuarios', data: usuarioEncriptado})
    }
    return responseDB
}

export const deleteUsuario = async (id: string, token: string) => {
    const responseDB = await deleteData('usuarios', id)
    
    if(navigator.onLine){
        try {
            await axios.delete(`${URL_BASE}/usuarios/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log("No hay conexión a la API: ", error)
            await addData('pendiente', {action: 'delete', table:'usuarios', data: id, token})
        }
    }else{
        //debo almacenarlo en el que se sincronizará después:
        await addData('pendiente', {action: 'delete', table:'usuarios', data: id, token})
    }
    return responseDB
}

//CITAS
export const getCitas = async (token: string) => {
    if(navigator.onLine){
        try {
            const responseAPI = await axios.get(`${URL_BASE}/citas`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return responseAPI.data;
        } catch (error) {
            console.log("No hay conexión a la API: ", error);
        }
    }
    return await getAllData('citas')
}

export const createCita = async (cita: ICita) => {
    const responseDB = await addData('citas', cita)
    if(navigator.onLine){
        try {
            await axios.post(`${URL_BASE}/citas`, cita)
        } catch (error) {
            console.log("No hay conexión a la API: ", error)    
        }
    }else{
        await addData('pendiente', {action: 'post', table:'citas', data: cita})
    }
    return responseDB
}

export const deleteCita = async (id: string, token: string) => {
    const responseDB = await deleteData('citas', id)
    if(navigator.onLine){
        try {
            await axios.delete(`${URL_BASE}/citas/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log("No hay conexión a la API: ", error)   
            await addData('pendiente', {action: 'delete', table:'citas', data: id})
        }
    }else{
        await addData('pendiente', {action: 'delete', table:'citas', data: id})
    }
    return responseDB
}

//SERVICIOS
export const getServicios = async () => {
    if(navigator.onLine){
        try {
            const responseAPI = await axios.get(`${URL_BASE}/servicios`);
            return responseAPI.data;
        } catch (error) {
            console.log("No hay conexión a la API: ", error);
        }
    }
    return await getAllData('servicios')
}
