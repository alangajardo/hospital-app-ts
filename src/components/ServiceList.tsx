import React from "react";
import { IServiceList } from "../interfaces/IServiceList";

const ServiceList: React.FC<IServiceList> = ({servicios}) => {
    return (
        <section>
            <div id="carousel" className="carousel carousel-dark slide">
                <div className="carousel-inner" id="carousel-servicios">
                    {
                        servicios.map((servicio, index) => (
                            <div key={servicio.id} className={`carousel-item ${index==0 ? 'active': ''}`}>
                                <article>
                                    <img className="d-block w-100 servicio__img" src={`${import.meta.env.BASE_URL}${servicio.img}`} alt={servicio.nombre}/>
                                    <div className="carousel-caption d-md-block servicio__parrafo">
                                        <h4><b>{servicio.nombre}</b></h4>
                                        <p>{servicio.descripcion}</p>
                                    </div>
                                </article>
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </section>
    )
}

export default ServiceList
