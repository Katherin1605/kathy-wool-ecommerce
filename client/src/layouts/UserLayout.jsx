import { Outlet } from "react-router-dom"

function UserLayout(){

  return(

    <div className="user-layout">

      <aside className="user-sidebar">

        <h3>Mi cuenta</h3>

        <ul>
          <li>Perfil</li>
          <li>Mis pedidos</li>
          <li>Favoritos</li>
        </ul>

      </aside>

      <main className="user-content">
        <Outlet/>
      </main>

    </div>

  )

}

export default UserLayout