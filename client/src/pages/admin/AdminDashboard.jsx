import { useState } from "react"
import AdminProducts from "./AdminProducts"

const initialForm = {
    name: "",
    price: 0,
    stock: 0,
    category: "",
    description: "",
    status: "Activo",
}

function AdminDashboard() {

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Amigurumi Conejito Rosa",
            category: "Amigurumi",
            price: 25,
            stock: 12,
            status: "Activo"
        },
        {
            id: 2,
            name: "Bufanda de Lana Suave",
            category: "Bufandas",
            price: 35,
            stock: 8,
            status: "Activo"
        }
    ])

    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSave = (e) => {
        e.preventDefault()
        if (!form.name || !form.category) return

        const newProduct = {
            ...form,
            id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
            price: Number(form.price),
            stock: Number(form.stock),
        }

        setProducts([...products, newProduct])
        setForm(initialForm)
        setShowModal(false)
    }

    const handleCancel = () => {
        setForm(initialForm)
        setShowModal(false)
    }

    const metrics = {
        totalProducts: products.length,
        totalStock: products.reduce((sum, p) => sum + p.stock, 0),
        inventoryValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
        lowStock: products.filter(p => p.stock < 5).length
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
                    <button className="btn-primary" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus-lg"></i> Agregar Producto
                    </button>
                </div>
            </div>

            {/* Modal Agregar Producto */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>

                        <div className="modal-header-custom">
                            <h2>Agregar Producto</h2>
                            <button className="modal-close" onClick={handleCancel}>&times;</button>
                        </div>

                        <hr />

                        <form onSubmit={handleSave}>

                            <label className="modal-label">Título del Producto</label>
                            <input
                                type="text"
                                name="name"
                                className="modal-input"
                                placeholder="Ej: Amigurumi Osito"
                                value={form.name}
                                onChange={handleChange}
                            />

                            <div className="modal-row">
                                <div className="modal-field">
                                    <label className="modal-label">Precio</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="modal-input"
                                        min="0"
                                        value={form.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="modal-field">
                                    <label className="modal-label">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        className="modal-input"
                                        min="0"
                                        value={form.stock}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <label className="modal-label">Categoría</label>
                            <select
                                name="category"
                                className="modal-input"
                                value={form.category}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="Amigurumi">Amigurumi</option>
                                <option value="Bufandas">Bufandas</option>
                                <option value="Mantas">Mantas</option>
                            </select>

                            <label className="modal-label">Descripción</label>
                            <textarea
                                name="description"
                                className="modal-input modal-textarea"
                                placeholder="Describe el producto..."
                                value={form.description}
                                onChange={handleChange}
                            />

                            <label className="modal-label">Estado</label>
                            <div className="modal-radio-group">
                                <label className="modal-radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Activo"
                                        checked={form.status === "Activo"}
                                        onChange={handleChange}
                                    />
                                    Activo
                                </label>
                                <label className="modal-radio">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Inactivo"
                                        checked={form.status === "Inactivo"}
                                        onChange={handleChange}
                                    />
                                    Inactivo
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button type="submit" className="btn-primary modal-btn">
                                    <i className="bi bi-floppy"></i> Guardar
                                </button>
                                <button type="button" className="btn-secondary modal-btn" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            )}

            <AdminProducts products={products} />

        </div>
    )
}

export default AdminDashboard
