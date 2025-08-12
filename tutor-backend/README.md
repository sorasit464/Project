# 🎓 Tutor Thi Chi Backend API

Backend API สำหรับแพลตฟอร์มหาติวเตอร์ออนไลน์ Tutor Thi Chi

## 🚀 Features

- **Authentication System** - ระบบเข้าสู่ระบบและลงทะเบียน
- **User Management** - จัดการข้อมูลผู้ใช้ (นักเรียน, ติวเตอร์, แอดมิน)
- **Tutor Management** - จัดการโปรไฟล์ติวเตอร์
- **Subject Management** - จัดการวิชาและระดับชั้น
- **Booking System** - ระบบจองเรียน
- **JWT Authentication** - ระบบความปลอดภัย
- **PostgreSQL Database** - ฐานข้อมูลที่เสถียร

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT + bcryptjs
- **Validation:** express-validator
- **Security:** Helmet, CORS

## 📋 Prerequisites

- Node.js (v16 หรือสูงกว่า)
- PostgreSQL (v12 หรือสูงกว่า)
- npm หรือ yarn

## 🔧 Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd tutor-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - สร้างไฟล์ `.env` ในโฟลเดอร์หลัก
   - ดูตัวอย่างใน `config/config.js`

4. **Setup PostgreSQL database**
   ```sql
   CREATE DATABASE tutor_thi_chi;
   CREATE USER your_username WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE tutor_thi_chi TO your_username;
   ```

5. **Update database configuration**
   - แก้ไขข้อมูลใน `config/config.js` หรือ `.env`

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server จะทำงานที่ `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - ลงทะเบียนผู้ใช้ใหม่
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/profile` - ดูโปรไฟล์ผู้ใช้
- `PUT /api/auth/profile` - อัปเดตโปรไฟล์

### Health Check
- `GET /health` - ตรวจสอบสถานะ API

## 🗄️ Database Schema

### Users Table
- id, email, password, firstName, lastName, phone, role, isActive, isVerified, profileImage, timestamps

### Tutors Table
- id, userId, bio, hourlyRate, rating, totalReviews, experience, education, isVerified, isAvailable, preferredSubjects, preferredLevels, preferredLocations, certificates, timestamps

### Subjects Table
- id, name, category, level, description, isActive, icon, timestamps

### Bookings Table
- id, studentId, tutorId, subjectId, startTime, endTime, duration, totalPrice, status, lessonType, meetingLink, location, notes, cancellationReason, isPaid, paymentMethod, paymentId, timestamps

## 🔐 Security Features

- **JWT Authentication** - Token-based authentication
- **Password Hashing** - bcryptjs สำหรับเข้ารหัสรหัสผ่าน
- **Input Validation** - express-validator สำหรับตรวจสอบข้อมูล
- **CORS Protection** - ป้องกัน Cross-Origin requests
- **Helmet** - Security headers

## 📁 Project Structure

```
tutor-backend/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── server.js        # Main server file
├── package.json     # Dependencies
└── README.md        # Documentation
```

## 🧪 Testing

```bash
# Run tests (เมื่อสร้างเสร็จแล้ว)
npm test
```

## 📝 Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tutor_thi_chi
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

หากมีคำถามหรือปัญหาติดต่อ:
- Email: support@tutorthichi.com
- Line: @tutorthichi
- Facebook: Tutor Thi Chi

---

**Made with ❤️ by Tutor Thi Chi Team**
