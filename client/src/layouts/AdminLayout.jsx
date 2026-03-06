import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar"
import Footer from "../components/Footer"

function AdminLayout(){

  return(

    <div className="admin-layout">

      <AdminSidebar/>

      <main className="admin-content">

        <Outlet/>

      </main>

      <Footer/>

    </div>

  )

}

export default AdminLayout