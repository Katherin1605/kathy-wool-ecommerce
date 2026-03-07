import React from 'react'
import { useCart } from "../context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCard = (props) => {
    
    const { id, name, price, image, stars } = props
    
    //agregar:
    const { addToCart } = useCart();
    
    const colorRosa = '#f52a8f';
    const colorFondo = '#f8f9fa';
    
    //agregar:
    const handleAddToCart = () => {
        addToCart({
            id: id,
            name: name,
            price: price,
            image: image
        });
    };
    
//editar el botón: onClick y cambio de estrellas a stars
    
    return (
        <div className='m-3'>
            <div 
                className="card" 
                style={{ width: '18rem', height: '100%', backgroundColor: colorFondo, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                
                <img 
                    src={image} 
                    className="card-img-top" 
                    alt={name} 
                    style={{height: '300px', overflow: 'scroll'}}
                />

                <div className="card-body">

                    <h5 className="card-title">{name}</h5>

                    <div className='row d-flex align-items-center mb-3'>

                        <div className='col p-2'>

                            <p 
                                className="card-text" 
                                style={{color: colorRosa, fontWeight: 'bold'}}
                            >
                                ${Number(price).toFixed(2)}
                            </p>
                        
                        </div>

                        <div className='col'>
                            <p className="card-text">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <span 
                                        key={i} 
                                        style={{ color: i < stars ? '#F0D700' : 'lightgray' }}
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
                        className="btn btn-danger border border-0 "
                        style={{
                            width: '100%', 
                            fontWeight: 'bold', 
                            color: 'white', 
                            backgroundColor: colorRosa
                            }}
                    >
                        &#x1F6D2; Agregar al Carrito
                    </button>

                    <button 
                        type="button"
                        className="btn btn-secondary border border-0 "
                        style={{
                            width: '100%', 
                            fontWeight: 'bold', 
                            color: 'white', 
                            marginTop: '10px'}}
                    >
                        Ver detalles
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ProductCard

