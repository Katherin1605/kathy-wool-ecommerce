import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configuración de colores del diseño
  const pinkColor = "#ff219d";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Por favor selecciona una imagen");

    setLoading(true);

    // Acá está la configuración de Cloudinary -> NO TOCAR!!!!
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "kathy-wool-upload-image");
    data.append("folder", "kathy-wool-images");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dorfpavlv/image/upload",
        { method: "POST", body: data }
      );

      const fileData = await response.json();

      if (response.ok) {
        const finalData = { ...formData, imageUrl: fileData.secure_url };
        console.log("Imagen subida", finalData);
        try {
          const newProductForDB = {
            name: finalData.title,
            category_id: categoryId,
            description: finalData.description,
            price: finalData.price,
            stock: 1,
            url_image: finalData.imageUrl,
            isactive: true
          };
          console.log("Producto a enviar al backend:", newProductForDB);
          await axios.post("http://localhost:3000/products", newProductForDB);
        } catch (error) {
          console.error("Error al crear el producto:", error);
        }
        alert("Producto creado con éxito");
      }
    } catch (error) {
      console.error("Error al subir:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="card shadow-sm border-0 rounded-4 p-4" style={{ maxWidth: '600px', width: '100%' }}>

        {/* Encabezado */}
        <div className="text-center mb-4">
          <div
            className="rounded-circle d-inline-flex align-items-center justify-content-center text-white mb-3"
            style={{ width: '60px', height: '60px', backgroundColor: pinkColor, fontSize: '30px' }}
          >
            +
          </div>
          <h2 className="fw-bold" style={{ color: '#1a1d2e' }}>Agregar Nuevo Diseño</h2>
          <p className="text-muted">Agrega un nuevo producto a la tienda</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Zona de Carga de Imagen */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">Imágenes del Producto</label>
            <div
              className="position-relative border rounded-3 p-5 text-center bg-white"
              style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: '#dee2e6' }}
            >
              <input
                type="file"
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className="text-muted">
                <span style={{ fontSize: '40px' }}>??</span>
                <p className="mb-1 fw-medium text-dark">Haz clic para subir imágenes o arrastra aquí</p>
                <small>PNG, JPG hasta 10MB (máximo 5 imágenes)</small>
              </div>
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="mt-3 rounded shadow-sm" style={{ maxHeight: '150px' }} />
              )}
            </div>
          </div>

          {/* Título */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Título del Producto</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">???</span>
              <input
                type="text"
                name="title"
                className="form-control border-start-0 ps-0"
                placeholder="Ej: Amigurumi Osito de Peluche"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Categoría */}
          <div className="mb-3">
            <label htmlFor="categoryId" className='form-label'>Categoria:</label>
            <select id="categoryId" className='form-select' value={categoryId} onChange={(e) => {
              setCategoryId(e.target.value);
            }}>
              <option value="0">Todas las categorias</option>
              {categories.map((category) => (
                <option
                  key={category.category_id}
                  value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Precio */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-secondary">Precio</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">$</span>
              <input
                type="number"
                name="price"
                className="form-control border-start-0 ps-0"
                placeholder="0"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-secondary">Descripción</label>
            <textarea
              name="description"
              className="form-control"
              rows="4"
              placeholder="Describe tu producto: materiales, tamaño, cuidados, etc."
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Botones */}
          <div className="d-flex gap-3">
            <button type="button" className="btn btn-light flex-grow-1 py-2 fw-semibold text-secondary">
              Cancelar
            </button>
            <button
              type="submit"
              className="btn text-white flex-grow-1 py-2 fw-semibold"
              disabled={loading}
              style={{ backgroundColor: pinkColor, border: 'none' }}
            >
              {loading ? 'Subiendo...' : 'Agregar Diseño'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewProduct;