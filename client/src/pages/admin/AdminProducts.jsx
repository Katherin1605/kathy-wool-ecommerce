function AdminProducts({ products, categories, onEdit, onDelete }) {

    const getCategoryName = (categoryId) => {
        const cat = categories.find(c => c.category_id === categoryId)
        return cat ? cat.name : '-'
    }

    return (
        <div>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.product_id}>
                            <td>{product.product_id}</td>
                            <td>
                                {product.url_image && (
                                    <img src={product.url_image} alt={product.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }} />
                                )}
                            </td>
                            <td>{product.name}</td>
                            <td>{getCategoryName(product.category_id)}</td>
                            <td>${Intl.NumberFormat('es-CL').format(product.price)}</td>
                            <td>{product.stock}</td>
                            <td>{product.isactive ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button className="btn-edit" onClick={() => onEdit(product)}>
                                    Editar
                                </button>
                                <button className="btn-delete" onClick={() => onDelete(product.product_id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminProducts;