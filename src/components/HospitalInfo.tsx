import HospitalInfoItem from "./HospitalInfoItem"

const HospitalInfo = () => {
    const hospitalInfo = [
        {title: "¡Bienvenido al Hospital Care!", descripcion: "Estamos aquí para cuidar de ti y tus seres queridos con compromiso, profesionalismo y calidez. Nuestro equipo de especialistas está preparado para brindarte la mejor atención, ya sea en situaciones de emergencia, consultas médicas o servicios especializados. Nos enorgullece ofrecer un entorno seguro y humano, centrado en tu bienestar y recuperación. ¡Gracias por confiar en nosotros!", atributo: "panelsStayOpen-collapseOne"},
        {title: "Misión", descripcion: "Brindar atención médica integral, oportuna y de calidad, comprometidos con la salud y el bienestar de nuestros pacientes. A través de un equipo humano altamente capacitado, tecnología avanzada y un enfoque centrado en la persona, buscamos mejorar la calidad de vida de la comunidad, promoviendo la prevención, el diagnóstico temprano y el tratamiento efectivo de enfermedades en un entorno de respeto, empatía y profesionalismo.", atributo: "panelsStayOpen-collapseTwo"},
        {title: "Visión", descripcion: "Ser un hospital de referencia en atención médica a nivel regional y nacional, reconocido por su excelencia, innovación y calidad humana. Aspiramos a liderar en el desarrollo de servicios de salud, combinando tecnología de vanguardia con un enfoque centrado en el paciente, promoviendo la investigación, la docencia y la mejora continua para contribuir al bienestar sostenible de la comunidad.", atributo: "panelsStayOpen-collapseThree"},
    ]

    return (
        <div className="accordion">
            {
                hospitalInfo.map((hi, index) => (
                    <HospitalInfoItem key={index} title={hi.title} descripcion={hi.descripcion} atributo={hi.atributo}/>
                ))
            }
        </div>
    )
}

export default HospitalInfo
