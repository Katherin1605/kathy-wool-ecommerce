import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <Link className="navbar-brand fw-bold text-pink" to="/">
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