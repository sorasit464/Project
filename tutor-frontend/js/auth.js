// Authentication Handler
class AuthHandler {
  constructor() {
    this.apiService = window.apiService;
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => this.handleLogout(e));
    }

    // Check authentication status on page load
    this.checkAuthStatus();
  }

  // Handle login
  async handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
      this.showMessage('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
      return;
    }

    try {
      this.showLoading(true);
      
      const response = await this.apiService.login(email, password);
      
      if (response.success && response.token) {
        this.apiService.setToken(response.token);
        this.showMessage('เข้าสู่ระบบสำเร็จ!', 'success');
        
        // Redirect to home page after short delay
        setTimeout(() => {
          this.apiService.redirectToHome();
        }, 1000);
      }
    } catch (error) {
      this.showMessage(error.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ', 'error');
    } finally {
      this.showLoading(false);
    }
  }

  // Handle register
  async handleRegister(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      phone: formData.get('phone'),
      role: formData.get('role') || 'student'
    };

    // Validate required fields
    if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
      this.showMessage('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error');
      return;
    }

    try {
      this.showLoading(true);
      
      const response = await this.apiService.register(userData);
      
      if (response.success) {
        this.showMessage('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ', 'success');
        
        // Redirect to login page after short delay
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      }
    } catch (error) {
      this.showMessage(error.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก', 'error');
    } finally {
      this.showLoading(false);
    }
  }

  // Handle logout
  handleLogout(event) {
    event.preventDefault();
    
    this.apiService.removeToken();
    this.showMessage('ออกจากระบบสำเร็จ', 'success');
    
    setTimeout(() => {
      this.apiService.redirectToLogin();
    }, 1000);
  }

  // Check authentication status
  checkAuthStatus() {
    if (this.apiService.isAuthenticated()) {
      // User is logged in, show appropriate UI
      this.updateUIForAuthenticatedUser();
    } else {
      // User is not logged in, show appropriate UI
      this.updateUIForUnauthenticatedUser();
    }
  }

  // Update UI for authenticated user
  updateUIForAuthenticatedUser() {
    const authElements = document.querySelectorAll('.auth-only');
    const guestElements = document.querySelectorAll('.guest-only');
    
    authElements.forEach(el => el.style.display = 'block');
    guestElements.forEach(el => el.style.display = 'none');
  }

  // Update UI for unauthenticated user
  updateUIForUnauthenticatedUser() {
    const authElements = document.querySelectorAll('.auth-only');
    const guestElements = document.querySelectorAll('.guest-only');
    
    authElements.forEach(el => el.style.display = 'none');
    guestElements.forEach(el => el.style.display = 'block');
  }

  // Show loading state
  showLoading(show) {
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
      if (show) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'กำลังประมวลผล...';
      } else {
        submitBtn.disabled = false;
        submitBtn.textContent = submitBtn.dataset.originalText || 'ส่งข้อมูล';
      }
    }
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

// Initialize auth handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AuthHandler();
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
`;
document.head.appendChild(style);
