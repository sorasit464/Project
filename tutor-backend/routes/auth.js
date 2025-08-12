const express = require('express');
const { body } = require('express-validator');
const { auth } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const authController = require('../controllers/authController');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('กรุณากรอกอีเมลที่ถูกต้อง'),
  body('password').isLength({ min: 6 }).withMessage('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  body('firstName').notEmpty().trim().withMessage('กรุณากรอกชื่อ'),
  body('lastName').notEmpty().trim().withMessage('กรุณากรอกนามสกุล'),
  body('phone').optional().isMobilePhone('th-TH').withMessage('กรุณากรอกเบอร์โทรที่ถูกต้อง'),
  body('role').optional().isIn(['student', 'tutor']).withMessage('บทบาทไม่ถูกต้อง'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('กรุณากรอกอีเมลที่ถูกต้อง'),
  body('password').notEmpty().withMessage('กรุณากรอกรหัสผ่าน'),
];

const updateProfileValidation = [
  body('firstName').optional().notEmpty().trim().withMessage('กรุณากรอกชื่อ'),
  body('lastName').optional().notEmpty().trim().withMessage('กรุณากรอกนามสกุล'),
  body('phone').optional().isMobilePhone('th-TH').withMessage('กรุณากรอกเบอร์โทรที่ถูกต้อง'),
];

// Routes
router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.get('/profile', auth, authController.getProfile);
router.put('/profile', auth, updateProfileValidation, validate, authController.updateProfile);

module.exports = router;
