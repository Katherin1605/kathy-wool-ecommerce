import pool from "../../db/config.js";

    //Modelo para obtener el carrito del usuario
export const getCartByUser = async (userId) => {
    const query = {
        text: `
        SELECT p.product_id, p.name, p.price, p.url_image, cd.amount
        FROM cart c
        JOIN cartDetails cd ON c.cart_id = cd.cart_id
        JOIN products p ON cd.product_id = p.product_id
        WHERE c.user_id = $1 AND c.isActive = true
        `,
        values: [userId]
    };

    const result = await pool.query(query)
    return result.rows
};

    //Modelo para crear carrito si no existe
export const createCartIfNotExists = async (userId) => {
    const query = {
        text: `
        INSERT INTO cart (user_id)
        VALUES ($1)
        RETURNING *
        `,
        values: [userId]
    };

    const result = await pool.query(query);
    return result.rows[0];
};

    //Obtener carrito activo
export const getActiveCart = async (userId) => {
    const query = {
        text: `
        SELECT * FROM cart
        WHERE user_id = $1 AND isActive = true
        `,
        values: [userId]
    };

    const result = await pool.query(query);
    return result.rows[0];
};


    //Para agregar producto al carrito
export const addProductToCart = async (cartId, productId) => {
    const query = {
        text: `
        INSERT INTO cartDetails (cart_id, product_id, amount)
        VALUES ($1,$2,1)
        ON CONFLICT (cart_id, product_id)
        DO UPDATE SET amount = cartDetails.amount + 1
        `,
        values: [cartId, productId]
    };

    await pool.query(query);
};

// Para actualizar la cantidad de un producto en el carrito
export const updateCartItem = async (cartId, productId, amount) => {
    const query = {
        text: `
        UPDATE cartDetails
        SET amount=$1
        WHERE cart_id=$2 AND product_id=$3
        `,
        values: [amount, cartId, productId]
    }

    await pool.query(query)
};

    //Para eliminar un producto del carrito
export const removeProductFromCart = async (cartId, productId) => {

    const query = {
        text: `
        DELETE FROM cartDetails
        WHERE cart_id = $1 AND product_id = $2
        `,
        values: [cartId, productId]
    };

    await pool.query(query);
};

    //limpiar el carrito
export const clearCartDB = async (cartId) => {
    const query = {
        text: `
        DELETE FROM cartDetails
        WHERE cart_id = $1
        `,
        values: [cartId]
    };

    await pool.query(query);
};

