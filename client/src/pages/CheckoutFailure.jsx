import React from 'react'

const CheckoutFailure = () => {
  return (
    <div>
      <img
                src="/notfound.png"
                alt="Compra fallida"
                className="notfound-img"
            />

            <h1 className="notfound-title">¡Compra fallida!</h1>

            <h3 className="mb-3">Parece que hubo un problema con tu pago. Por favor, intenta nuevamente.
            </h3>

            <p className="notfound-text mb-4">
                ¿Necesitas ayuda? Puedes contactarnos si tienes alguna pregunta.
            </p>
    </div>
  )
}

export default CheckoutFailure
