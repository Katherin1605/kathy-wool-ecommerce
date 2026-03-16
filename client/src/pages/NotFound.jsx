import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notfound-container container text-center mt-5">
        
            <img
                src="/notfound.png"
                alt="Página no encontrada"
                className="notfound-img"
            />

            <h1 className="notfound-title">404</h1>

            <h3 className="mb-3">¡Ups! Parece que nuestro gato se enredó con el ovillo
                y no encontramos la página que buscas
            </h3>

            <p className="notfound-text mb-4">
                Puede que el producto o la página que buscas haya sido movida o eliminada.
            </p>

            <div className="d-flex gap-3 justify-content-center flex-wrap">

                <Link to="/" className="btn btn-dark">
                <i className="fas fa-home me-2"></i>
                Volver al inicio
                </Link>

                <Link to="/products" className="btn btn-outline-dark">
                <i className="fas fa-scroll me-2"></i>
                Ver productos
                </Link>

                <Link to="/contact" className="btn btn-outline-dark">
                <i className="fas fa-phone me-2"></i>
                Contacto
                </Link>

            </div>

        </div>
    );
};

export default NotFound;