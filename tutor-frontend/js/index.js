// Index Page Handler
class IndexHandler {
  constructor() {
    this.apiService = window.apiService;
    this.initializeEventListeners();
    this.checkAuthStatus();
  }

  initializeEventListeners() {
    // Search functionality
    const searchInput = document.querySelector('.search input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => this.handleSearch(e));
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performSearch();
        }
      });
    }

    // Search button
    const searchBtn = document.querySelector('.search button');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.performSearch());
    }

    // Popular subject chips
    const subjectChips = document.querySelectorAll('.hero__chips .chip');
    subjectChips.forEach(chip => {
      chip.addEventListener('click', () => this.handleSubjectClick(chip.textContent));
    });

    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta__actions .btn');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => this.handleCTAClick(e));
    });
  }

  // Check authentication status and update UI
  checkAuthStatus() {
    if (this.apiService.isAuthenticated()) {
      this.updateUIForAuthenticatedUser();
      this.loadUserProfile();
    } else {
      this.updateUIForUnauthenticatedUser();
    }
  }

  // Update UI for authenticated user
  updateUIForAuthenticatedUser() {
    const authElements = document.querySelectorAll('.auth-only');
    const guestElements = document.querySelectorAll('.guest-only');
    
    authElements.forEach(el => el.style.display = 'inline-flex');
    guestElements.forEach(el => el.style.display = 'none');
  }

  // Update UI for unauthenticated user
  updateUIForUnauthenticatedUser() {
    const authElements = document.querySelectorAll('.auth-only');
    const guestElements = document.querySelectorAll('.guest-only');
    
    authElements.forEach(el => el.style.display = 'none');
    guestElements.forEach(el => el.style.display = 'inline-flex');
  }

  // Load user profile
  async loadUserProfile() {
    try {
      const profile = await this.apiService.getProfile();
      if (profile.success) {
        this.updateWelcomeMessage(profile.data);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  }

  // Update welcome message
  updateWelcomeMessage(profile) {
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle && profile.firstName) {
      const originalText = heroTitle.textContent;
      heroTitle.innerHTML = `ยินดีต้อนรับ ${profile.firstName}!<br>${originalText.replace(/^ยินดีต้อนรับ.*?<br>/, '')}`;
    }
  }

  // Handle search input
  handleSearch(event) {
    const query = event.target.value.trim();
    
    // Update search placeholder based on input
    if (query.length > 0) {
      event.target.placeholder = `ค้นหา: ${query}`;
    } else {
      event.target.placeholder = 'ค้นหาวิชา ติวเตอร์ หรือหัวข้อที่ต้องการเรียน...';
    }
  }

  // Perform search
  performSearch() {
    const searchInput = document.querySelector('.search input');
    const query = searchInput.value.trim();
    
    if (query.length === 0) {
      this.showMessage('กรุณากรอกคำค้นหา', 'warning');
      return;
    }

    // Store search query in localStorage for use in tutors page
    localStorage.setItem('searchQuery', query);
    
    // Redirect to tutors page with search query
    window.location.href = `tutors.html?search=${encodeURIComponent(query)}`;
  }

  // Handle subject chip click
  handleSubjectClick(subject) {
    // Store selected subject in localStorage
    localStorage.setItem('selectedSubject', subject);
    
    // Redirect to tutors page
    window.location.href = 'tutors.html';
  }

  // Handle CTA button click
  handleCTAClick(event) {
    const button = event.currentTarget;
    const href = button.getAttribute('href');
    
    if (href && !href.startsWith('#')) {
      // External link, let it proceed normally
      return;
    }
    
    // Handle internal actions
    if (button.textContent.includes('สมัครสมาชิก')) {
      window.location.href = 'signup.html';
    } else if (button.textContent.includes('เข้าสู่ระบบ')) {
      window.location.href = 'login.html';
    } else if (button.textContent.includes('หาติวเตอร์')) {
      window.location.href = 'tutors.html';
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
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      z-index: 1000;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
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

    // Insert message
    document.body.appendChild(messageEl);

    // Auto remove message after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }

  // Initialize search suggestions
  initializeSearchSuggestions() {
    const suggestions = [
      'คณิตศาสตร์ ม.ปลาย',
      'ภาษาอังกฤษ TOEIC',
      'วิทยาศาสตร์ ม.ต้น',
      'ภาษาไทย O-NET',
      'สังคมศึกษา ม.ปลาย',
      'ฟิสิกส์ ม.ปลาย',
      'เคมี ม.ปลาย',
      'ชีววิทยา ม.ปลาย'
    ];

    // Add suggestions to search chips
    const chipsContainer = document.querySelector('.hero__chips');
    if (chipsContainer) {
      suggestions.forEach(suggestion => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.textContent = suggestion;
        chip.addEventListener('click', () => this.handleSubjectClick(suggestion));
        chipsContainer.appendChild(chip);
      });
    }
  }
}

// Initialize index handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new IndexHandler();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .message {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
document.head.appendChild(style);
