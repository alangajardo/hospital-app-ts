import { IUsuario } from "./IUsuario";

export interface IAuthContextType{
    user: IUsuario | null;
    login: (usuario: IUsuario) => void;
    logout: () => void;
    isAuthenticated: boolean;
}