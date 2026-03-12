import pool from "../../db/config.js"

export const createOrder = async (userId, cartItems, total) => {

    const orderQuery = {
        text: `
        INSERT INTO orders (user_id,total)
        VALUES ($1,$2)
        RETURNING *
        `,
        values: [userId, total]
    };

    const order = await pool.query(orderQuery);

    const orderId = order.rows[0].order_id;

    for (const item of cartItems) {

        const detailQuery = {
            text: `
            INSERT INTO orderDetails
            (order_id,product_id,amount,currentPrice)
            VALUES ($1,$2,$3,$4)
            `,
            values: [
                orderId,
                item.product_id,
                item.amount,
                item.price
            ]
        };

        await pool.query(detailQuery);
    }

    return order.rows[0]
}