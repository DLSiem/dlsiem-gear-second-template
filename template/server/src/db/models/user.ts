import pool from "../../config/config";
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  imageUrl: string;
  role: "user" | "admin";
}

class User {
  static createTable = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      imageUrl TEXT,
      role VARCHAR(255) DEFAULT 'user'
    );`;
    try {
      await pool.query(query);
    } catch (error) {
      console.error(error);
    }
  };
}

export default User;
