#!/usr/bin/env node

/**
 * This script initializes the Neon database with the schema defined in lib/db-schema.sql
 * It should be run after setting up your Neon database and setting the DATABASE_URL environment variable
 */

const { Client } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL environment variable is not set');
    console.error('Please set it to your Neon database connection string');
    process.exit(1);
  }

  // Create a new client
  const client = new Client(process.env.DATABASE_URL);
  
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to Neon database');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, '..', 'lib', 'db-schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the schema SQL
    console.log('Creating database schema...');
    await client.query(schemaSQL);
    
    console.log('Database schema created successfully');
    
    // Add some sample data for FAQ categories
    console.log('Adding sample FAQ categories...');
    await client.query(`
      INSERT INTO faq_categories (name, description)
      VALUES 
        ('General', 'General questions about LOTA Canada'),
        ('Programs', 'Questions about our programs and initiatives'),
        ('Membership', 'Questions about becoming a member'),
        ('Events', 'Questions about our events and activities')
      ON CONFLICT (name) DO NOTHING;
    `);
    
    // Add some sample FAQ items
    console.log('Adding sample FAQ items...');
    await client.query(`
      INSERT INTO faq_items (category_id, question, answer)
      VALUES 
        ((SELECT id FROM faq_categories WHERE name = 'General'), 
         'What is LOTA Canada?', 
         'LOTA Canada is a non-profit organization dedicated to supporting and empowering communities through various programs and initiatives.'),
        ((SELECT id FROM faq_categories WHERE name = 'Programs'), 
         'How can I apply for the mentorship program?', 
         'You can apply for our mentorship program through the Programs page on our website. Applications are reviewed on a rolling basis.'),
        ((SELECT id FROM faq_categories WHERE name = 'Membership'), 
         'What are the benefits of becoming a member?', 
         'Members receive exclusive access to our events, networking opportunities, and resources to help advance their personal and professional growth.'),
        ((SELECT id FROM faq_categories WHERE name = 'Events'), 
         'How often do you host events?', 
         'We host various events throughout the year, including workshops, seminars, and networking sessions. Check our Events page for upcoming events.')
      ON CONFLICT DO NOTHING;
    `);
    
    console.log('Sample data added successfully');
    console.log('Database initialization complete!');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await client.end();
  }
}

initializeDatabase();
