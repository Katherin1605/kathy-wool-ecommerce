import { useState } from "react"
import { useUser } from "../context/UserContext"
import { useCart } from "../context/CartContext"
import { useCartTotals } from "../hooks/useCartTotals"
import { useNavigate } from "react-router-dom"

function Checkout() {
    const { token, getProfile } = useUser()
    const { cart, clearCart } = useCart()
    const { subtotal } = useCartTotals()
    
    const user = getProfile()
    const isLoggedIn = !!token
    const isAdmin = user?.role === "Administrador"
    
    const [orderNumber, setOrderNumber] = useState(null)
    const [orderItems, setOrderItems] = useState([])
    
    const navigate = useNavigate()

    // para generar un número de pedido
    const generateOrderNumber = () => {
        return "KW-" + Math.floor(Math.random() * 1000000)
    }

        // para mostrar el total del carrito
    const handleCheckout = async () => {

        const newOrder = generateOrderNumber()

        try {

            await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.user_id
                })
            })

            setOrderItems(cart)
            setOrderNumber(newOrder)

            clearCart()

        } catch (error) {

            console.error("Error en checkout", error)

        }
    }

    return (
        <div className="container mt-5">

            {!orderNumber && <h2>Checkout</h2>}

            {/* Mostrar el resumebn del pedido */}
            {!orderNumber && (
                <div className="card p-4 mt-4">
                    <h4>Resumen de compra</h4>
                    {cart.map((item) => (
                        <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                            <span>{item.name} x {item.quantity}</span>
                            <span>${item.price * item.quantity}</span>
                        </div>
                    ))}
                    <h5 className="mt-3">
                        Total: ${subtotal.toLocaleString("es-CL")}
                    </h5>

                </div>
            )}

            {/* mensaje si no está loggeado */}
            {isAdmin && !orderNumber && (
                <div className="alert alert-warning mt-4"> Debe iniciar sesión o registrarse antes de continuar con la compra</div>
            )}

            {/* botón pagar activo si está loggeado y desactivado si no */}
            {!orderNumber && (
                <button
                    className="btn btn-primary mt-4"
                    disabled={!isLoggedIn || cart.length === 0 || isAdmin}
                    onClick={handleCheckout}
                >
                    Ir a pagar
                </button>
            )}

            {/* confirmación de compra */}
            {orderNumber && (
                <div className="alert alert-success mt-4">
                    <h4>Compra realizada con éxito 🎉</h4>
                    <p> Número de pedido: <strong> {orderNumber}</strong> </p>

                    <p> La confirmación fue enviada a su correo: <strong> {user?.email}</strong> </p>
                </div>
            )}

            {orderNumber && (
                <div className="card p-4 mt-4">

                    <h4 className="mb-3">Detalle de la compra</h4>

                    {orderItems.map((item) => (
                        <div
                            key={item.id}
                            className="d-flex justify-content-between border-bottom py-2"
                        >
                            <span>
                            {item.name} x {item.quantity}
                            </span>

                            <span>
                            ${(item.price * item.quantity).toLocaleString("es-CL")}
                            </span>
                        </div>
                    ))}

                    <h5 className="mt-3">
                        Total pagado: $
                        {orderItems
                            .reduce((acc, item) => acc + item.price * item.quantity, 0)
                            .toLocaleString("es-CL")}
                    </h5>

                </div>
            )}

            {orderNumber && (
                <div className="text-center mt-4">
                    <button
                        className="btn btn-cart-primary mt-3"
                        onClick={() => navigate("/products")}
                    >
                        <i className="bi bi-shop me-2"></i>
                    Seguir comprando
                    </button>
                </div>
            )}

        </div>
    )
}

export default Checkout