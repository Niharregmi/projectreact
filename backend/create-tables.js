import { Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';
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

async function createTables() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Define User model
    const User = sequelize.define('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('admin', 'staff'),
        defaultValue: 'staff'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
      }
    }, {
      tableName: 'users',
      timestamps: true,
      underscored: true
    });

    // Define Attendance model
    const Attendance = sequelize.define('Attendance', {
      date: { type: Sequelize.DATEONLY, allowNull: false },
      checkIn: { type: Sequelize.TIME },
      checkOut: { type: Sequelize.TIME },
      status: { type: Sequelize.ENUM('present', 'absent', 'late'), defaultValue: 'present' }
    });

    // Define Leave model
    const Leave = sequelize.define('Leave', {
      startDate: { type: Sequelize.DATEONLY, allowNull: false },
      endDate: { type: Sequelize.DATEONLY, allowNull: false },
      reason: { type: Sequelize.TEXT },
      type: { type: Sequelize.ENUM('sick', 'vacation', 'personal'), allowNull: false },
      status: { type: Sequelize.ENUM('pending', 'approved', 'rejected'), defaultValue: 'pending' }
    });

    // Define Task model
    const Task = sequelize.define('Task', {
      title: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      priority: { type: Sequelize.ENUM('low', 'medium', 'high'), defaultValue: 'medium' },
      status: { type: Sequelize.ENUM('pending', 'in_progress', 'completed'), defaultValue: 'pending' },
      dueDate: { type: Sequelize.DATEONLY }
    });

    // Define Notice model
    const Notice = sequelize.define('Notice', {
      title: { type: Sequelize.STRING, allowNull: false },
      content: { type: Sequelize.TEXT, allowNull: false },
      priority: { type: Sequelize.ENUM('low', 'medium', 'high'), defaultValue: 'medium' }
    });

    // Set up associations
    User.hasMany(Attendance);
    Attendance.belongsTo(User);

    User.hasMany(Leave);
    Leave.belongsTo(User);

    User.hasMany(Task);
    Task.belongsTo(User);

    User.hasMany(Notice);
    Notice.belongsTo(User);

    // Sync all models with database
    await sequelize.sync({ force: true });
    console.log('✅ All tables created successfully');

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      email: 'admin@worknest.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('✅ Default admin user created');

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

createTables();
