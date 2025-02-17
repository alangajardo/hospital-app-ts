import React from "react";
import { IUsuario } from "./IUsuario";

export interface IAdmEquipoForm {
    formData: IUsuario;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}