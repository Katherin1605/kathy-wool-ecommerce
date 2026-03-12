import {getCartByUser, createCartIfNotExists, getActiveCart, addProductToCart, updateCartItem, removeProductFromCart} from "../models/cartModel.js";

// Para obtener el carrito
export const fetchCartController = async (req,res) => {

    const { userId } = req.params

    try {

        const cart = await getCartByUser(userId)

        res.json(cart)

    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Error obteniendo el carrito"})
    }

};


// Para agregar producto al carrito
export const addToCartController = async (req, res) => {

    const { userId, productId } = req.body;

    try {

        let cart = await getActiveCart(userId);

        if (!cart) {
            cart = await createCartIfNotExists(userId);
        }

        await addProductToCart(cart.cart_id, productId);

        res.json({ message: "Producto agregado al carrito" });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error agregando producto" });

    }

};

// Para actualziar cantidad en el carrito
export const updateCartItemController = async (req, res) => {

    const { userId, productId, amount } = req.body;

    try {

        const cart = await getActiveCart(userId);

        if (!cart) {
            return res.status(404).json({
                error: "No existe un carrito activo para este usuario"
            });
        }

        await updateCartItem(cart.cart_id, productId, amount);

        res.json({
            message: "Cantidad actualizada exitosamente"
        });

    } catch (error) {

        res.status(500).json({ error: "Error actualizando carrito" });

    }

};

// Para eliminar el producto
export const removeFromCartController = async (req, res) => {

    const { userId, productId } = req.body;

    try {

        const cart = await getActiveCart(userId);

        await removeProductFromCart(cart.cart_id, productId);

        res.json({ message: "Producto eliminado correctamente" });

    } catch (error) {

        res.status(500).json({ error: "Error eliminando producto" });

    }

};


