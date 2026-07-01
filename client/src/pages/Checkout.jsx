import { useState } from "react"
import { useUser } from "../context/UserContext"
import { useCart } from "../context/CartContext"
import { useCartTotals } from "../hooks/useCartTotals"
import { useNavigate } from "react-router-dom"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

// Inicializar el SDK con tu clave pública de pruebas o producción
initMercadoPago(import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY)

function Checkout() {
    const { token, user } = useUser()
    const { cart } = useCart()
    const { subtotal } = useCartTotals()

    const isLoggedIn = !!token
    const isAdmin = user?.role === "admin"

    // Se guardará el ID que devuelva el backend
    const [preferenceId, setPreferenceId] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleCheckout = async () => {
        setLoading(true)
        const API_URL = import.meta.env.VITE_API_URL || 'https://kathy-wool-ecommerce-mqxh.onrender.com'

        try {
            const response = await fetch(`${API_URL}/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: user.user_id,
                    items: cart
                })
            })

            const data = await response.json()

            // Acá se camptura el preferenceId de la nueva respuesta del backend
            if (data.preferenceId) {
                setPreferenceId(data.preferenceId)
            } else {
                alert("No se pudo generar la orden de pago.")
            }

        } catch (error) {
            console.error("Error en checkout", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <h2>Checkout</h2>

            {/* Mostrar el resumen del pedido */}
            <div className="card p-4 mt-4">
                <h4>Resumen de compra</h4>
                {cart.map((item) => (
                    <div key={item.id} className="d-flex justify-content-between border-bottom py-2">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString("es-CL")}</span>
                    </div>
                ))}
                <h5 className="mt-3">
                    Total: ${subtotal.toLocaleString("es-CL")}
                </h5>
            </div>

            {/* Mensaje si es admin */}
            {isAdmin && (
                <div className="alert alert-warning mt-4"> Debe iniciar sesión o registrarse antes de continuar con la compra</div>
            )}

            {/* Botón inicial para generar la orden en el Backend */}
            {!preferenceId && (
                <button
                    className="btn btn-primary mt-4"
                    disabled={!isLoggedIn || cart.length === 0 || isAdmin || loading}
                    onClick={handleCheckout}
                >
                    {loading ? "Procesando..." : "Ir a pagar"}
                </button>
            )}

            {/* 4. Renderizado del Botón oficial Wallet de Mercado Pago */}
            {preferenceId && (
                <div className="mt-4">
                    <p className="text-muted small">Tu orden ha sido registrada. Haz clic abajo para completar tu pago de forma segura:</p>
                    <Wallet 
                        initialization={{ preferenceId: preferenceId }} 
                        customization={{ texts: { valueProp: 'smart_option' } }}
                    />
                </div>
            )}
        </div>
    )
}

export default Checkout