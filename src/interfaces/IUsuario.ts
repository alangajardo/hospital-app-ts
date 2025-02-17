export interface IUsuario {
    id?: string;
    dni: string;
    nombre: string;
    fechaNacimiento: string;
    genero: string;
    correo: string;
    clave: string;
    confirmarClave?: string;
    rol: string;
    imagen?: string;
    especialidad?: string;
    aniosExp?: number;
    descripcion?:string;
}