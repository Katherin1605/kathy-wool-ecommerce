import { createOrder } from "../models/checkoutModel.js";
import { getCartByUser, clearCartDB, getActiveCart } from "../models/cartModel.js";

export const checkout = async (req, res) => {

    const { userId } = req.body;

    try {

        const cartItems = await getCartByUser(userId);

        const total = cartItems.reduce(
            (acc, item) => acc + item.price * item.amount,
            0
        );

        const order = await createOrder(userId, cartItems, total);

        const cart = await getActiveCart(userId);

        await clearCartDB(cart.cart_id);

        res.json(order);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error procesando compra" });

    }

};