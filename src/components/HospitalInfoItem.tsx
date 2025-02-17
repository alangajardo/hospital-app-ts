import React from "react";
import { IHospitalInfoItem } from "../interfaces/IHospitalInfoItem";

const HospitalInfoItem: React.FC<IHospitalInfoItem> = ({title, descripcion, atributo}) => {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#panelsStayOpen-${atributo}`} aria-expanded="false" aria-controls={`panelsStayOpen-${atributo}`}>
                    <strong>{title}</strong>
                </button>
            </h2>
            <div id={`panelsStayOpen-${atributo}`} className="accordion-collapse collapse">
                <div className="accordion-body">
                    <p className="">{descripcion}</p>
                </div>
            </div>
        </div>
    )
}

export default HospitalInfoItem
