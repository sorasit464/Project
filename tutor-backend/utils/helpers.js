// Utility functions สำหรับ Tutor Thi Chi

// สร้าง slug จากข้อความ
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // ลบอักขระพิเศษ
    .replace(/[\s_-]+/g, '-') // แทนที่ช่องว่างและขีดล่างด้วยขีดกลาง
    .replace(/^-+|-+$/g, ''); // ลบขีดกลางที่หัวและท้าย
};

// จัดรูปแบบราคา
const formatPrice = (price) => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
  }).format(price);
};

// จัดรูปแบบวันที่
const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('th-TH', defaultOptions).format(new Date(date));
};

// จัดรูปแบบเวลา
const formatTime = (date) => {
  return new Intl.DateTimeFormat('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(date));
};

// คำนวณระยะเวลาระหว่างสองเวลา (นาที)
const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffMs = end - start;
  return Math.round(diffMs / (1000 * 60)); // แปลงเป็นนาที
};

// คำนวณราคารวม
const calculateTotalPrice = (hourlyRate, durationMinutes) => {
  const hours = durationMinutes / 60;
  return Math.round(hourlyRate * hours * 100) / 100; // ปัดเศษ 2 ตำแหน่ง
};

// สร้างรหัสการจอง
const generateBookingCode = () => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `BK${timestamp}${random}`.toUpperCase();
};

// ตรวจสอบว่าเป็นเวลาทำงานหรือไม่
const isBusinessHours = (date = new Date()) => {
  const hour = date.getHours();
  const day = date.getDay();
  
  // จันทร์-ศุกร์ 8:00-20:00, เสาร์-อาทิตย์ 9:00-18:00
  if (day >= 1 && day <= 5) { // จันทร์-ศุกร์
    return hour >= 8 && hour < 20;
  } else { // เสาร์-อาทิตย์
    return hour >= 9 && hour < 18;
  }
};

// ตรวจสอบว่าเป็นอีเมลที่ถูกต้องหรือไม่
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// ตรวจสอบว่าเป็นเบอร์โทรที่ถูกต้องหรือไม่
const isValidPhone = (phone) => {
  const phoneRegex = /^(\+66|66|0)[0-9]{8,9}$/;
  return phoneRegex.test(phone);
};

// สร้างรหัสยืนยัน 6 หลัก
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ตรวจสอบความแข็งแกร่งของรหัสผ่าน
const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  if (score === 5) return { strength: 'strong', score: 5, message: 'รหัสผ่านแข็งแกร่งมาก' };
  if (score >= 4) return { strength: 'good', score: 4, message: 'รหัสผ่านดี' };
  if (score >= 3) return { strength: 'fair', score: 3, message: 'รหัสผ่านปานกลาง' };
  return { strength: 'weak', score: score, message: 'รหัสผ่านอ่อนแอ' };
};

// จัดรูปแบบชื่อไฟล์
const sanitizeFileName = (fileName) => {
  return fileName
    .replace(/[^a-zA-Z0-9ก-๙\s\-_\.]/g, '') // ลบอักขระพิเศษ
    .replace(/\s+/g, '_') // แทนที่ช่องว่างด้วยขีดล่าง
    .toLowerCase();
};

// ตรวจสอบประเภทไฟล์ที่อนุญาต
const isAllowedFileType = (fileName, allowedTypes = ['jpg', 'jpeg', 'png', 'gif', 'pdf']) => {
  const extension = fileName.split('.').pop().toLowerCase();
  return allowedTypes.includes(extension);
};

// สร้าง pagination object
const createPagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null,
  };
};

// สร้าง response object มาตรฐาน
const createResponse = (success = true, message = '', data = null, error = null) => {
  return {
    success,
    message,
    data,
    error,
    timestamp: new Date().toISOString(),
  };
};

// สร้าง error response
const createErrorResponse = (message, error = null, statusCode = 400) => {
  return {
    success: false,
    message,
    error,
    statusCode,
    timestamp: new Date().toISOString(),
  };
};

// สร้าง success response
const createSuccessResponse = (message, data = null) => {
  return {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  createSlug,
  formatPrice,
  formatDate,
  formatTime,
  calculateDuration,
  calculateTotalPrice,
  generateBookingCode,
  isBusinessHours,
  isValidEmail,
  isValidPhone,
  generateVerificationCode,
  checkPasswordStrength,
  sanitizeFileName,
  isAllowedFileType,
  createPagination,
  createResponse,
  createErrorResponse,
  createSuccessResponse,
};
