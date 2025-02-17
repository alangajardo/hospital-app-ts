import AppointmentForm from "../components/AppointmentForm"
import { ICita } from "../interfaces/ICita"
import MainLayout from "../layouts/MainLayout"
import { createCita } from "../services/api"

const CitasView = () => {
    const submitForm = async (data: ICita) => {
        try {
            const response = await createCita(data)
            if(response){
                alert("Cita agendada con éxito!")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <MainLayout>
            <AppointmentForm submitForm={submitForm}/>
        </MainLayout>
    )
}

export default CitasView
