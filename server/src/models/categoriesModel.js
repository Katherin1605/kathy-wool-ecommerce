import pool from '../../db/config.js';

export const getCategories = async () => {
    const consultaSQL = 'SELECT * FROM categories';
    try {
        const res = await pool.query(consultaSQL);
        return res.rows;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};