import AdmEquipoForm from "../components/AdmEquipoForm"
import MainLayout from "../layouts/MainLayout"
import UsuariosList from "../components/UsuariosList"
import useFormularioRegistro from "../hooks/useFormularioRegistro"

const AdmEquipoView = () => {
    const {formData, error, handleChange, handleSubmit} = useFormularioRegistro()

    return (
        <MainLayout>
            <h2 className="text-center mt-3 mb-4">Administrar equipo</h2>
            <AdmEquipoForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
            {error && <p className="text-danger text-center">{error}</p>}
            <UsuariosList />
        </MainLayout>
    )
}

export default AdmEquipoView
