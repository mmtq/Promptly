import { Client } from 'pg';

let isConnected = false; // track the connection
let client;

export const connectToDB = async () => {
  if (isConnected) {
    console.log('PostgreSQL is already connected');
    return;
  }

  try {
    // Create a new PostgreSQL client instance
    client = new Client({
      user: process.env.PG_USER,          // Your PostgreSQL username (e.g., 'avnadmin')
      host: process.env.PG_HOST,          // Your PostgreSQL host (e.g., 'pg-ff93086-mirtarhimul-e348.d.aivencloud.com')
      database: process.env.PG_DATABASE,  // Your PostgreSQL database name (e.g., 'defaultdb')
      password: process.env.PG_PASSWORD,  // Your PostgreSQL password
      port: process.env.PG_PORT,          // PostgreSQL port (e.g., 23170)
      ssl: { rejectUnauthorized: false }, // SSL connection (required for Aiven)
    });

    // Connect to the PostgreSQL database
    await client.connect();
    
    isConnected = true;
    console.log('PostgreSQL connected');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
};

// Export the client in case you need to query the database directly
export { client };
