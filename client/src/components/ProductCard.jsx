import React, { useState, useEffect } from 'react'
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth"
import { useUser } from "../context/UserContext"
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = import.meta.env.VITE_API_URL || 'https://kathy-wool-ecommerce.onrender.com';

const ProductCard = (props) => {

    const { id, name, price, image, stars } = props
    const { favorites, setFavorites } = useUser();
    const [liked, setLiked] = useState(false);
    const { addToCart } = useCart();
    const { isAdmin, isLoggedIn } = useAuth()
    const { token } = useUser()
    const navigate = useNavigate();

    useEffect(() => {
        setLiked(favorites.includes(id));
    }, [favorites, id]);

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

    const handleAddToCart = () => {
        addToCart({
            id: id,
            name: name,
            price: price,
            image: image
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

    const handleViewDetails = (id) => {
        navigate(`/products/${id}`);
    }

    return (
        <div className='m-3'>
            <div className="card product-card-wrapper rounded">
                <div className='container'>
                    <img
                        src={image}
                        className="card-img-top product-card-img"
                        alt={name}
                        style={{ minWidth: '110%', transform: 'translateX(-4.5%)' }}
                    />
                    {!isAdmin && (
                        <button onClick={toggleLike} className='btn-liked btn-liked-position'>
                            <i className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                        </button>
                    )}
                </div>


                <div className="card-body">

                    <h5 className="card-title">{name}</h5>

                    <div className='row d-flex align-items-center mb-3'>

                        <div className='col p-2'>

                            <p className="card-text price-text mb-0">
                                ${Intl.NumberFormat('es-CL').format(price)}
                            </p>

                        </div>

                        <div className='col'>
                            <p className="card-text">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span
                                        key={i}
                                        className={i < stars ? 'star-filled' : 'star-empty'}
                                        aria-hidden
                                    >
                                        &#9733;
                                    </span>
                                ))
                                }
                            </p>

                        </div>

                    </div>
                    
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

                    {isAdmin && (
                        <small className="text-muted d-block mt-2">
                            Modo administrador: compras deshabilitadas
                        </small>
                    )}

                    <button
                        onClick={() => handleViewDetails(id)}
                        type="button"
                        className="btn-details"
                        aria-label="Ver detalles del producto"
                    >
                        Ver detalles
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ProductCard

