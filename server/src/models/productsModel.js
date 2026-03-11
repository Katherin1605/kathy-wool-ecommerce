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

export const getProductById = async (id) => {
    const consultaSQL = {
        text: 'SELECT * FROM products WHERE id = $1',
        values: [id]
    };
    try {
        const res = await pool.query(consultaSQL);
        return res.rows[0];
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};