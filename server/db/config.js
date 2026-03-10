import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env_host = process.env.DB_HOST;
const env_user = process.env.USER;
const env_password = process.env.DB_PASSWORD;
const env_database = process.env.DB_NAME;


const pool = new pg.Pool({
    host: env_host,
    user: env_user,
    password: env_password,
    database: env_database,
    allowExitOnIdle: true
});

export default pool;