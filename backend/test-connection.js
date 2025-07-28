import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  }
);

async function testConnection() {
  try {
    // Test the database connection
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
    
    // Get list of all tables
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\n📋 Available tables in the database:');
    results.forEach(result => {
      console.log(`- ${result.table_name}`);
    });

    // Test query on users table
    const [users] = await sequelize.query('SELECT COUNT(*) as count FROM users');
    console.log(`\n👥 Number of users in database: ${users[0].count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
}

testConnection();
