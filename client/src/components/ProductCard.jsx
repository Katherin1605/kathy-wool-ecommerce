import React from 'react'

const ProductCard = (props) => {
    const { nombre, precio, imagen, estrellas } = props
    const colorRosa = '#f52a8f';
    const colorFondo = '#f8f9fa';
    return (
        <div className='m-3'>
            <div className="card" style={{ width: '18rem', height: '100%', backgroundColor: colorFondo }}>
                <img src={imagen} className="card-img-top" alt={nombre} />
                <div className="card-body">
                    <h5 className="card-title">{nombre}</h5>
                    <div className='row d-flex align-items-center mb-3'>
                        <div className='col p-2'>
                            <p className="card-text" style={{color: colorRosa, fontWeight: 'bold'}}>${precio.toFixed(2)}</p>
                        </div>
                        <div className='col'>
                            <p className="card-text">{
                                Array.from({ length: 5 }, (_, i) => (
                                    <span key={i} style={{ color: i < estrellas ? '#F0D700' : 'lightgray' }}>
                                        &#9733;
                                    </span>
                                ))
                            }</p>
                        </div>
                    </div>
                    <button type="button"
                    className="btn btn-danger border border-0 "
                    style={{width: '100%', fontWeight: 'bold', color: 'white', backgroundColor: colorRosa}}>
                        &#x1F6D2; Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard

