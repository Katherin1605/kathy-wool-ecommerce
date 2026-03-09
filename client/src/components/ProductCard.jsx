import React from 'react'
import { useCart } from "../context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = (props) => {
    const [liked, setLiked] = useState(false);
    const { id, name, price, image, stars } = props
    const navigate = useNavigate();

    const { addToCart } = useCart();

    const toggleLike = () => {
        setLiked(!liked);
    };

    const handleAddToCart = () => {
        addToCart({
            id: id,
            name: name,
            price: price,
            image: image
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
                    <button onClick={toggleLike} className='btn-liked btn-liked-position'>
                        <i className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'}></i>
                    </button>
                </div>


                <div className="card-body">

                    <h5 className="card-title">{name}</h5>

                    <div className='row d-flex align-items-center mb-3'>

                        <div className='col p-2'>

                            <p className="card-text price-text mb-0">
                                ${Number(price).toFixed(2)}
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

                    <button
                        onClick={handleAddToCart}
                        type="button"
                        className="btn-add-cart"
                        aria-label="Agregar al carrito"
                    >
                        <i className="bi bi-cart me-2" aria-hidden></i>
                        Agregar al Carrito
                    </button>

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

