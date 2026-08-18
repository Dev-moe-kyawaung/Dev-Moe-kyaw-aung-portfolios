/**
 * Moe Kyaw Aung Portfolio - Main JavaScript
 * Senior Android Developer & Technical Founder
 * 
 * @version 1.0.0
 * @author Moe Kyaw Aung
 * @license MIT
 */

// ============================================
// CONFIGURATION & CONSTANTS
// ============================================
const CONFIG = {
  API_BASE: 'https://api.github.com',
  GITHUB_USER: 'Dev-moe-kyawaung',
  
  ANIMATION: {
    DURATION: 300,
    EASING: 'cubic-bezier(0.4, 0, 0.2, 1)',
    SCROLL_OFFSET: 100,
  },
  
  PERFORMANCE: {
    LAZY_LOAD_THRESHOLD: 300,
    DEBOUNCE_DELAY: 300,
    THROTTLE_DELAY: 100,
  },
  
  THEME: {
    DEFAULT: 'dark',
    STORAGE_KEY: 'portfolio-theme',
  },
  
  PARTICLES: {
    NUMBER: 80,
    COLOR: '#6366f1',
    SIZE: 3,
    SPEED: 1,
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function smoothScrollTo(element, offset = 0) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function isInViewport(element, offset = 0) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
  );
}

function getScrollPercentage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
}

// ============================================
// DOM ELEMENTS
// ============================================
const DOM = {
  preloader: document.getElementById('preloader'),
  navbar: document.getElementById('navbar'),
  navbarToggle: document.querySelector('.navbar-toggle'),
  mobileMenu: document.querySelector('.mobile-menu'),
  mobileMenuClose: document.querySelector('.mobile-menu-close'),
  navbarLinks: document.querySelectorAll('.navbar-link'),
  mobileMenuLinks: document.querySelectorAll('.mobile-menu-link'),
  themeToggle: document.getElementById('theme-toggle'),
  backToTop: document.getElementById('back-to-top'),
  sections: document.querySelectorAll('.section'),
  contactForm: document.getElementById('contact-form'),
  revenueChart: document.getElementById('revenueChart'),
  userGrowthChart: document.getElementById('userGrowthChart'),
  productChart: document.getElementById('productChart'),
};

// ============================================
// INITIALIZATION
// ============================================

async function init() {
  try {
    console.log('🚀 Initializing portfolio...');
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
      });
    }
    
    // Initialize Particles
    initParticles();
    
    // Initialize Theme
    initTheme();
    
    // Initialize Navigation
    initNavigation();
    
    // Initialize Animations
    initAnimations();
    
    // Initialize Counters
    initCounters();
    
    // Initialize Charts
    initCharts();
    
    // Initialize Forms
    initForms();
    
    // Initialize Lazy Loading
    initLazyLoading();
    
    // Initialize Typing Animation
    initTypingAnimation();
    
    // Initialize Filters
    initFilters();
    
    // Initialize Scroll Effects
    initScrollEffects();
    
    // Hide Preloader
    hidePreloader();
    
    console.log('✅ Portfolio initialized successfully');
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
}

// ============================================
// PRELOADER
// ============================================

function hidePreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (DOM.preloader) {
        DOM.preloader.classList.add('hidden');
        document.body.style.overflow = 'auto';
      }
    }, 1000);
  });
}

// ============================================
// PARTICLES
// ============================================

function initParticles() {
  if (typeof particlesJS === 'undefined') {
    console.log('⚠️ particlesJS not loaded');
    return;
  }
  
  particlesJS('particles-js', {
    particles: {
      number: {
        value: CONFIG.PARTICLES.NUMBER,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: CONFIG.PARTICLES.COLOR,
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000',
        },
      },
      opacity: {
        value: 0.5,
        random: false,
      },
      size: {
        value: CONFIG.PARTICLES.SIZE,
        random: true,
        anim: {
          enable: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: CONFIG.PARTICLES.COLOR,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: CONFIG.PARTICLES.SPEED,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });
}

// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
  const savedTheme = localStorage.getItem(CONFIG.THEME.STORAGE_KEY) || CONFIG.THEME.DEFAULT;
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(CONFIG.THEME.STORAGE_KEY, newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  if (!DOM.themeToggle) return;
  
  const moonIcon = DOM.themeToggle.querySelector('.theme-icon-moon');
  const sunIcon = DOM.themeToggle.querySelector('.theme-icon-sun');
  
  if (theme === 'dark') {
    moonIcon.style.opacity = '1';
    moonIcon.style.transform = 'rotate(0deg)';
    sunIcon.style.opacity = '0';
    sunIcon.style.transform = 'rotate(90deg)';
  } else {
    moonIcon.style.opacity = '0';
    moonIcon.style.transform = 'rotate(-90deg)';
    sunIcon.style.opacity = '1';
    sunIcon.style.transform = 'rotate(0deg)';
  }
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
  window.addEventListener('scroll', throttle(handleNavbarScroll, 100));
  
  if (DOM.navbarToggle) {
    DOM.navbarToggle.addEventListener('click', toggleMobileMenu);
  }
  
  if (DOM.mobileMenuClose) {
    DOM.mobileMenuClose.addEventListener('click', closeMobileMenu);
  }
  
  DOM.navbarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      handleNavClick(e, link);
    });
  });
  
  DOM.mobileMenuLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      handleNavClick(e, link);
      closeMobileMenu();
    });
  });
  
  updateActiveNavLink();
  window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function handleNavbarScroll() {
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > 100) {
    if (DOM.navbar) {
      DOM.navbar.classList.add('scrolled');
    }
  } else {
    if (DOM.navbar) {
      DOM.navbar.classList.remove('scrolled');
    }
  }
}

function toggleMobileMenu() {
  if (DOM.mobileMenu) {
    DOM.mobileMenu.classList.toggle('active');
  }
  if (DOM.navbarToggle) {
    DOM.navbarToggle.classList.toggle('active');
  }
  document.body.style.overflow = DOM.mobileMenu?.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMobileMenu() {
  if (DOM.mobileMenu) {
    DOM.mobileMenu.classList.remove('active');
  }
  if (DOM.navbarToggle) {
    DOM.navbarToggle.classList.remove('active');
  }
  document.body.style.overflow = 'auto';
}

function handleNavClick(e, link) {
  e.preventDefault();
  
  const targetId = link.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const navbarHeight = DOM.navbar?.offsetHeight || 80;
    smoothScrollTo(targetSection, navbarHeight);
  }
}

function updateActiveNavLink() {
  const scrollPosition = window.pageYOffset + 200;
  
  DOM.sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      DOM.navbarLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
      
      DOM.mobileMenuLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ============================================
// ANIMATIONS
// ============================================

function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.log('⚠️ GSAP not loaded');
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.from('.hero-profile', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
  });
  
  gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.2,
    ease: 'power3.out',
  });
  
  gsap.from('.hero-stats', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.4,
    ease: 'power3.out',
  });
  
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach((header) => {
    gsap.from(header, {
      scrollTrigger: {
        trigger: header,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  });
}

// ============================================
// TYPING ANIMATION
// ============================================

function initTypingAnimation() {
  const typingElement = document.querySelector('.typing-text');
  
  if (typingElement && typeof Typed !== 'undefined') {
    new Typed('.typing-text', {
      strings: ['Moe Kyaw Aung', 'Senior Android Developer', 'Technical Founder', 'Problem Solver'],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });
  }
}

// ============================================
// COUNTER ANIMATIONS
// ============================================

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = prefix + formatNumber(Math.floor(current)) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = prefix + formatNumber(target) + suffix;
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  
  counters.forEach((counter) => observer.observe(counter));
}

// ============================================
// CHARTS
// ============================================

function initCharts() {
  if (typeof Chart === 'undefined') {
    console.log('⚠️ Chart.js not loaded');
    return;
  }
  
  if (DOM.revenueChart) {
    new Chart(DOM.revenueChart, {
      type: 'line',
      data: {
        labels: ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
        datasets: [{
          label: 'Revenue (\$)',
          data: [85000, 145000, 225000, 295000, 365000, 425000, 485000],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
  
  if (DOM.userGrowthChart) {
    new Chart(DOM.userGrowthChart, {
      type: 'bar',
      data: {
        labels: ['Q4 2024', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026', 'Q2 2026'],
        datasets: [{
          label: 'Users',
          data: [125000, 185000, 245000, 320000, 395000, 445000, 485000],
          backgroundColor: 'rgba(236, 72, 153, 0.8)',
          borderColor: '#ec4899',
          borderWidth: 2,
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
  
  if (DOM.productChart) {
    new Chart(DOM.productChart, {
      type: 'bar',
      data: {
        labels: ['POS Ultimate', 'Casino App', 'Social Dashboard', 'Job Portal', 'Lens Lite', 'Daily Planner', 'Snake Game', 'Other'],
        datasets: [{
          label: 'MRR (\$)',
          data: [85000, 125000, 12000, 18000, 3500, 2200, 8500, 101800],
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(20, 184, 166, 0.8)',
            'rgba(245, 158, 11, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(139, 92, 246, 0.8)',
          ],
          borderRadius: 8,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}

// ============================================
// FORMS
// ============================================

function initForms() {
  if (DOM.contactForm) {
    DOM.contactForm.addEventListener('submit', handleContactSubmit);
  }
}

async function handleContactSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  if (!validateForm(data)) {
    return;
  }
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    form.reset();
  } catch (error) {
    showNotification('Failed to send message. Please try again.', 'error');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
}

function validateForm(data) {
  const { name, email, message } = data;
  
  if (!name || name.trim().length < 2) {
    showNotification('Please enter your name', 'error');
    return false;
  }
  
  if (!email || !isValidEmail(email)) {
    showNotification('Please enter a valid email', 'error');
    return false;
  }
  
  if (!message || message.trim().length < 10) {
    showNotification('Message must be at least 10 characters', 'error');
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = 'notification notification-' + type;
  notification.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle') + '"></i><span>' + message + '</span>';
  
  Object.assign(notification.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    padding: '1rem 1.5rem',
    background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    color: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    zIndex: '1080',
    animation: 'slideIn 0.3s ease-out',
  });
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

// ============================================
// LAZY LOADING
// ============================================

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    },
    { rootMargin: '50px' }
  );
  
  images.forEach((img) => imageObserver.observe(img));
}

// ============================================
// FILTERS & SORT
// ============================================

function initFilters() {
  const projectFilters = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  projectFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      projectCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.from(card, {
              duration: 0.5,
              scale: 0.9,
              opacity: 0,
              ease: 'back.out(1.7)',
            });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  const certTabs = document.querySelectorAll('.tab-btn');
  const certCards = document.querySelectorAll('.certificate-card');
  
  certTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      certTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      
      const category = tab.dataset.category;
      
      certCards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initScrollEffects() {
  window.addEventListener('scroll', throttle(handleBackToTop, 100));
  
  if (DOM.backToTop) {
    DOM.backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const percentage = getScrollPercentage();
      progressBar.style.width = percentage + '%';
    });
  }
}

function handleBackToTop() {
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > 500) {
    if (DOM.backToTop) {
      DOM.backToTop.classList.add('visible');
    }
  } else {
    if (DOM.backToTop) {
      DOM.backToTop.classList.remove('visible');
    }
  }
}

// ============================================
// EVENT LISTENERS
// ============================================

if (DOM.themeToggle) {
  DOM.themeToggle.addEventListener('click', toggleTheme);
}

window.addEventListener('resize', debounce(() => {
  initParticles();
  initCharts();
}, 300));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
});

// ============================================
// START APPLICATION
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
