import pool from '../../db/config.js'
import bcrypt from "bcryptjs";

export const createUserModel = async({ name, email, password, role}) => {
  const hashedPassword = await bcrypt.hash(password, 10)
  const SQLquery = {
    text: 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    values: [name, email, hashedPassword, role]
  }

  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const findUserbyEmailModel = async (email) => {
  const SQLquery = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  }
  const response = await pool.query(SQLquery)
  return response.rows[0]
}

export const findUserById = async (userId) => {

  const query = `
    SELECT user_id, name, email
    FROM users
    WHERE user_id = $1
  `

  const { rows } = await pool.query(query, [userId])

  return rows[0]

}

export const findOrdersByUser = async (userId) => {

  const query = `
    SELECT o.order_id, o.date, o.total,
           od.amount, od.currentprice,
           p.name, p.url_image
    FROM orders o
    JOIN orderdetails od ON o.order_id = od.order_id
    JOIN products p ON od.product_id = p.product_id
    WHERE o.user_id = $1
    ORDER BY o.date DESC
  `

  const { rows } = await pool.query(query, [userId])

  const grouped = {}
  for (const row of rows) {
    if (!grouped[row.order_id]) {
      grouped[row.order_id] = {
        order_id: row.order_id,
        date: row.date,
        total: row.total,
        items: []
      }
    }
    grouped[row.order_id].items.push({
      name: row.name,
      url_image: row.url_image,
      amount: row.amount,
      price: row.currentprice
    })
  }

  return Object.values(grouped)

}

export const addFavoriteModel = async (userId, productId) => {

  const query = `
    INSERT INTO favorites (user_id, product_id)
    VALUES ($1, $2)
  `

  await pool.query(query, [userId, productId])

}

export const removeFavoriteModel = async (userId, productId) => {

  const query = `
    DELETE FROM favorites
    WHERE user_id = $1
    AND product_id = $2
  `

  await pool.query(query, [userId, productId])

}

export const getFavoritesByUser = async (userId) => {
  const query = `
    SELECT f.favorite_id, p.product_id, p.name, p.price, p.url_image
    FROM favorites f
    JOIN products p ON f.product_id = p.product_id
    WHERE f.user_id = $1
  `
  const { rows } = await pool.query(query, [userId])
  return rows
}

export const updateProfileImage = async (userId, imageUrl) => {
  const query = `
    UPDATE users SET profile_image = $1 WHERE user_id = $2 RETURNING *
  `
  const { rows } = await pool.query(query, [imageUrl, userId])
  return rows[0]
}

export const updateUserModel = async (userId, name, email, bio) => {
  const query = `
    UPDATE users SET name = $1, email = $2, bio = $3
    WHERE user_id = $4
    RETURNING user_id, name, email, role, profile_image, bio
  `
  const { rows } = await pool.query(query, [name, email, profile_image, bio, userId])
  return rows[0]
}