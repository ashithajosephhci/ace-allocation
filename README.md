# AceAllocation - RTO Management System

A comprehensive full-stack web application for timetabling and class allocation designed specifically for Registered Training Organizations (RTOs) in Australia.

## 🏗️ Architecture

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and shadcn/ui components
- **Backend**: Python FastAPI with JWT authentication
- **Database**: PostgreSQL (Supabase)
- **Deployment**: Frontend runs in v0, Backend runs locally

## 🚀 Quick Start

### 1. Database Setup

Run these SQL commands in your Supabase SQL editor:

\`\`\`sql
-- Create users table
\i scripts/01_create_users_table.sql

-- Insert test users
\i scripts/02_insert_test_users.sql
\`\`\`

### 2. Backend Setup (Local)

\`\`\`bash
# Install Python dependencies
pip install -r requirements.txt

# Run the FastAPI server
python scripts/backend_main.py
\`\`\`

The API will be available at `http://localhost:8000`

### 3. Frontend (v0)

The frontend is already running in v0 and will automatically connect to your local backend.

## 🔐 Test Credentials

| User Type | Email | Password | Description |
|-----------|-------|----------|-------------|
| Super Admin | admin@test.com | password123 | System administration |
| RTO Manager | manager@test.com | password123 | RTO management |
| Trainer | trainer@test.com | password123 | Class instruction |
| Student | student@test.com | password123 | Course enrollment |

## 📊 User Roles & Permissions

### Super Admin
- Overall application management
- Manage multiple RTOs
- System configuration
- User management across all RTOs

### RTO Manager
- Manage specific RTO
- Trainer and student management
- Class scheduling and allocation
- RTO-specific settings

### Trainer
- View assigned classes and schedules
- Manage enrolled students
- Access course materials
- Update class progress

### Student
- View personal timetable
- Track course progress
- Access assignments and materials
- View grades and feedback

## 🛠️ API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user info

### Health & Monitoring
- `GET /` - API status
- `GET /health` - Health check with database status
- `GET /users/count` - Total user count
- `GET /users/types` - User count by type

## 🔧 Development

### Backend Development
\`\`\`bash
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
python scripts/backend_main.py

# Or use uvicorn directly
uvicorn scripts.backend_main:app --reload --host 0.0.0.0 --port 8000
\`\`\`

### Database Migrations
\`\`\`sql
-- Add new tables or modify existing ones
-- Always use IF NOT EXISTS for safety
-- Add proper indexes and constraints
\`\`\`

## 🌟 Features

### Current Features
- ✅ User authentication (JWT-based)
- ✅ Role-based access control
- ✅ Responsive dashboard design
- ✅ Real-time backend connection monitoring
- ✅ User registration and management

### Planned Features
- 🔄 Class scheduling and timetabling
- 🔄 RTO management and configuration
- 🔄 Student enrollment system
- 🔄 Trainer assignment and management
- 🔄 Knowledge Hub integration
- 🔄 Reporting and analytics
- 🔄 Mobile app support

## 🔒 Security

- Password hashing with bcrypt
- JWT token-based authentication
- CORS protection
- SQL injection prevention
- Input validation and sanitization

## 📝 Environment Variables

Create a `.env` file based on `.env.example`:

\`\`\`env
DATABASE_URL=your_postgresql_connection_string
SECRET_KEY=your_jwt_secret_key
ACCESS_TOKEN_EXPIRE_MINUTES=30
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**AceAllocation** - Streamlining RTO management across Australia 🇦🇺
