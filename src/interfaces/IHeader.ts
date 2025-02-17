import { IUsuario } from "./IUsuario";

export interface IHeader {
    user: IUsuario | null;
    logout: () => void
}