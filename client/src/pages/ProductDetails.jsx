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
    const [reviews, setReviews] = useState([]);
    const [myRating, setMyRating] = useState(0);
    const [hasPurchased, setHasPurchased] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const { isAdmin, isLoggedIn } = useAuth();
    const { token, favorites, setFavorites } = useUser();
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
        axios.get(`${API_URL}/products/${id}/reviews`)
            .then(res => setReviews(res.data))
            .catch(err => console.error('Error cargando reviews', err));

        if (token) {
            axios.get(`${API_URL}/products/${id}/my-review`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                if (res.data) setMyRating(res.data.stars);
            }).catch(() => { });

            // Verificar si compró revisando sus órdenes
            axios.get(`${API_URL}/users/me/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                const purchased = res.data.some(order =>
                    order.items.some(item => String(item.product_id || item.name) && true)
                );
                setHasPurchased(purchased);
            }).catch(() => { });
        }
    }, [id, token]);

    useEffect(() => {
        setLiked(favorites.includes(Number(id)));
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

    const handleRate = async (stars) => {
        if (!isLoggedIn) return navigate('/login');
        try {
            await axios.post(`${API_URL}/products/${id}/reviews`, { stars }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyRating(stars);
            const res = await axios.get(`${API_URL}/products/${id}/reviews`);
            setReviews(res.data);
            const prodRes = await axios.get(`${API_URL}/products/${id}`);
            setProduct(prodRes.data);
        } catch (error) {
            console.error('Error al calificar:', error.response?.status, error.response?.data);
            if (error.response?.status === 403) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Solo puedes calificar productos que hayas comprado',
                    showConfirmButton: false,
                    timer: 2500
                });
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al calificar',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
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
                                        {/* Estrellas promedio + conteo */}
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <span>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < product.stars ? 'star-filled' : 'star-empty'} style={{ fontSize: '1.2rem' }}>
                                    &#9733;
                                </span>
                            ))}
                        </span>
                        <span className="text-muted text-sm">
                            ({product.review_count} {product.review_count == 1 ? 'calificación' : 'calificaciones'})
                        </span>
                    </div>

                    {/* Calificar — solo si está logueado y no es admin */}
                    {isLoggedIn && !isAdmin && (
                        <div className="mb-3 p-3" style={{ background: 'var(--bg-card-alt)', borderRadius: '10px' }}>
                            <p className="fw-semibold mb-2 text-sm">
                                {myRating > 0 ? 'Tu calificación:' : 'Califica este producto:'}
                            </p>
                            <div>
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span
                                        key={i}
                                        onClick={() => handleRate(i + 1)}
                                        onMouseEnter={() => setHoverRating(i + 1)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        style={{ cursor: 'pointer', fontSize: '1.5rem' }}
                                        className={i < (hoverRating || myRating) ? 'star-filled' : 'star-empty'}
                                    >
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
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