const Footer = () => {
    return (
        <footer className="bg-body-tertiary">
            <div className="">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 d-flex flex-column justify-content-start text-center my-4">
                        <img src="assets/logo.png" alt="logo" className="img-fluid mx-auto logo-style" />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 d-flex flex-column justify-content-start text-center my-4">
                        <h2><strong>Sobre nosotros</strong></h2>
                        <a href="#" className="footer-link">Quienes Somos</a>
                        <a href="https://www.gob.cl/ministerios/ministerio-de-salud/" className="footer-link">Ministerio de Salud</a>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 d-flex flex-column justify-content-start text-center my-4">
                        <h2><strong>Contacto</strong></h2>
                        <span>Teléfono contacto: <a href="" className="footer-link">+569 9999 9999</a></span>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 d-flex flex-column justify-content-start text-center my-4">
                        <h2><strong>Redes sociales</strong></h2>
                        <a href="#" className="footer-link">
                            <img src="assets/instagram.png" alt="instagram" /> Instagram
                        </a>
                        <a href="#" className="footer-link">
                            <img src="assets/tik-tok.png" alt="tik-tok" /> Tik tok
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
