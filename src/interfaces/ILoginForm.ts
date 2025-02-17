import { ILoginData } from "./ILoginData";

export interface ILoginForm {
    formData: ILoginData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}