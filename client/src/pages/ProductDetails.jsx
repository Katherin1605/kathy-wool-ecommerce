import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`https://69a63feefeb94223b31c819b.mockapi.io/api/v1/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error al obtener el producto", error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    if (loading) return <h2>Cargando detalle...</h2>;
    if (!product) return <h2>Producto no encontrado</h2>;

    console.log(product);
    return (
        <div>
            <div className='row d-flex justify-content m-4'>
                <div className='col'>
                    <img src={product.image} alt={product.name} />

                </div>
                <div className='col'>
                    <p className='category'>{product.category}</p>
                    <h1>{product.name}</h1>
                    <p><strong>
                        {Array.from({ length: 5 }, (_, i) => (
                            <span
                                key={i}
                                className={i < product.stars ? 'star-filled' : 'star-empty'}
                                aria-hidden
                            >
                                &#9733;
                            </span>
                        ))
                        }
                    </strong></p>
                    <p className='price' style={{fontSize: '25px'}}>${product.priceDetails}</p>
                    <p>{product.description}</p>
                    <p><strong>Stock:</strong> {product.stockAvailable} unidades</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;