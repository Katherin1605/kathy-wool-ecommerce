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
                    <h3>Total productos</h3>
                    <p>{metrics.totalProducts}</p>
                </div>

                <div className="metric-card">
                    <h3>Stock Total</h3>
                    <p>{metrics.totalStock}</p>
                </div>

                <div className="metric-card">
                    <h3>Valor Inventario</h3>
                    <p>${metrics.inventoryValue}</p>
                </div>

                <div className="metric-card">
                    <h3>Stock Bajo</h3>
                    <p>{metrics.lowStock}</p>
                </div>

            </div>

            <div className="search">
                <div className="input-group flex-nowrap">
                    <input type="text" className="form-control" placeholder=" 🔍 Buscar productos..."/>
                </div>
                <div className="actions">
                    <button className="btn btn-primary"><i class="bi bi-plus-lg"></i> Agregar Producto</button>
                </div>
            </div>

            {/* <Products /> */}

        </div>
    )
}

export default AdminDashboard