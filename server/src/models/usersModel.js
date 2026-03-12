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