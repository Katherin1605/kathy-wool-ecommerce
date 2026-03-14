import pool from '../../db/config.js';
import format from 'pg-format';

export const getProducts = async ({order_by = 'product_id ASC', limit = 9, page = 1, category_id = 0}) => {
    const [column, direction] = order_by.split(' ');
    const offset = (page - 1) * limit;
    try {
        let formattedQuery;
        if (category_id > 0) {
            formattedQuery = format(
                'SELECT p.product_id, p.name, p.price, p.url_image, COALESCE(CEIL(AVG(r.stars)),0) as stars FROM products p LEFT JOIN reviews r ON p.product_id = r.product_id GROUP BY p.product_id HAVING p.category_id = %s ORDER BY %s %s LIMIT %s OFFSET %s',
                category_id, column, direction, limit, offset
            );
        } else {
            formattedQuery = format(
                'SELECT p.product_id, p.name, p.price, p.url_image, COALESCE(CEIL(AVG(r.stars)),0) as stars FROM products p LEFT JOIN reviews r ON p.product_id = r.product_id GROUP BY p.product_id ORDER BY %s %s LIMIT %s OFFSET %s',
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
        text: 'SELECT p.product_id, p.name, p.price, p.url_image, COALESCE(CEIL(AVG(r.stars)),0) as stars FROM products p LEFT JOIN reviews r ON p.product_id = r.product_id GROUP BY p.product_id HAVING p.product_id = $1',
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

export const getBestProducts = async () => {
    const consultaSQL = 'SELECT p.product_id, p.name, p.price, p.url_image, COALESCE(CEIL(AVG(r.stars)),0) as stars FROM products p LEFT JOIN reviews r ON p.product_id = r.product_id GROUP BY p.product_id ORDER BY stars DESC LIMIT 3';
    try {
        const res = await pool.query(consultaSQL);

        return res.rows;
    } catch (error) {
        console.error('Error fetching best products:', error);
        throw error;
    }
};

export const createProductModel = async ({ name, category_id, description, price, stock, url_image, isactive}) => {
    const consultaSQL = {
        text: 'INSERT INTO products (name, category_id, description, price, stock, url_image, isactive) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        values: [name, category_id, description, price, stock, url_image, isactive]
    };
    try {
        const res = await pool.query(consultaSQL);
        return res.rows[0];
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};
