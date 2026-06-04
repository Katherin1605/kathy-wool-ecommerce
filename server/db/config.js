import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env_host = process.env.DB_HOST;
const env_user = process.env.DB_USER;
const env_password = process.env.DB_PASSWORD;
const env_database = process.env.DB_NAME;




const pool = new pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  },
  allowExitOnIdle: true
});

// FORZAR CODIFICACIÓN AL CONECTARSE
pool.on('connect', (client) => {
  client.query('SET client_encoding TO \'UTF8\';');
});


export default pool;