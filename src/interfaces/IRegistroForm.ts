import React from "react";
import { IUsuario } from "./IUsuario";

export interface IRegistroForm{
    formData: IUsuario;
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}