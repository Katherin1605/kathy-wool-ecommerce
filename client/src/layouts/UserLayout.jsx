import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"

function UserLayout() {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default UserLayout