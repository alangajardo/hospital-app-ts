import axios from 'axios'
import { openDB } from 'idb'
import CryptoJS from 'crypto-js'
import { IUsuario } from '../interfaces/IUsuario'

//Inicializa la base de datos
const initDB = async () => {
    return openDB('baseDatosHospital', 1, {
        upgrade(db) {
            if(!db.objectStoreNames.contains('usuarios')){
                db.createObjectStore('usuarios', {keyPath: 'id', autoIncrement: true})
            }
            if(!db.objectStoreNames.contains('citas')){
                db.createObjectStore('citas', {keyPath: 'id', autoIncrement: true})
            }
            if(!db.objectStoreNames.contains('servicios')){
                db.createObjectStore('servicios', {keyPath: 'id', autoIncrement: true})
            }
            if(!db.objectStoreNames.contains('pendiente')){
                db.createObjectStore('pendiente', {keyPath: 'id', autoIncrement: true})
            }
        }
    })
}

//Función para agregar datos:
const SECRET_KEY = "hospital_care_secret_key"
export const addData = async (nombreTabla: string, data: {}) => {
    const db = await initDB()
    if(nombreTabla==='usuarios'){
        const usuario = data as IUsuario;
        data = {
            ...usuario,
            clave: CryptoJS.AES.encrypt(usuario.clave, SECRET_KEY).toString()
        }
    }
    return db.add(nombreTabla, data)
}

//Función para obtener datos:
export const getAllData = async (nombreTabla: string) => {
    const db = await initDB()
    return db.getAll(nombreTabla)
}

//Función para eliminar datos:
export const deleteData = async (nombreTabla: string, id: string) => {
    const db = await initDB()
    return db.delete(nombreTabla, id)
}

//sincronizar:
const URL_BASE = "http://localhost:5050"
export const sincronizarData = async () => {
    const syncData = await getAllData('pendiente');

    for (const item of syncData) {
        try {
            if(item.table=='usuarios' && item.action=='post'){
                const response = await axios.get(`${URL_BASE}/usuarios?dni=${item.data.dni}`);
            
                if (response.data.length === 0) {
                    await axios.post(`${URL_BASE}/usuarios`, item.data);
                }
            } else if (item.table==='usuarios' && item.action === 'delete') {
                await axios.delete(`${URL_BASE}/${item.table}/${item.data.id}`, {
                    headers: item.token ? { Authorization: `Bearer ${item.token}` } : {}
                });
            }else if (item.action === 'post' && (item.table==='citas' || item.table==='servicios')) {
                await axios.post(`${URL_BASE}/${item.table}`, item.data, {
                    headers: item.token ? { Authorization: `Bearer ${item.token}` } : {}
                });
            } else if (item.action === 'delete' && (item.table==='citas' || item.table==='servicios')) {
                await axios.delete(`${URL_BASE}/${item.table}/${item.data.id}`, {
                    headers: item.token ? { Authorization: `Bearer ${item.token}` } : {}
                });
            }

            await deleteData('pendiente', item.id);
        } catch (error) {
            console.log(`Error sincronizando ${item.table}:`, error);
        }
    }
}

export const limpiarTabla = async (nombreTabla: string) => {
    const db = await initDB()
    return db.clear(nombreTabla)
}
