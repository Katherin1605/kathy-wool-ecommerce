import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import 'bootstrap/dist/css/bootstrap.min.css';


const Cart = () => {

    const navigate = useNavigate();

    const { cart, total, incrementQuantity, decrementQuantity } = useCart();

    return (
        <div className="container mt-5">

        <h2 className="mb-4">&#xF239; Carrito de Compras</h2>

        {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
        ) : (
            <>
            {cart.map((item) => (
                <div
                key={item.id}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
                >
                <div>
                    <h5>{item.name}</h5>
                    <p className="mb-0">${item.price}</p>
                </div>

                <div>

                    <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => decrementQuantity(item.id)}
                    >
                    &#xF2E5;
                    </button>

                    <span className="mx-3">{item.quantity}</span>

                    <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => incrementQuantity(item.id)}
                    >
                    &#xF4F9;
                    </button>

                </div>
                </div>
            ))}

            <h4 className="mt-4">Total: ${total.toFixed(2)}</h4>

            <button
                className="btn btn-dark mt-3"
                onClick={() => navigate("/checkout")}
            >
                &#xF170; Ir a Pagar
            </button>

            </>
        )}
        </div>
    );
    };

export default Cart;