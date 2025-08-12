-- Tutor Thi Chi Database Setup Script
-- PostgreSQL Database Creation

-- Create database
-- CREATE DATABASE tutor_thi_chi;

-- Connect to the database
\c tutor_thi_chi;

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('student', 'tutor', 'admin');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled', 'rejected');
CREATE TYPE lesson_type AS ENUM ('online', 'offline', 'hybrid');

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL DEFAULT 'student',
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tutors table
CREATE TABLE tutors (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    bio TEXT,
    hourly_rate DECIMAL(10,2) NOT NULL DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    experience INTEGER DEFAULT 0,
    education TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    preferred_subjects TEXT[] DEFAULT '{}',
    preferred_levels TEXT[] DEFAULT '{}',
    preferred_locations TEXT[] DEFAULT '{}',
    certificates TEXT[] DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create subjects table
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    icon VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tutor_id INTEGER NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    duration INTEGER NOT NULL, -- minutes
    total_price DECIMAL(10,2) NOT NULL,
    status booking_status DEFAULT 'pending',
    lesson_type lesson_type DEFAULT 'online',
    meeting_link VARCHAR(500),
    location VARCHAR(255),
    notes TEXT,
    cancellation_reason TEXT,
    is_paid BOOLEAN DEFAULT FALSE,
    payment_method VARCHAR(50),
    payment_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tutor_id INTEGER NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tutor_subjects table (Many-to-Many relationship)
CREATE TABLE tutor_subjects (
    tutor_id INTEGER NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
    subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    PRIMARY KEY (tutor_id, subject_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_tutors_user_id ON tutors(user_id);
CREATE INDEX idx_tutors_rating ON tutors(rating);
CREATE INDEX idx_bookings_student_id ON bookings(student_id);
CREATE INDEX idx_bookings_tutor_id ON bookings(tutor_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_start_time ON bookings(start_time);
CREATE INDEX idx_subjects_category ON subjects(category);
CREATE INDEX idx_subjects_level ON subjects(level);

-- Insert sample subjects
INSERT INTO subjects (name, category, level, description) VALUES
('คณิตศาสตร์', 'วิทยาศาสตร์', 'ม.ต้น', 'คณิตศาสตร์ระดับมัธยมศึกษาตอนต้น'),
('คณิตศาสตร์', 'วิทยาศาสตร์', 'ม.ปลาย', 'คณิตศาสตร์ระดับมัธยมศึกษาตอนปลาย'),
('ภาษาอังกฤษ', 'ภาษา', 'ทุกระดับ', 'ภาษาอังกฤษสำหรับทุกระดับชั้น'),
('วิทยาศาสตร์', 'วิทยาศาสตร์', 'ม.ต้น', 'วิทยาศาสตร์ระดับมัธยมศึกษาตอนปลาย'),
('ฟิสิกส์', 'วิทยาศาสตร์', 'ม.ปลาย', 'ฟิสิกส์ระดับมัธยมศึกษาตอนปลาย'),
('ภาษาไทย', 'ภาษา', 'ม.ปลาย', 'ภาษาไทยระดับมัธยมศึกษาตอนปลาย'),
('สังคมศึกษา', 'สังคมศาสตร์', 'ม.ปลาย', 'สังคมศึกษาระดับมัธยมศึกษาตอนปลาย');

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutors_updated_at BEFORE UPDATE ON tutors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust username as needed)
-- CREATE USER your_username WITH PASSWORD 'your_password';
-- GRANT ALL PRIVILEGES ON DATABASE tutor_thi_chi TO your_username;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_username;

-- Display created tables
\dt

-- Display table structure
\d users
\d tutors
\d subjects
\d bookings
\d reviews
\d tutor_subjects
