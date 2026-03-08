import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDetails = () => {
    const [liked, setLiked] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);


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

    const handleAddToCart = () => {
        console.log(quantity);
        addToCart({
            id: id,
            name: product.name,
            price: product.priceDetails,
            image: product.image,
            quantity: quantity
        });
    };

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div>
            <div className='row m-4'>
                <div className='col-auto'>
                    <img src={product.image} alt={product.name} className='rounded-5' />
                </div>

                <div className='col'>
                    <p className='category'>{product.category}</p>
                    <div className='row'>
                        <h1 className='col-auto'>{product.name}</h1>
                        <button onClick={toggleLike} className='btn-liked col-auto'>
                            <i className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                        </button>
                    </div>
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
                    <p className='price' style={{ fontSize: '25px' }}>${product.priceDetails}</p>
                    <p>{product.description}</p>

                    <div className='detail-specifications'>
                        <h4>Especificaciones</h4>
                        <div className='d-flex justify-content-between'>
                            <p>Material:</p>
                            <p>Lana acrilica premium</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p>Cuidado:</p>
                            <p>Lavado a mano con agua fria</p>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <p>Hecho a mano</p>
                            <p>100% artesanal</p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-start align-items-center mb-3'>
                        <p className='m-3'><strong>Cantidad:</strong></p>
                        <button
                            onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                            className='detail-minus'
                        >-</button>
                        <span className='p-2'>
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(prev => prev + 1)}
                            className='detail-plus'
                        >+</button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        type="button"
                        className="btn-add-cart mb-3"
                        aria-label="Agregar al carrito"
                    >
                        <i className="bi bi-cart me-2" aria-hidden></i>
                        Agregar al Carrito
                    </button>

                    <hr></hr>

                    <div className='d-flex justify-content-evenly'>

                        <div className="text-center">
                            <i className="bi bi-box2-heart details-icon"></i>
                            <p>Hecho a Mano</p>
                        </div>

                        <div className="text-center">
                            <i className="bi bi-shield details-icon"></i>
                            <p>Compra segura</p>
                        </div>

                        <div className="text-center">
                            <i className="bi bi-truck details-icon"></i>
                            <p>Envio rapido</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;