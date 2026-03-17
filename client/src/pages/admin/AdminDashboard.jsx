import { useState, useEffect } from "react"
import axios from "axios"
import AdminProducts from "./AdminProducts"

const API_URL = import.meta.env.VITE_API_URL || 'https://kathy-wool-ecommerce.onrender.com'

const initialForm = {
    name: "",
    price: "",
    stock: "",
    category_id: "",
    description: "",
    url_image: "",
    isactive: true
}

function AdminDashboard() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(initialForm)
    const [editingId, setEditingId] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetchProducts()
        fetchCategories()
    }, [])

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/products?limit=1000`)
            setProducts(res.data)
        } catch (error) {
            console.error("Error cargando productos", error)
        }
    }

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API_URL}/categories`)
            setCategories(res.data)
        } catch (error) {
            console.error("Error cargando categorías", error)
        }
    }

    const uploadImage = async () => {
        if (!imageFile) return form.url_image
        const data = new FormData()
        data.append("file", imageFile)
        data.append("upload_preset", "kathy-wool-upload-image")
        data.append("folder", "kathy-wool-images")
        const res = await fetch("https://api.cloudinary.com/v1_1/dorfpavlv/image/upload", {
            method: "POST", body: data
        })
        const fileData = await res.json()
        return fileData.secure_url
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0])
    }

    const handleSave = async (e) => {
        e.preventDefault()
        if (!form.name || !form.category_id) return
        setUploading(true)

        try {
            const url_image = await uploadImage()
            const payload = {
                name: form.name,
                category_id: Number(form.category_id),
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                url_image,
                isactive: form.isactive === true || form.isactive === "true"
            }

            if (editingId) {
                await axios.put(`${API_URL}/products/${editingId}`, payload)
            } else {
                await axios.post(`${API_URL}/products`, payload)
            }

            await fetchProducts()
            handleCancel()
        } catch (error) {
            console.error("Error guardando producto", error)
        } finally {
            setUploading(false)
        }
    }

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            price: product.price,
            stock: product.stock,
            category_id: product.category_id || "",
            description: product.description || "",
            url_image: product.url_image || "",
            isactive: product.isactive
        })
        setEditingId(product.product_id)
        setImageFile(null)
        setShowModal(true)
    }

    const handleDelete = async (productId) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return
        try {
            await axios.delete(`${API_URL}/products/${productId}`)
            setProducts(prev => prev.filter(p => p.product_id !== productId))
        } catch (error) {
            console.error("Error eliminando producto", error)
        }
    }

    const handleCancel = () => {
        setForm(initialForm)
        setEditingId(null)
        setImageFile(null)
        setShowModal(false)
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="m-3">
            <h1><i className="bi bi-gear"></i> Panel de Administración</h1>

            <div className="search">
                <div className="input-group flex-nowrap">
                    <input
                        type="text"
                        className="form-control"
                        placeholder=" 🔍  Buscar productos..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button className="btn-primary" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus-lg"></i> Agregar Producto
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={handleCancel}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <div className="modal-header-custom">
                            <h2>{editingId ? "Editar Producto" : "Agregar Producto"}</h2>
                            <button className="modal-close" onClick={handleCancel}>&times;</button>
                        </div>
                        <hr />
                        <form onSubmit={handleSave}>
                            <label className="modal-label">Título del Producto</label>
                            <input type="text" name="name" className="modal-input" placeholder="Ej: Amigurumi Osito" value={form.name} onChange={handleChange} />

                            <div className="modal-row">
                                <div className="modal-field">
                                    <label className="modal-label">Precio</label>
                                    <input type="number" name="price" className="modal-input" min="0" value={form.price} onChange={handleChange} />
                                </div>
                                <div className="modal-field">
                                    <label className="modal-label">Stock</label>
                                    <input type="number" name="stock" className="modal-input" min="0" value={form.stock} onChange={handleChange} />
                                </div>
                            </div>

                            <label className="modal-label">Categoría</label>
                            <select name="category_id" className="modal-input" value={form.category_id} onChange={handleChange}>
                                <option value="">Selecciona una categoría</option>
                                {categories.map(cat => (
                                    <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                                ))}
                            </select>

                            <label className="modal-label">Descripción</label>
                            <textarea name="description" className="modal-input modal-textarea" placeholder="Describe el producto..." value={form.description} onChange={handleChange} />

                            <label className="modal-label">Imagen del Producto</label>
                            {editingId && form.url_image && (
                                <img src={form.url_image} alt="Actual" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px' }} />
                            )}
                            <input type="file" name="image" className="modal-input" accept="image/*" onChange={handleFileChange} />

                            <label className="modal-label">Estado</label>
                            <div className="modal-radio-group">
                                <label className="modal-radio">
                                    <input type="radio" name="isactive" value="true" checked={form.isactive === true || form.isactive === "true"} onChange={handleChange} />
                                    Activo
                                </label>
                                <label className="modal-radio">
                                    <input type="radio" name="isactive" value="false" checked={form.isactive === false || form.isactive === "false"} onChange={handleChange} />
                                    Inactivo
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button type="submit" className="btn-primary modal-btn" disabled={uploading}>
                                    <i className="bi bi-floppy"></i> {uploading ? "Guardando..." : "Guardar"}
                                </button>
                                <button type="button" className="btn-secondary modal-btn" onClick={handleCancel}>
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AdminProducts
                products={filtered}
                categories={categories}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default AdminDashboard