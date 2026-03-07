import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
    const [products, setProducts] = useState([]);


    const API_URL = "https://69a63feefeb94223b31c819b.mockapi.io/api/v1/products";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(API_URL);
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchProducts();
    }, []);

    console.log(products);

    return (
        <div className='d-flex flex-column align-items-center mb-5'>
            <h2>Galería de productos</h2>

            <div className='d-flex flex-wrap justify-content-center' style={{ height: '30vh' }}>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        //agregar id para evitar duplicados
                        id={product.id}
                        //corregir nombres a inglés
                        name={product.name}
                        price={product.priceDetails}
                        image={product.image}
                        stars={product.stars}
                    />
                ))}
            </div>
        </div>
    )
}

export default Products
