import pool from "../../db/config.js"

export const findUserById = async (id) => {

  const query = `
    SELECT id, name, email
    FROM users
    WHERE id = $1
  `

  const { rows } = await pool.query(query, [id])

  return rows[0]

}

export const findOrdersByUser = async (userId) => {

  const query = `
    SELECT *
    FROM orders
    WHERE user_id = $1
  `

  const { rows } = await pool.query(query, [userId])

  return rows

}

export const removeFavorite = async (userId, productId) => {

  const query = `
    DELETE FROM favorites
    WHERE user_id = $1
    AND product_id = $2
  `

  await pool.query(query, [userId, productId])

}
