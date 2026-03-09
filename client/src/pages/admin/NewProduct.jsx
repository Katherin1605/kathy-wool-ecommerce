function NewProduct(){

  return(

    <div className="admin-form-container">

      <h1>Agregar Nuevo Producto</h1>

      <form className="admin-form">

        <input
          type="text"
          placeholder="Título del producto"
        />

        <select>

          <option>Selecciona categoría</option>
          <option>Amigurumi</option>
          <option>Bufandas</option>
          <option>Mantas</option>

        </select>

        <input
          type="number"
          placeholder="Precio"
        />

        <textarea
          placeholder="Descripción del producto"
        />

        <input
          type="text"
          placeholder="URL de imagen"
        />

        <div className="form-actions">

          <button className="btn-primary">
            Agregar Producto
          </button>

          <button className="btn-secondary">
            Cancelar
          </button>

        </div>

      </form>

    </div>

  )

}

export default NewProduct