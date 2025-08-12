const nodemailer = require('nodemailer');
const config = require('../config/config');

// สร้าง transporter สำหรับส่งอีเมล
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: config.email.host,
    port: config.email.port,
    secure: false, // true สำหรับ 465, false สำหรับ ports อื่นๆ
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
};

// ส่งอีเมลยืนยันการลงทะเบียน
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Tutor Thi Chi" <${config.email.user}>`,
      to: userEmail,
      subject: 'ยินดีต้อนรับสู่ Tutor Thi Chi! 🎓',
      html: `
        <div style="font-family: 'Prompt', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 45%, #ec4899 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🎓 ยินดีต้อนรับสู่ Tutor Thi Chi!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">แพลตฟอร์มหาติวเตอร์ออนไลน์ที่ดีที่สุด</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">สวัสดีคุณ ${userName}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              ขอบคุณที่สมัครสมาชิกกับเรา ตอนนี้คุณสามารถ:
            </p>
            
            <ul style="color: #666; line-height: 1.8; margin-bottom: 25px;">
              <li>🔍 ค้นหาติวเตอร์ที่เหมาะสมกับคุณ</li>
              <li>📅 จองเรียนในเวลาที่สะดวก</li>
              <li>💻 เรียนออนไลน์หรือตัวต่อตัว</li>
              <li>⭐ ให้คะแนนและรีวิวติวเตอร์</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                เริ่มต้นใช้งานเลย
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center; margin-top: 30px;">
              หากมีคำถาม ติดต่อเราได้ที่ support@tutorthichi.com
            </p>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2025 Tutor Thi Chi. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    return false;
  }
};

// ส่งอีเมลแจ้งเตือนการจองเรียน
const sendBookingConfirmation = async (userEmail, userName, bookingDetails) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Tutor Thi Chi" <${config.email.user}>`,
      to: userEmail,
      subject: 'ยืนยันการจองเรียน 📚',
      html: `
        <div style="font-family: 'Prompt', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">📚 ยืนยันการจองเรียน</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">การจองเรียนของคุณได้รับการยืนยันแล้ว</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">สวัสดีคุณ ${userName}!</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              การจองเรียนของคุณได้รับการยืนยันแล้ว รายละเอียดดังนี้:
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #10b981;">
              <h3 style="color: #333; margin-top: 0;">📋 รายละเอียดการจองเรียน</h3>
              <p><strong>วิชา:</strong> ${bookingDetails.subject}</p>
              <p><strong>ติวเตอร์:</strong> ${bookingDetails.tutor}</p>
              <p><strong>วันที่:</strong> ${bookingDetails.date}</p>
              <p><strong>เวลา:</strong> ${bookingDetails.time}</p>
              <p><strong>ราคา:</strong> ฿${bookingDetails.price}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              กรุณาเตรียมตัวให้พร้อมสำหรับการเรียน และอย่าลืมตรวจสอบลิงก์การประชุมก่อนเวลาเรียน
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000/dashboard" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                ดูรายละเอียดเพิ่มเติม
              </a>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2025 Tutor Thi Chi. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Booking confirmation email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending booking confirmation email:', error);
    return false;
  }
};

// ส่งอีเมลรีเซ็ตรหัสผ่าน
const sendPasswordReset = async (userEmail, resetToken) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Tutor Thi Chi" <${config.email.user}>`,
      to: userEmail,
      subject: 'รีเซ็ตรหัสผ่าน 🔐',
      html: `
        <div style="font-family: 'Prompt', sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 28px;">🔐 รีเซ็ตรหัสผ่าน</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">คุณได้ขอรีเซ็ตรหัสผ่าน</p>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">รีเซ็ตรหัสผ่าน</h2>
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              คุณได้ขอรีเซ็ตรหัสผ่านสำหรับบัญชี Tutor Thi Chi ของคุณ
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <p style="color: #666; margin: 0;">
                <strong>Token:</strong> <code style="background: #f3f4f6; padding: 5px 10px; border-radius: 5px; font-family: monospace;">${resetToken}</code>
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              ใช้ token นี้เพื่อรีเซ็ตรหัสผ่านของคุณ หากคุณไม่ได้ขอรีเซ็ตรหัสผ่าน กรุณาละเว้นอีเมลนี้
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://localhost:3000/reset-password" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold;">
                รีเซ็ตรหัสผ่าน
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              <strong>หมายเหตุ:</strong> Token นี้จะหมดอายุใน 1 ชั่วโมง
            </p>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 14px;">
            <p style="margin: 0;">© 2025 Tutor Thi Chi. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendBookingConfirmation,
  sendPasswordReset,
};
