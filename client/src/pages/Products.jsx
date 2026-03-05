import React from 'react'
import ProductCard from '../components/ProductCard'
import { useEffect, useState } from 'react'

const Products = () => {
    

    return (
        <div className='container d-flex flex-column align-items-center mb-5'>
            <h2>Galería de productos</h2>
            <div className='d-flex flex-wrap justify-content-center' style={{ height: '30vh' }}>
                <ProductCard nombre="Axolote" precio={19.99} imagen="axolote.png" estrellas={4} />
                <ProductCard nombre="Zelda" precio={29.99} imagen="zelda.jpg" estrellas={5} />
                <ProductCard nombre="Blusa a crochet" precio={9.99} imagen="blusa_crochet.jpeg" estrellas={4} />
                <ProductCard nombre="Gengar" precio={14.99} imagen="gengar.jpg" estrellas={4} />
                <ProductCard nombre="Principito con zorro" precio={25.99} imagen="principito_con_zorro.jpg" estrellas={5} />
            </div>

        </div>
    )
}

export default Products
