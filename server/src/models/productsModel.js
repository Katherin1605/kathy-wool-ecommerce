import pool from '../../db/config.js';

export const getProducts = async () => {
    try {
        const res = await pool.query('SELECT * FROM products');
        return res.rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};