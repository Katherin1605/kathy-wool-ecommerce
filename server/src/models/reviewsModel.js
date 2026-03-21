import pool from '../../db/config.js'

export const addReviewModel = async (userId, productId, stars) => {
    const query = {
        text: `INSERT INTO reviews (user_id, product_id, stars) 
               VALUES ($1, $2, $3) 
               ON CONFLICT (user_id, product_id) DO UPDATE SET stars = $3
               RETURNING *`,
        values: [userId, productId, stars]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const getReviewsByProduct = async (productId) => {
    const query = {
        text: `SELECT r.stars, r.created_at, u.name 
               FROM reviews r 
               JOIN users u ON r.user_id = u.user_id 
               WHERE r.product_id = $1 
               ORDER BY r.created_at DESC`,
        values: [productId]
    }
    const { rows } = await pool.query(query)
    return rows
}

export const getUserReview = async (userId, productId) => {
    const query = {
        text: 'SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2',
        values: [userId, productId]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

export const hasUserPurchased = async (userId, productId) => {
    const query = {
        text: `SELECT 1 FROM orders o
               JOIN orderdetails od ON o.order_id = od.order_id
               WHERE o.user_id = $1 AND od.product_id = $2
               LIMIT 1`,
        values: [userId, productId]
    }
    const { rows } = await pool.query(query)
    return rows.length > 0
}