import { createOrder, getAllOrders } from "../models/checkoutModel.js";
import { MercadoPagoConfig, Preference } from 'mercadopago';
import dotenv from 'dotenv';

dotenv.config();

const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN 
});

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

        // Acá están los ítems con el formato exacto que pide Mercado Pago
        const mercadoPagoItems = items.map(item => ({
            id: String(item.id),
            title: item.name,
            quantity: Number(item.quantity),
            unit_price: Number(item.price),
            currency_id: "CLP"
        }));

        const preferenceClient = new Preference(client);
        
        const preferenceResponse = await preferenceClient.create({
            body: {
                items: mercadoPagoItems,
                back_urls: {
                    success: "https://www.kathywool.cl/checkout/success",
                    failure: "https://www.kathywool.cl/checkout/failure",
                    pending: "https://www.kathywool.cl/checkout/pending"
                },
                auto_return: "approved",
                external_reference: String(order.order_id) // Vincula el ID de la BD con Mercado Pago
            }
        });

        // Acá se responde al frontend con los datos de la orden Y el id de Mercado Pago
        res.json({
            order: order,
            preferenceId: preferenceResponse.id
        });

    } catch (error) {
        console.error("Error en el flujo de Mercado Pago:", error);
        res.status(500).json({ error: "Error procesando compra e integración de pago" });
    }
};

export const fetchAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo pedidos" });
    }
};