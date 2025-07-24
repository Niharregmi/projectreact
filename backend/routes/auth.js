import express from 'express';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import User from '../models/User.js';

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ email }, { username }] 
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    // Create new user (password will be hashed by the model hook)
    const user = await User.create({
      username,
      email,
      password,
      role: role || 'staff'
    });

    // Create JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
    });
    res.status(500).json({ 
        message: 'Server error during registration', 
        error: error.message 
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', {
      timestamp: new Date().toISOString(),
      body: req.body,
      headers: req.headers
    });

    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: !!password });
      return res.status(400).json({ 
        message: 'Email and password are required',
        details: {
          email: !email ? 'Email is required' : null,
          password: !password ? 'Password is required' : null
        }
      });
    }

    // Find user by email
    const user = await User.findOne({ 
      where: { email },
      raw: false 
    }).catch(err => {
      console.error('Database query error:', err);
      throw new Error('Database query failed');
    });
    
    console.log('User lookup result:', {
      found: !!user,
      email: email,
      userId: user?.id
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Validate password
    let isValidPassword = false;
    try {
      isValidPassword = await user.validatePassword(password);
      console.log('Password validation:', { valid: isValidPassword });
    } catch (error) {
      console.error('Password validation error:', error);
      throw new Error('Password validation failed');
    }

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        message: 'Validation error',
        errors: error.errors.map(e => e.message)
      });
    }
    
    res.status(500).json({ 
      message: 'Server error during login',
      error: error.message 
    });
  }
});

// Test endpoint to create a staff user (remove in production)
router.post('/create-test-user', async (req, res) => {
  try {
    const testUser = await User.create({
      username: "teststaff",
      email: "staff@example.com",
      password: "staff123",
      role: "staff"
    });

    res.status(201).json({
      message: 'Test staff user created successfully',
      user: {
        username: testUser.username,
        email: testUser.email,
        role: testUser.role
      }
    });
  } catch (error) {
    console.error('Test user creation error:', error);
    res.status(500).json({ 
      message: 'Error creating test user',
      error: error.message 
    });
  }
});

export default router;