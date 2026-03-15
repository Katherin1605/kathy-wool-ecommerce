import { createOrder } from "../models/checkoutModel.js";

export const checkout = async (req, res) => {

    const { userId, items } = req.body;

    try {

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "No hay productos en el carrito" });
        }
        
        const cartItems = items.map(item => ({
            product_id: item.id,
            price: item.price,
            amount: item.quantity
        }));

        const total = cartItems.reduce(
            (acc, item) => acc + item.price * item.amount,
            0
        );

        const order = await createOrder(userId, cartItems, total);

        res.json(order);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error procesando compra" });

    }

};