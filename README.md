# 🚗 Vehicle Rental System API

**Live API:** https://car-rental-system-ten-puce.vercel.app/

A robust backend API for managing vehicle rentals with role-based authentication, built with Node.js, TypeScript, and PostgreSQL.

---

## ✨ Features

### Core Functionality
- **🔐 Secure Authentication** - JWT-based auth with role-based access control (Admin & Customer)
- **🚙 Vehicle Management** - Complete CRUD operations for vehicle inventory
- **👥 User Management** - Admin controls for user accounts and role assignment
- **📅 Booking System** - Automated rental processing with dynamic pricing calculation
- **💰 Smart Pricing** - Automatic cost calculation based on rental duration
- **📊 Availability Tracking** - Real-time vehicle availability status updates

### Security Features
- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization middleware
- Protected API endpoints

### Business Logic
- Vehicle availability validation before booking
- Automatic price calculation (daily rate × duration)
- Booking cancellation with date restrictions
- Auto-status updates on rental return
- Prevent deletion of users/vehicles with active bookings

---

## 🛠️ Technology Stack

**Backend**
- Node.js
- TypeScript
- Express.js

**Database**
- PostgreSQL

**Authentication & Security**
- JSON Web Tokens (JWT)
- bcrypt

**Development Tools**
- TypeScript Compiler
- ESLint & Prettier
- Nodemon

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn
- Git

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vehicle-rental-system.git
cd vehicle-rental-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/vehicle_rental_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=3000
NODE_ENV=development
```


### 5. Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm run build
npm start
```

The API will be running at `http://localhost:5000`

---

## 📖 Usage Instructions

### API Base URL
```
Local: http://localhost:3000/api/v1
Production: https://your-deployment-url.com/api/v1
```

### Authentication Flow

**1. Register a New User**
```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "role": "customer"
}
```

**2. Login**
```bash
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response includes JWT token:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": "...", "name": "John Doe", "role": "customer" }
}
```

**3. Use Token in Requests**
```bash
GET /api/v1/vehicles
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Common Operations

**View Available Vehicles**
```bash
GET /api/v1/vehicles
```

**Create a Booking** (Customer/Admin)
```bash
POST /api/v1/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicle_id": "vehicle-uuid-here",
  "rent_start_date": "2025-01-15",
  "rent_end_date": "2025-01-20"
}
```

**View My Bookings** (Customer)
```bash
GET /api/v1/bookings
Authorization: Bearer <token>
```

**Add New Vehicle** (Admin only)
```bash
POST /api/v1/vehicles
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "vehicle_name": "Toyota Camry",
  "type": "car",
  "registration_number": "ABC123",
  "daily_rent_price": 50.00,
  "availability_status": "available"
}
```
