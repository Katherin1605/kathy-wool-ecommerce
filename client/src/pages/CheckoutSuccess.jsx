import React, { useEffect } from 'react'
import { useCart } from "../context/CartContext"

const CheckoutSuccess = () => {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="container mt-5 text-center">
        <img
            src="https://res.cloudinary.com/dorfpavlv/image/upload/v1782502532/Gatito_saltando_vsvyke.png"
            alt="Compra exitosa"
            className="notfound-img"
            style={{ maxWidth: '300px' }}
        />

        <h1 className="notfound-title mt-4">¡Compra exitosa!</h1>

        <h3 className="mb-3">
            La compra se ha realizado con éxito y tu pedido está en proceso de preparación. 🎉
        </h3>

        <p className="notfound-text mb-4">
            ¿Necesitas algo más? Puedes seguir explorando nuestros productos o contactarnos si tienes alguna pregunta.
        </p>
    </div>
  )
}

export default CheckoutSuccess