import { NavLink } from "react-router-dom"

function AdminSidebar(){

  return(

    <aside className="admin-sidebar">

        <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">

      <NavLink className="navbar-brand fw-bold text-pink d-flex flex-row flex-start" to="/">
      <div className="logo-icon d-flex align-items-center justify-content-center me-2">
      <i class="bi bi-shop"></i>
      </div>
        <h4>kathyWool</h4>
      </NavLink>

      <div className="navbar-nav mx-auto d-flex flex-row gap-4 justify-content-center align-items-center">

        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/">Inicio</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/admin/products"><i class="bi bi-grid-3x3"></i> Productos</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/admin/orders"> Pedidos</NavLink>
        <NavLink className={({ isActive }) => isActive ? 'active' : 'nav-link'} to="/admin"><i class="bi bi-gear"></i> Admin</NavLink>
        </div>

      <div className="d-flex gap-3 align-items-center">

        <NavLink className="btn" to="/admin-profile">
          <i class="bi bi-person"></i>  Administrador
        </NavLink>

        <NavLink className="btn" to="/">
        <i class="bi bi-box-arrow-right"></i>  Salir 
        </NavLink>

      </div>

    </nav>

    </aside>

  )

}

export default AdminSidebar