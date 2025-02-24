import { useState } from "react"
import Modal from "./Modal"
import { IDoctor } from "../interfaces/IDoctor"

const DoctorCard: React.FC<IDoctor> = ({nombre, imagen, especialidad, aniosExp, descripcion}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <article className="col-sm-12 col-md-6 col-lg-3">
            <div className="card h-100">
                <img className="card-img-top equipo__img" src={`${import.meta.env.BASE_URL}${imagen}`} alt={nombre} />
                <div className="card-body">
                    <h5 className="card-title">
                        {nombre}
                    </h5>
                    <p className="card-text"><small className="text-body-secondary">{especialidad} ({aniosExp} años exp.)</small></p>
                    <button className='btn btn-outline-primary' onClick={() => setIsOpen(true) }>Ver Detalle</button>
                    {
                        isOpen && (
                            <Modal onClose={()=>setIsOpen(false)}>
                                <h3>{nombre}</h3>
                                <p>Especialidad: {especialidad}</p>
                                <p>{descripcion}</p>
                            </Modal>
                        )
                    }
                </div>
            </div>
        </article>
    )
}

export default DoctorCard
