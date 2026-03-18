import ProductCard from '../components/ProductCard'
import { use, useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [orderBy, setOrderBy] = useState('product_id ASC');
    const [limit, setLimit] = useState(9);
    const [page, setPage] = useState(1);
    const [categoryId, setCategoryId] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://kathy-wool-ecommerce.onrender.com/products", {
                    params: {
                        order_by: orderBy,
                        category_id: categoryId,
                        limit: limit,
                        page: page
                    }
                });
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchProducts();
    }, [orderBy, limit, page, categoryId]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("https://kathy-wool-ecommerce.onrender.com/categories");
                setCategories(response.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className='d-flex flex-column align-items-center m-4'>
            <h2>Galería de productos</h2>

            <div className='row g-3 w-100'>
                <div className='col'>
                    <label htmlFor="orderBy" className='form-label'>Ordenar por:</label>
                    <select id="orderBy" className='form-select' value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="product_id DESC">Recientes</option>
                        <option value="stars DESC">Mejor valorados</option>
                        <option value="name ASC">Nombre: A a Z</option>
                        <option value="name DESC">Nombre: Z a A</option>
                        <option value="price ASC">Precio: Menor a Mayor</option>
                        <option value="price DESC">Precio: Mayor a Menor</option>
                    </select>
                </div>
                <div className='col'>
                    <label htmlFor="categoryId" className='form-label'>Filtrar por categoria:</label>
                    <select id="categoryId" className='form-select' value={categoryId} onChange={(e) => {
                        setCategoryId(e.target.value);
                        setPage(1);
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
            </div>

            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                <button
                    className="btn-pagination"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                <span className="fw-bold">Pagina {page}</span>

                <button
                    className="btn-pagination"
                    disabled={products.length < limit}
                    onClick={() => setPage(page + 1)}
                >
                    Siguiente
                </button>
            </div>

            <div className="d-flex flex-wrap justify-content-center products-grid-wrapper">
                {products.map((product) => (
                    <ProductCard
                        key={product.product_id}

                        id={product.product_id}

                        name={product.name}
                        price={product.price}
                        image={product.url_image}
                        stars={product.stars}
                    />
                ))}
            </div>

            <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
                <button
                    className="btn-pagination"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    Anterior
                </button>

                <span className="fw-bold">Pagina {page}</span>

                <button
                    className="btn-pagination"
                    disabled={products.length < limit}
                    onClick={() => setPage(page + 1)}
                >
                    Siguiente
                </button>
            </div>

        </div>
    )
}

export default Products
