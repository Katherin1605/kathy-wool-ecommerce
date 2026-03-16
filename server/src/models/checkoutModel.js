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
};

export const getAllOrders = async () => {
    const query = `
        SELECT o.order_id, o.date, o.total, u.name as customer, u.email,
               od.amount, od.currentprice, p.name as product_name, p.url_image
        FROM orders o
        JOIN users u ON o.user_id = u.user_id
        JOIN orderdetails od ON o.order_id = od.order_id
        JOIN products p ON od.product_id = p.product_id
        ORDER BY o.date DESC
    `
    const { rows } = await pool.query(query)

    const grouped = {}
    for (const row of rows) {
        if (!grouped[row.order_id]) {
            grouped[row.order_id] = {
                order_id: row.order_id,
                date: row.date,
                total: row.total,
                customer: row.customer,
                email: row.email,
                items: []
            }
        }
        grouped[row.order_id].items.push({
            name: row.product_name,
            url_image: row.url_image,
            amount: row.amount,
            price: row.currentprice
        })
    }

    return Object.values(grouped)
};