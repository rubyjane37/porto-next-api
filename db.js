import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set. Pastikan sudah mengisi .env dengan DATABASE_URL yang benar!');
}

// Enhanced connection pool configuration
const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('neon.tech') ? { 
    rejectUnauthorized: false 
  } : false,
  // Connection pool settings for better performance
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to database successfully');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end();
  process.exit(0);
});

export default pool; 