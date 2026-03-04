import { Link } from "react-router-dom"
import { RiShoppingBag3Line } from "react-icons/ri";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <Link className="navbar-brand fw-bold text-pink d-flex flex-row" to="/">
      <div className="logo-icon d-flex align-items-center justify-content-center me-2">
      <RiShoppingBag3Line />
      </div>
        kathyWool
      </Link>

      <div className="navbar-nav mx-auto">
        <Link className="nav-link" to="/">Inicio</Link>
        <Link className="nav-link" to="/products">Productos</Link>
        <Link className="nav-link" to="/contact">Contacto</Link>
      </div>

      <div className="d-flex gap-3">

        <Link className="btn" to="/login">
          Iniciar sesión
        </Link>

        <Link className="btn-primary" to="/register">
          Registrarse
        </Link>

      </div>

    </nav>
  )
}

export default Navbar