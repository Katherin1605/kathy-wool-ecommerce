import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // cargar carrito desde localStorage (que no se borre cuando actualiza)
    const [cart, setCart] = useLocalStorage("cart", [])

    const [total, setTotal] = useState(0);

    useEffect(() => {
        const suma = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
        );
        setTotal(suma);
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {

        const exists = prevCart.find((item) => item.id === product.id);

        if (exists) {
            return prevCart.map((item) =>
            item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
        }

//agregar removeFromCart
        return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const incrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        );
    };

    const decrementQuantity = (id) => {
        setCart((prevCart) =>
        prevCart.map((item) =>
            item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
        value={{
            cart,
            total,
            addToCart,
            incrementQuantity,
            decrementQuantity,
            clearCart,
        }}
        >
        {children}
        </CartContext.Provider>
    );
    };

export const useCart = () => useContext(CartContext);