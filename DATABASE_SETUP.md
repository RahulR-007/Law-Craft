# LawCraft - Database & Razorpay Integration Setup

This document provides complete setup instructions for the LawCraft application with database and Razorpay payment integration.

## 🗄️ Database Structure

The application uses MySQL with the following structure:

### Tables

#### `signdata` (Users)
- `id` - Auto-increment primary key
- `fullname` - Unique username (VARCHAR 255)
- `email` - Unique email address (VARCHAR 255)  
- `password` - Hashed password (VARCHAR 255)
- `plan_name` - Current subscription plan ('Free', 'Advanced', 'Premium')
- `tokens` - Available document generation tokens (INT)
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

#### `payments` (Payment History)
- `id` - Auto-increment primary key
- `payment_id` - Razorpay payment ID (VARCHAR 255)
- `email` - User email (foreign key)
- `amount` - Payment amount in INR (DECIMAL 10,2)
- `plan_name` - Purchased plan name
- `status` - Payment status (default: 'completed')
- `created_at` - Payment timestamp

## 💳 Pricing Structure

Based on the original PHP implementation:

| Plan | Price | Tokens | Features |
|------|-------|---------|----------|
| **Free** | ₹0 | 2 | Unlimited ChatBot queries, 2 document generations |
| **Advanced** | ₹29 | 10 | Unlimited ChatBot queries, 10 document generations, +5 extra tokens (paid) |
| **Premium** | ₹49 | 20 | Unlimited ChatBot queries, 20 document generations, +7 extra tokens (free) |

## 🚀 Setup Instructions

### 1. Database Setup

```bash
# 1. Install MySQL (if not already installed)
# 2. Run the setup script
mysql -u root -p < database/setup.sql

# 3. Verify tables are created
mysql -u root -p lawcraft
SHOW TABLES;
```

### 2. Backend Server Setup

```bash
# Install backend dependencies
npm run install:server

# Configure environment variables
cd server
cp .env.example .env

# Edit .env file with your settings:
# - Database credentials
# - Razorpay keys
# - JWT secrets
```

### 3. Environment Configuration

Update `server/.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=lawcraft

# Razorpay Configuration (from original PHP code)
RAZORPAY_KEY_ID=rzp_test_Deqs4AJQSSVZn0
RAZORPAY_KEY_SECRET=your_razorpay_secret_key

# Security
JWT_SECRET=your-jwt-secret
SESSION_SECRET=your-session-secret

# Server
PORT=5000
NODE_ENV=development
```

### 4. Running the Application

```bash
# Terminal 1: Start backend server
npm run server:dev

# Terminal 2: Start frontend (different terminal)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/user/profile` - Get user profile

### Pricing & Payments
- `GET /api/pricing/plans` - Get available plans
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/process` - Process payment
- `GET /api/payment/history` - Get payment history

### Token Management
- `POST /api/user/update-tokens` - Update user tokens (for document generation)

## 🔐 Razorpay Integration

The integration matches the original PHP implementation:

### Flow
1. User selects a plan
2. Frontend calls `/api/payment/create-order`
3. Razorpay checkout opens with order details
4. On successful payment, Razorpay calls the handler
5. Frontend calls `/api/payment/process` with payment ID
6. Backend updates user plan and tokens
7. User receives confirmation

### Key Details
- **Test Key**: `rzp_test_Deqs4AJQSSVZn0` (from original code)
- **Currency**: INR
- **Theme Color**: `#970fff` (LawCraft purple)

## 🔍 Migration from PHP

The React implementation maintains compatibility with the original PHP system:

### Database Schema
- ✅ Same table names (`signdata`, `payments`)
- ✅ Same field names and types
- ✅ Same pricing structure
- ✅ Same Razorpay key

### Plan Logic
- ✅ Free plan: 2 tokens
- ✅ Advanced plan: +10 tokens (₹29)
- ✅ Premium plan: +20 tokens (₹49)
- ✅ Token addition on upgrade

## 🧪 Testing

### Test Users
You can create test users through the registration form or add sample data:

```sql
-- Test user (password: test123)
INSERT INTO signdata (fullname, email, password, plan_name, tokens) 
VALUES ('testuser', 'test@example.com', '$2a$10$hashed_password_here', 'Free', 2);
```

### Test Payments
Use Razorpay test cards for payment testing:
- **Card**: 4111 1111 1111 1111
- **CVV**: Any 3 digits
- **Expiry**: Any future date

## 🚨 Security Notes

1. **Change default secrets** in production
2. **Use HTTPS** for Razorpay in production
3. **Validate all payments** server-side
4. **Hash passwords** properly (bcryptjs with salt rounds)
5. **Sanitize database inputs** (prepared statements used)

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check MySQL service
sudo systemctl status mysql

# Test connection
mysql -u root -p

# Check if database exists
SHOW DATABASES;
```

### Razorpay Issues
1. Verify test/live keys match environment
2. Check webhook URLs if using webhooks
3. Ensure CORS is properly configured

### Backend Issues
```bash
# Check if port 5000 is available
netstat -an | grep 5000

# View server logs
cd server && npm run dev
```

This setup provides a complete, production-ready payment system that maintains compatibility with the original PHP implementation while leveraging modern React/TypeScript architecture.
