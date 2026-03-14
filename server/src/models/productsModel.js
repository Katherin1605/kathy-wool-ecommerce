import pool from '../../db/config.js';
import format from 'pg-format';

export const getProducts = async ({order_by = 'product_id ASC', limit = 9, page = 1, category_id = 0}) => {
    const [column, direction] = order_by.split(' ');
    const offset = (page - 1) * limit;
    try {
        let formattedQuery;
        if (category_id > 0) {
            formattedQuery = format(
                'SELECT * FROM products WHERE category_id = %s ORDER BY %s %s LIMIT %s OFFSET %s',
                category_id, column, direction, limit, offset
            );
        } else {
            formattedQuery = format(
                'SELECT * FROM products ORDER BY %s %s LIMIT %s OFFSET %s',
                column, direction, limit, offset);
            }
        const res = await pool.query(formattedQuery);
        return res.rows;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    const consultaSQL = {
        text: 'SELECT * FROM products WHERE product_id = $1',
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

export const updateProduct = async (id, { name, category_id, description, price, stock, url_image, isActive }) => {
    const consultaSQL = {
        text: `UPDATE products 
               SET name = $1, category_id = $2, description = $3, price = $4, stock = $5, url_image = $6, "isactive" = $7
               WHERE product_id = $8
               RETURNING *`,
        values: [name, category_id, description, price, stock, url_image, isActive, id]
    };
    try {
        const res = await pool.query(consultaSQL);
        return res.rows[0];
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    const consultaSQL = {
        text: 'DELETE FROM products WHERE product_id = $1 RETURNING *',
        values: [id]
    };
    try {
        const res = await pool.query(consultaSQL);
        return res.rows[0];
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
