import { Client } from '@neondatabase/serverless';

/**
 * Creates a new database client using the Neon serverless driver
 * @returns A connected database client
 */
export async function createClient() {
  // Get the database URL from environment variables
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  // Create a new client
  const client = new Client(databaseUrl);
  
  // Connect to the database
  await client.connect();
  
  return client;
}

/**
 * Executes a query against the Neon database
 * @param query SQL query to execute
 * @param params Query parameters
 * @returns Query result
 */
export async function executeQuery(query: string, params: any[] = []) {
  const client = await createClient();
  
  try {
    const result = await client.query(query, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    // Always close the connection when done
    await client.end();
  }
}
