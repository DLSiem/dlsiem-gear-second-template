import pool from "../../config/config";
// interface UserAttributes {
//   id: number;
//   username: string;
//   email: string;
//   password: string;
//   imageUrl: string;
//   role: "user" | "admin";
// }

interface UserResponse {
  rowCount: number;
  message: string;
  data: any;
}

class User {
  static createTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
      user_id uuid DEFAULT gen_random_uuid(),
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      imageUrl VARCHAR(255) DEFAULT 'https://i.redd.it/0s865ngkc4t81.jpg',
      password VARCHAR(255) NOT NULL,
      role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user','admin')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id)
    );`;
    try {
      console.log("creating user table");
      await pool.query(query);
      console.log("user table created");
    } catch (error) {
      console.error(error);
    }
  };

  // create user
  static createUser = async (
    email: string,
    username: string,
    password: string
  ): Promise<UserResponse> => {
    const query = `INSERT INTO users (email,username , password) VALUES ($1, $2, $3) RETURNING *;`;
    try {
      const res = await pool.query(query, [email, username, password]);
      return {
        rowCount: res.rowCount || 0,
        message:
          res.rowCount === 0 ? "User not created" : "User created successfully",
        data: res.rows,
      };
    } catch (error) {
      console.error(error);
      return {
        rowCount: 0,
        message:
          (error as any).code === "23505"
            ? "User already exists"
            : "Server Error",
        data: null,
      };
    }
  };

  // get user by id
  static getUserById = async (user_id: string): Promise<UserResponse> => {
    const query = `SELECT user_id,username, email, imageUrl,created_at, updated_at FROM users WHERE user_id = $1 ;`;
    try {
      const res = await pool.query(query, [user_id]);
      return {
        rowCount: res.rowCount || 0,
        message:
          res.rowCount === 0 ? "User not found" : "User fetch successfully",
        data: res.rows,
      };
    } catch (error) {
      console.error(error);
      return {
        rowCount: 0,
        message:
          (error as any).code === "22P02" ? "Invalid user id" : "Server Error",
        data: null,
      };
    }
  };

  // get user by email
  static getUserByEmail = async (email: string): Promise<UserResponse> => {
    const query = `SELECT * FROM users WHERE email = $1 ;`;
    try {
      const res = await pool.query(query, [email]);
      return {
        rowCount: res.rowCount || 0,
        message:
          res.rowCount === 0 ? "User not found" : "User fetch successfully",
        data: res.rows,
      };
    } catch (error) {
      console.error(error);
      return {
        rowCount: 0,
        message:
          (error as any).code === "22P02" ? "Invalid user id" : "Server Error",
        data: null,
      };
    }
  };

  // get all users from the database
  static getAllUsers = async (): Promise<UserResponse> => {
    const query = `SELECT user_id,username,email,imageUrl,role FROM users;`;
    try {
      const res = await pool.query(query);
      return {
        rowCount: res.rowCount || 0,
        message: res.rowCount === 0 ? "No user found" : "Users found",
        data: res.rows,
      };
    } catch (error) {
      console.error(error);
      return {
        rowCount: 0,
        message: "Server Error",
        data: null,
      };
    }
  };

  // delete user by id
  static deleteUserById = async (user_id: string): Promise<UserResponse> => {
    const query = `DELETE FROM users WHERE user_id = $1 RETURNING username, email, imageUrl, role;`;
    try {
      const res = await pool.query(query, [user_id]);
      return {
        rowCount: res.rowCount || 0,
        message:
          res.rowCount === 0 ? "User not found" : "User deleted successfully",
        data: res.rows,
      };
    } catch (error) {
      return {
        rowCount: 0,
        message:
          (error as any).code === "22P02" ? "Invalid user id" : "Server Error",
        data: null,
      };
    }
  };

  // update user by id dynamically
  static updateUserById = async (
    user_id: string,
    username: string,
    imageUrl: string,
    role: string
  ): Promise<UserResponse> => {
    let query = "UPDATE users SET ";
    const fields: string[] = [];
    const values: string[] = [];

    if (username) {
      fields.push("username = $" + (fields.length + 1));
      values.push(username);
    }
    if (imageUrl) {
      fields.push("imageUrl = $" + (fields.length + 1));
      values.push(imageUrl);
    }
    if (role) {
      fields.push("role = $" + (fields.length + 1));
      values.push(role);
    }
    console.log(fields);
    console.log(values);
    query +=
      fields.join(", ") +
      ", updated_at = CURRENT_TIMESTAMP" +
      " WHERE user_id = $" +
      (fields.length + 1) +
      " RETURNING user_id, username, email, imageUrl, role;";
    try {
      const res = await pool.query(query, [...values, user_id]);
      return {
        rowCount: res.rowCount || 0,
        message:
          res.rowCount === 0 ? "User not found" : "User updated successfully",
        data: res.rows,
      };
    } catch (error) {
      return {
        rowCount: 0,
        message:
          (error as any).code === "23514" ? "Invalid role" : "Server Error",
        data: null,
      };
    }
  };

  // update userTable
  static updateUserTable = async () => {
    try {
      // shifting data
      await pool.query(
        `
        INSERT INTO users (username, email, imageUrl, password, role)
        SELECT username, email, imageUrl, password, role FROM temp;
        `
      );
      console.log("data shifted to users table");

      // // populate imageUrl column if not exist
      // await pool.query(
      //   `UPDATE users
      //  SET imageUrl = 'https://i.redd.it/0s865ngkc4t81.jpg'
      // WHERE imageUrl IS NULL;
      //  `
      // );
      // console.log("imageUrl column populated");
      // //add unique constraint to email column
      // await pool.query(
      //   `ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE(email);`
      // );
      // console.log("unique constraint added to email column");
      // //add imageUrl column
      // await pool.query(
      //   `ALTER TABLE users ALTER COLUMN imageUrl SET DEFAULT 'https://i.redd.it/0s865ngkc4t81.jpg';`
      // );
      // console.log("imageUrl column added");
    } catch (error) {
      console.error(error);
    }
  };
}

export default User;
