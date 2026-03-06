import { NavLink } from "react-router-dom"


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <NavLink className="navbar-brand fw-bold text-pink d-flex flex-row flex-start" to="/">
      <div className="logo-icon d-flex align-items-center justify-content-center me-2">
      <i class="bi bi-shop"></i>
      </div>
        <h4>kathyWool</h4>
      </NavLink>

      <div className="navbar-nav mx-auto d-flex gap-4 align-items-center">
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/">Inicio</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/products">Productos</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/contact">Contacto</NavLink>
      </div>

      <div className="d-flex gap-3 align-items-center">

        <NavLink className="btn" to="/login">
          Iniciar sesión
        </NavLink>

        <NavLink className="btn-primary" to="/register">
          Registrarse
        </NavLink>

      </div>

    </nav>
  )
}

export default Navbar