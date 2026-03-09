import { Link } from "react-router-dom"

function AdminProducts({ products }){

  return(

    <div>

      <table className="admin-table">

        <thead>

          <tr>
            <th>ID</th>
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

            <tr key={product.id}>

              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>{product.status}</td>

              <td>

                <Link
                  to={`/admin/products/edit/${product.id}`}
                  className="btn-edit"
                >
                  Editar
                </Link>

                <button className="btn-delete">
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

export default AdminProducts