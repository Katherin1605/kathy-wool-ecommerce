import { useMemo } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"
import { useCart } from "../context/CartContext"

const optionsByRole = {
  Administrador: [
    { label: 'Admin', to: '/admin', icon: 'bi bi-gear', position: 'center' },
    { label: 'Perfil', to: '/admin/profile', icon: 'bi bi-person', field: 'name' }
  ],
  Cliente: [
    { label: '', to: '/cart', icon: 'bi bi-cart', badge: true },
    { label: 'Perfil', to: '/user/profile', icon: 'bi bi-person', field: 'name' },
  ],
}

const _user = {
  role: 'user',
  name: 'Juan Perez'
}

const userAdmin = {
  role: 'admin',
  name: 'Administrador'
}

function Navbar() {
  const { token, getProfile, logout } = useUser();
  const navigate = useNavigate();
  const { cart } = useCart();
  const user = getProfile();
  const options = useMemo(() => !!user ? (optionsByRole[user.role] || []) : [], [user]);
  const isLoggedIn = useMemo(() => !!token, [token]);
  const mainOptions = useMemo(() => options.filter((option) => option.position === 'center'), [options]);
  const rightOptions = useMemo(() => options.filter((option) => option.position !== 'center'), [options]);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <NavLink className="navbar-brand fw-bold d-flex flex-row flex-start" to="/">
        <div className="logo-icon d-flex align-items-center justify-content-center me-2">
          <i className="bi bi-shop" aria-hidden></i>
        </div>
        <h4>kathyWool</h4>
      </NavLink>
      <div className="navbar-nav mx-auto d-flex gap-4 align-items-center">
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/">Inicio</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/products"><i className="bi bi-grid-3x3" aria-hidden></i> Productos</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/contact">Contacto</NavLink>
        {mainOptions.map((option) => (
          <NavLink key={option.label} className={({ isActive }) => isActive ? 'active' : 'nav-link'} to={option.to}>
            <i className={`${option.icon} me-2`}></i>
            {option.field ? user[option.field] : option.label}
          </NavLink>
        ))}
      </div>
      {
        isLoggedIn ? <ul className="navbar-nav d-flex gap-4 align-items-center">
          {rightOptions.map((option) => (
            <li key={option.label}>
              <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to={option.to}>
                <i className={`${option.icon} me-2`}></i>
                {option.field ? user[option.field] : option.label}
                {option.badge && (
                <span className="cart-badge">{cart.length}</span>
                )}
              </NavLink>
            </li>
          ))}
          <li>
            <li>
              <button
                className="nav-link btn btn-link"
                onClick={() => { logout(); navigate("/"); }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Salir
              </button>
            </li>
          </li>
        </ul>
          : <div className="d-flex gap-3 align-items-center">
            <NavLink className="btn" to="/login">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Iniciar sesión
            </NavLink>
            <NavLink className="btn-primary" to="/register">
              <i className="bi bi-person-plus me-2"></i>
              Registrarse
            </NavLink>
          </div>
      }
    </nav>
  )
}

export default Navbar