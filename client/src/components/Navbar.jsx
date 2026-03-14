import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useMemo } from "react"
import { useUser } from "../context/UserContext"
import { useAuth } from "../hooks/useAuth"
import { useCartTotals } from "../hooks/useCartTotals"

const optionsByRole = {
  admin: [
    { label: 'Admin', to: '/admin', icon: 'bi bi-gear', position: 'center' },
    { label: 'Perfil', to: '/admin/profile', icon: 'bi bi-person', field: 'name' }
  ],
  client: [
    { label: 'Perfil', to: '/user/profile', icon: 'bi bi-person', field: 'name' },
  ],
}

const mockAdmin = { name: 'Administrador', role: 'admin' };

function Navbar() {
  const { user, isAdmin, isLoggedIn } = useAuth()
  const { logout } = useUser()
  const { items, subtotal } = useCartTotals()

  const navigate = useNavigate()
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith('/admin')

  const options = useMemo(() => user ? (optionsByRole[user.role] || []) : [], [user]);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      
      {/* Logo Tienda KathyWool */}
      <NavLink className="navbar-brand fw-bold d-flex align-items-center" to="/">
        <i className="bi bi-shop me-2" aria-hidden></i>
        <h4>kathyWool</h4>
      </NavLink>

      {/* Menu Central */}
      <div className="navbar-nav mx-auto d-flex gap-4 align-items-center">
        <NavLink className = "nav-link" to="/"> Inicio </NavLink>
        <NavLink className = "nav-link" to="/products"> <i className="bi bi-grid-3x3" aria-hidden> </i> Productos </NavLink>
        <NavLink className = "nav-link" to="/contact">Contacto</NavLink>
      </div>

      {/* Menu derecho: carrito, inicio sesion, registro */}
      <div className="d-flex gap-4 align-items-center">
      
          {/* Menu derecho: carrito */}
          <NavLink
            className={`nav-link d-flex align-items-center gap-2 ${isAdmin ? "disabled opacity-50" : ""}`}
            to={isAdmin ? "#" : "/cart"}
            onClick={(e) => {if (isAdmin) e.preventDefault()}}
            title={isAdmin ? "Los administradores no pueden comprar" : ""}
          >
            <div className="position-relative">
              <i className="bi bi-cart fs-5"></i>
              {items > 0 && (
                <span className="cart-badge">
                  {items}
                </span>
              )}
            </div>

              {subtotal > 0 && (
              <span className="fw-bold">
                ${subtotal.toLocaleString('es-CL')}
              </span>
              )}

          </NavLink>

          {/* Menu derecho: inicio sesion */}
        {isLoggedIn ? (
          <>
            {options.map((option) => (
              <NavLink key={option.label} className = "nav-link" to={option.to}>
                <i className={`${option.icon} me-2`}></i>
                {option.field ? user[option.field] : option.label}
              </NavLink>
            ))}

          <button
            className="nav-link btn btn-link"
            onClick={() => { logout(); navigate("/"); }}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
              Salir
          </button>

        </>

        ) : (
        <>

          {/* Menu derecho: iniciar sesion y registro */}
            <NavLink className="btn" to="/login">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Iniciar sesión
            </NavLink>

            <NavLink className="btn-primary" to="/register">
              <i className="bi bi-person-plus me-2"></i>
              Registrarse
            </NavLink>
        </>
      )}
      </div>
    </nav>
  )
}

export default Navbar