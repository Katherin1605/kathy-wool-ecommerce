import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext"
import 'bootstrap/dist/css/bootstrap.min.css';


const Cart = () => {

    const navigate = useNavigate();

    const { cart, total, incrementQuantity, decrementQuantity } = useCart();

    const { token } = useUser()
    const isLoggedIn = !!token
    
    return (
        <div className="container mt-5">

        <h2 className="mb-4">
            <i className="bi bi-cart3"></i> Carrito de Compras
        </h2>

        {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
        ) : (
            <>
            {cart.map((item) => (
                
                <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
                >
                    <div className="d-flex align-items-center">
                    
                        <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-img"
                        />

                        <div>
                            <h5>{item.name}</h5>
                            <p className="mb-0">${item.price}</p>
                        </div>

                    </div>

                <div>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => decrementQuantity(item.id)}
                    >
                        <i className="bi bi-dash"></i>
                    </button>

                    <span className="mx-3">{item.quantity}</span>

                    <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => incrementQuantity(item.id)}
                    >
                        <i className="bi bi-plus"></i>
                    </button>

                </div>
                </div>
            ))}

            <h4 className="mt-4">Total: ${total.toFixed(2)}</h4>

            <button
                className={`btn mt-3 ${isLoggedIn ? "btn-cart-primary" : "btn-secondary"}`}
                onClick={() => {
                    if (!isLoggedIn) {
                        navigate("/login", { state: { from: "/checkout" } })
                    } else {
                        navigate("/checkout")
                    }
                }}
                disabled={!isLoggedIn}
                aria-label="Ir a pagar"
            >
            <i className="bi bi-credit-card me-2" aria-hidden></i>
                Ir a Pagar
            </button>

            {!isLoggedIn && (
                <p className="text-danger mt-2">
                    Debe iniciar sesión o registrarse antes de la compra
                </p>
            )}

            </>
        )}
        </div>
    );
    };

export default Cart;