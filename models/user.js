import { client } from '../utils/database'; // import the client from your database.js

// Function to create the users table (if not exists)
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      username VARCHAR(255) NOT NULL,
      image VARCHAR(255),
      CONSTRAINT username_check CHECK (username ~* '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
    );
  `;

  await client.query(query);
};

// Create a new user
const createUser = async ({ email, username, image }) => {
  const query = `
    INSERT INTO users (email, username, image)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [email, username, image];

  const result = await client.query(query, values);
  return result.rows[0];
};

// Get user by email
const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const result = await client.query(query, [email]);
  return result.rows[0];
};

// Get user by username
const getUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = $1;`;
  const result = await client.query(query, [username]);
  return result.rows[0];
};

// Export functions for use in other parts of the application
export { createUserTable, createUser, getUserByEmail, getUserByUsername };
