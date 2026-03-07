// import Products from "../../components/Products"

function AdminDashboard() {

    const metrics = {
        totalProducts: 5,
        totalStock: 58,
        inventoryValue: 1710,
        lowStock: 1
    }

    return (
        <div className="m-3">

            <h1><i className="bi bi-gear"></i> Panel de Administración</h1>
            <p>Gestiona tu inventario y productos</p>

            <div className="admin-metrics">

                <div className="metric-card">
                <div>
                    <h3>Total productos</h3>
                    <p>{metrics.totalProducts}</p>
                </div>
                <div className="metric-icon">
                    <i className="bi bi-box-seam"></i>
                </div>

                </div>

                <div className="metric-card">
                <div>
                    <h3>Stock Total</h3>
                    <p>{metrics.totalStock}</p>
                </div>
                <div className="metric-icon">
                    <i className="bi bi-graph-up-arrow"></i>
                </div>
                </div>

                <div className="metric-card">
                <div>
                    <h3>Valor Inventario</h3>
                    <p>${metrics.inventoryValue}</p>
                </div>
                <div className="metric-icon">
                    <i className="bi bi-currency-dollar"></i>
                </div>
                </div>

                <div className="metric-card">
                <div>
                    <h3>Stock Bajo</h3>
                    <p>{metrics.lowStock}</p>
                </div>
                <div className="metric-icon">
                    <i className="bi bi-exclamation-circle"></i>
                </div>
                </div>

            </div>

            <div className="search">
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control" placeholder=" 🔍  Buscar productos..."/>
                </div>
                <div className="actions">
                    <button className="btn-primary"><i className="bi bi-plus-lg"></i> Agregar Producto</button>
                </div>
            </div>

            {/* <Products /> */}

        </div>
    )
}

export default AdminDashboard