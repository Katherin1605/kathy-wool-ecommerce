import { Outlet, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useAuth } from "../hooks/useAuth"

function AdminLayout(){
  const { isLoggedIn, isAdmin } = useAuth()

  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />

  return(

    <div className="admin-layout">

      <Navbar />

      <main className="admin-content">

        <Outlet/>

      </main>

      <Footer/>

    </div>

  )

}

export default AdminLayout