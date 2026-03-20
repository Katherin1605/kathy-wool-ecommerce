import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth"
import { useUser } from "../context/UserContext"
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://kathy-wool-ecommerce.onrender.com';

const ProductDetails = () => {
    const [liked, setLiked] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const { isAdmin, isLoggedIn } = useAuth()
    const { token, favorites, setFavorites } = useUser()
    const navigate = useNavigate();


    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axios.get(`https://kathy-wool-ecommerce.onrender.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error al obtener el producto", error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);
    useEffect(() => {
        setLiked(favorites.includes(id));
    }, [favorites, id]);

    if (loading) return <h2>Cargando detalle...</h2>;
    if (!product) return <h2>Producto no encontrado</h2>;

    const handleAddToCart = () => {
        console.log(quantity);
        addToCart({
            id: id,
            name: product.name,
            price: product.price,
            image: product.url_image,
            quantity: quantity
        });

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado 🛒',
            showConfirmButton: false,
            timer: 1500
        });
    };

    const toggleLike = async () => {
        if (!isLoggedIn) return navigate('/login');
        try {
            if (liked) {
                await axios.delete(`${API_URL}/users/me/favorites/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${API_URL}/users/me/favorites`, { productId: id }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFavorites(prev => [...prev, id]);
            }
            setLiked(!liked);
        } catch (error) {
            console.error('Error al actualizar favorito', error);
        }
    };

    return (
        <div>
            <div className='row m-4'>
                <div className='col-12 col-md-6'>
                    <img src={product.url_image} alt={product.name} className='product-img' />
                </div>
                <div className='col-12 col-md-6'>
                    <p className='category'>{product.category}</p>
                    <div className='d-flex align-items-center gap-3'>
                        <h1 className='mb-0'>{product.name}</h1>
                        {!isAdmin && (
                            <button onClick={toggleLike} className='btn-liked'>
                                <i className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                            </button>
                            )}
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
                    <p className='price' style={{ fontSize: '25px' }}>${product.price}</p>
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
                    {!isAdmin && (
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
                    )}
                    {!isAdmin && (
                        <button
                            onClick={handleAddToCart}
                            type="button"
                            className="btn-add-cart"
                            aria-label="Agregar al carrito"
                            disabled={isAdmin}
                        >
                            <i className="bi bi-cart me-2" aria-hidden></i>
                            Agregar al Carrito
                        </button>
                    )}
                    <hr />

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