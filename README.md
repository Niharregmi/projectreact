# WorkNest - Employee Management System

A modern, full-stack employee management system built with React and Node.js, featuring comprehensive HR functionalities including attendance tracking, task management, and leave management.

## About This Project

This is a college project developed as part of the curriculum at **Softwarica College of IT and E-commerce**. The project demonstrates practical application of modern web development technologies in building a comprehensive employee management solution.

**Developer**: Nihar Regmi  
**Institution**: Softwarica College of IT and E-commerce  
**Project Type**: Academic Assignment

## Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- Role-based access control (Admin/Staff)
- Password visibility toggle
- Protected routes

### 👥 User Management
- Staff registration and profile management
- Admin dashboard with system overview
- User role assignments

### ⏰ Attendance System
- Check-in/check-out functionality
- Attendance history tracking
- Status monitoring (Present/Absent/Late)

### 📋 Task Management
- Task assignment and tracking
- Status updates (Pending/In Progress/Completed)
- Due date management

### 🏖️ Leave Management
- Leave request submission
- Admin approval workflow
- Leave history tracking

### 📊 Dashboard & Reports
- Real-time statistics
- User activity overview
- System performance metrics

## Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **React Router** for navigation
- **Context API** for state management
- **CSS Modules** for styling
- **Responsive Design** principles

### Backend
- **Node.js** with Express.js framework
- **PostgreSQL** database
- **Sequelize ORM** for database operations
- **JWT** for authentication
- **Bcrypt** for password hashing

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Niharregmi/projectreact.git
   cd projectreact
   ```

2. **Install Frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Create .env file in backend directory
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Database Setup**
   ```bash
   cd backend
   npm run setup-db
   ```

6. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend (from backend directory)
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend (from frontend directory)
   cd frontend
   npm run dev
   ```

7. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## Project Structure

```
projectreact/
├── frontend/              # React Frontend Application
│   ├── src/               # React source code
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   └── lib/           # Utilities and API client
│   ├── public/            # Static assets
│   ├── Testing/           # Frontend test suites
│   └── package.json       # Frontend dependencies
├── backend/               # Node.js Backend Application
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── config/            # Database configuration
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

## Testing

Comprehensive test suite included with coverage for authentication, components, and API endpoints.

```bash
# Frontend Testing
cd frontend/Testing
npm install
npm test

# Backend Testing
cd backend
npm test
```

See [frontend/Testing/README.md](frontend/Testing/README.md) for detailed testing information.

## Support

For support and questions, please open an issue in the GitHub repository.

## Acknowledgments

Special thanks to **Rohit Shrestha**, Module Leader at Softwarica College of IT and E-commerce, for his guidance and support throughout the development of this project.

## Academic Context

This project was developed as part of the academic curriculum at Softwarica College of IT and E-commerce, demonstrating the practical implementation of:
- Full-stack web development principles
- Database design and management
- User authentication and authorization
- REST API development
- Modern frontend frameworks
- Testing methodologies
