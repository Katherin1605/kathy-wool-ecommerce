import { RiShoppingBag3Line } from "react-icons/ri";

function Footer(){
  return(

    <footer className="footer">
<div className="d-flex flex-row align-items-center justify-content-around gap-3">
    <div>
    <div className="fw-bold d-flex flex-row" to="/">
      <div className="navbar-brand logo-icon d-flex align-items-center justify-content-center me-2">
      <RiShoppingBag3Line />
      </div>
        kathyWool
    </div>
      <div>
      <p>Tejidos artesanales con amor</p>
      </div>
    </div>
      <div>
      <p>© 2026 KathyWool. Todos los derechos reservados.</p>
      </div>
</div>
    </footer>

  )
}

export default Footer