// Signup Form Handler
class SignupHandler {
  constructor() {
    this.initializeEventListeners();
    this.setupPasswordValidation();
  }

  initializeEventListeners() {
    // Password toggle
    const togglePw = document.getElementById('togglePw');
    if (togglePw) {
      togglePw.addEventListener('click', () => this.togglePassword());
    }

    // Password confirmation validation
    const confirmInput = document.getElementById('confirm');
    if (confirmInput) {
      confirmInput.addEventListener('input', () => this.validatePasswordConfirmation());
    }

    // Password strength meter
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      passwordInput.addEventListener('input', () => this.updatePasswordStrength());
    }

    // Form validation
    const form = document.getElementById('registerForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormValidation(e));
    }
  }

  // Toggle password visibility
  togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.getElementById('togglePw');
    
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleBtn.textContent = '🙈';
      toggleBtn.setAttribute('aria-label', 'ซ่อนรหัสผ่าน');
    } else {
      passwordInput.type = 'password';
      toggleBtn.textContent = '👁️';
      toggleBtn.setAttribute('aria-label', 'แสดงรหัสผ่าน');
    }
  }

  // Validate password confirmation
  validatePasswordConfirmation() {
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;
    const confirmError = document.getElementById('err-confirm');
    
    if (confirm && password !== confirm) {
      confirmError.style.display = 'block';
      return false;
    } else {
      confirmError.style.display = 'none';
      return true;
    }
  }

  // Update password strength meter
  updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const bar = document.getElementById('pwBar');
    
    if (!bar) return;
    
    let strength = 0;
    let color = '#ff4444';
    
    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    
    if (strength >= 75) {
      color = '#00C851';
    } else if (strength >= 50) {
      color = '#ffbb33';
    } else if (strength >= 25) {
      color = '#ff8800';
    }
    
    bar.style.width = strength + '%';
    bar.style.backgroundColor = color;
  }

  // Handle form validation
  handleFormValidation(event) {
    event.preventDefault();
    
    // Clear previous errors
    this.clearErrors();
    
    let isValid = true;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'role', 'password', 'confirm'];
    
    requiredFields.forEach(fieldName => {
      const field = document.getElementById(fieldName);
      const error = document.getElementById(`err-${fieldName}`);
      
      if (!field.value.trim()) {
        this.showFieldError(fieldName, 'กรุณากรอกข้อมูลนี้');
        isValid = false;
      }
    });
    
    // Validate email format
    const email = document.getElementById('email').value;
    if (email && !this.isValidEmail(email)) {
      this.showFieldError('email', 'กรุณากรอกอีเมลที่ถูกต้อง');
      isValid = false;
    }
    
    // Validate phone format
    const phone = document.getElementById('phone').value;
    if (phone && !this.isValidPhone(phone)) {
      this.showFieldError('phone', 'กรุณากรอกเบอร์โทรที่ถูกต้อง');
      isValid = false;
    }
    
    // Validate password confirmation
    if (!this.validatePasswordConfirmation()) {
      isValid = false;
    }
    
    // Validate terms agreement
    const agree = document.getElementById('agree');
    if (!agree.checked) {
      this.showMessage('กรุณายอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว', 'error');
      isValid = false;
    }
    
    if (isValid) {
      // Form is valid, let the auth handler process it
      return true;
    }
    
    return false;
  }

  // Show field error
  showFieldError(fieldName, message) {
    const error = document.getElementById(`err-${fieldName}`);
    if (error) {
      error.textContent = message;
      error.style.display = 'block';
    }
  }

  // Clear all errors
  clearErrors() {
    const errors = document.querySelectorAll('.err');
    errors.forEach(error => {
      error.style.display = 'none';
    });
  }

  // Validate email format
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate phone format
  isValidPhone(phone) {
    const phoneRegex = /^0[0-9]{9}$/;
    return phoneRegex.test(phone);
  }

  // Show message
  showMessage(message, type = 'info') {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `message message-${type}`;
    messageEl.textContent = message;
    
    // Add styles
    messageEl.style.cssText = `
      padding: 12px 16px;
      margin: 16px 0;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
      animation: slideIn 0.3s ease;
    `;

    // Set background color based on type
    switch (type) {
      case 'success':
        messageEl.style.backgroundColor = '#d4edda';
        messageEl.style.color = '#155724';
        messageEl.style.border = '1px solid #c3e6cb';
        break;
      case 'error':
        messageEl.style.backgroundColor = '#f8d7da';
        messageEl.style.color = '#721c24';
        messageEl.style.border = '1px solid #f5c6cb';
        break;
      case 'warning':
        messageEl.style.backgroundColor = '#fff3cd';
        messageEl.style.color = '#856404';
        messageEl.style.border = '1px solid #ffeaa7';
        break;
      default:
        messageEl.style.backgroundColor = '#d1ecf1';
        messageEl.style.color = '#0c5460';
        messageEl.style.border = '1px solid #bee5eb';
    }

    // Insert message after form
    const form = document.querySelector('form');
    if (form) {
      form.parentNode.insertBefore(messageEl, form.nextSibling);
    }

    // Auto remove message after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }
}

// Initialize signup handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SignupHandler();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .err {
    display: none;
    color: #dc3545;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .hint {
    color: #6c757d;
    font-size: 12px;
    margin-top: 4px;
  }
`;
document.head.appendChild(style);
