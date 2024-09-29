import dotenv from "dotenv";
import pg from "pg";

const { Pool } = pg;
dotenv.config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT } = process.env;

const pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: parseInt(DB_PORT!),
  database: DB_NAME,
});

export default pool;
