import { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from './ProductCard';

const BestProducts = () => {
    const [products, setProducts] = useState([]);
    const [bestProducts, setBestProducts] = useState([]);


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

    useEffect(() => {
        const topProducts = products
            .sort((a, b) => b.stars - a.stars)
            .slice(0, 3);
        setBestProducts(topProducts);
    }, [products]);

    return (
        <div>
            <div className="d-flex justify-content-center">
                {bestProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
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

export default BestProducts