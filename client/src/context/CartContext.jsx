import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // cargar carrito desde localStorage (que no se borre cuando actualiza)
    const [cart, setCart] = useLocalStorage("cart", [])

    const [total, setTotal] = useState(0);

    //Para que calcule automaticamente el total
    useEffect(() => {
        const suma = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
        );
        setTotal(suma);
    }, [cart]);

    //Para agregar productos
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

        return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    //Para aumentar cantidad
    const incrementQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        );
    };

    //Para disminuir cantidad
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

    //Para eliminar el producto del carrito (todas las unidades)
    const removeFromCart = (id) => {

        setCart((prevCart) =>
        prevCart.filter((item) => item.id !== id)
        );

    };


    //Para limpiar el carrito
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