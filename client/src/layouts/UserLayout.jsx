import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

function UserLayout() {
  return (
    <div className="user-layout">
      <Navbar />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default UserLayout