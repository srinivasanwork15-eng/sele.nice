/**
 * Personal Portfolio Website - Main JavaScript
 * Author: Srinivasan
 * Description: Clean, accessible, vanilla JavaScript handling interactive features:
 *              mobile navigation, scroll spy, contact form validation,
 *              copy-to-clipboard, project preview modal, and smooth scrolling.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features once DOM is fully parsed
  initCurrentYear();
  initHeaderScroll();
  initMobileMenu();
  initScrollSpy();
  initSmoothScroll();
  initBackToTop();
  initCopyEmail();
  initProjectModal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   01. DYNAMIC FOOTER YEAR
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   02. HEADER SCROLL STATE
   -------------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load and listen to scroll with passive listener for performance
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   03. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileMenu) return;

  const openMenu = () => {
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMenu = () => {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when clicking any link inside drawer
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close drawer if Escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   04. SCROLL SPY (HIGHLIGHT ACTIVE NAV LINK)
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.main-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!sections.length || !desktopLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Update desktop links
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update mobile links
        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* --------------------------------------------------------------------------
   05. ACCESSIBLE SMOOTH SCROLL FOR ANCHOR LINKS
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        
        // Use smooth scroll
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Set focus to the section for keyboard accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   06. BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  const toggleBackToTop = () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', toggleBackToTop, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   07. COPY EMAIL TO CLIPBOARD
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailTextEl = document.getElementById('emailText');
  const tooltip = document.getElementById('copyTooltip');

  if (!copyBtn || !emailTextEl) return;

  copyBtn.addEventListener('click', async () => {
    const email = emailTextEl.textContent.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers or non-HTTPS local tests
        const tempInput = document.createElement('textarea');
        tempInput.value = email;
        tempInput.style.position = 'fixed';
        tempInput.style.left = '-9999px';
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      // Visual feedback on button tooltip
      copyBtn.classList.add('copied');
      if (tooltip) tooltip.textContent = 'Copied!';
      
      showToast('Email address copied to clipboard!');

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (tooltip) tooltip.textContent = 'Copy';
      }, 2500);

    } catch (err) {
      console.error('Failed to copy email: ', err);
      showToast('Unable to copy. Please manually select the email.');
    }
  });
}

/* --------------------------------------------------------------------------
   08. PROJECT DETAIL MODAL (QUICK VIEW)
   -------------------------------------------------------------------------- */
const PROJECT_DATA = {
  taskpulse: {
    title: 'TaskPulse — Habit & Task Manager',
    category: 'Productivity Application',
    description: 'A modular task and daily habit tracker engineered using Vanilla JavaScript. Built to demonstrate solid state management without resorting to heavy third-party libraries.',
    highlights: [
      'Pure JavaScript state management pattern separating model data from DOM renders.',
      'LocalStorage persistence with JSON serialization and auto-recovery on load.',
      'Accessible keyboard controls for marking tasks done, editing text, and filtering tabs.',
      'Fluid CSS animations when adding or archiving items.'
    ],
    tech: ['HTML5', 'CSS3 Flexbox', 'JavaScript (ES6)', 'LocalStorage API'],
    codeUrl: 'https://github.com'
  },
  devshelf: {
    title: 'DevShelf — Curated Developer Resource Vault',
    category: 'Curated Directory',
    description: 'A responsive digital reference library for modern front-end developers, categorizing documentation, toolkits, and cheat sheets.',
    highlights: [
      'Instant client-side multi-tag search algorithm filtering in O(n) time.',
      'Responsive CSS Grid layout adapting seamlessly from 1 to 4 columns.',
      'One-click snippet copy buttons with animated feedback.',
      'Lightweight SVG icons for minimal network payload.'
    ],
    tech: ['Semantic HTML5', 'CSS Grid', 'Vanilla JavaScript', 'SVG System'],
    codeUrl: 'https://github.com'
  },
  weatherflow: {
    title: 'WeatherFlow — Real-Time Weather Dashboard',
    category: 'API Integration',
    description: 'An interactive weather dashboard delivering real-time meteorological metrics, forecasts, and visual atmospheric condition cues.',
    highlights: [
      'Asynchronous data fetching utilizing modern async/await patterns.',
      'Graceful error boundaries displaying user-friendly alerts for network drops or unknown city queries.',
      'Dynamic CSS theme transitions adjusting ambient color temperature based on degree readings.',
      'Defensive input sanitization preventing injection and invalid query requests.'
    ],
    tech: ['Async/Await', 'REST API', 'CSS Variables', 'Defensive JS'],
    codeUrl: 'https://github.com'
  }
};

function initProjectModal() {
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalBody = document.getElementById('modalBody');
  const modalExternalLink = document.getElementById('modalExternalLink');
  const triggers = document.querySelectorAll('.project-modal-trigger');

  if (!modalBackdrop || !modalBody) return;

  let lastActiveElement = null;

  const openModal = (projectId) => {
    const data = PROJECT_DATA[projectId];
    if (!data) return;

    lastActiveElement = document.activeElement;

    modalProjectTitle.textContent = data.title;

    modalBody.innerHTML = `
      <p style="margin-bottom: 1rem; color: var(--text-secondary);">${data.description}</p>
      
      <h4>Key Architecture Highlights:</h4>
      <ul>
        ${data.highlights.map(item => `<li>${item}</li>`).join('')}
      </ul>

      <h4>Technologies Leveraged:</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
        ${data.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
      </div>
    `;

    if (modalExternalLink) {
      modalExternalLink.href = data.codeUrl;
    }

    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   09. CONTACT FORM VALIDATION & HANDLING
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  if (!form) return;

  // Real-time error clearing as user types
  const setupInputClear = (inputEl, errorEl) => {
    if (!inputEl || !errorEl) return;
    inputEl.addEventListener('input', () => {
      if (inputEl.classList.contains('is-invalid')) {
        inputEl.classList.remove('is-invalid');
        errorEl.textContent = '';
      }
    });
  };

  setupInputClear(nameInput, nameError);
  setupInputClear(emailInput, emailError);
  setupInputClear(messageInput, messageError);

  // Email format regex validation
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(String(email).toLowerCase());
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset status
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    let isValid = true;
    let firstInvalidField = null;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      nameError.textContent = 'Please enter your name.';
      isValid = false;
      firstInvalidField = firstInvalidField || nameInput;
    } else if (nameInput.value.trim().length < 2) {
      nameInput.classList.add('is-invalid');
      nameError.textContent = 'Name must be at least 2 characters long.';
      isValid = false;
      firstInvalidField = firstInvalidField || nameInput;
    }

    // Validate Email
    if (!emailInput.value.trim()) {
      emailInput.classList.add('is-invalid');
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
      firstInvalidField = firstInvalidField || emailInput;
    } else if (!isValidEmail(emailInput.value.trim())) {
      emailInput.classList.add('is-invalid');
      emailError.textContent = 'Please provide a valid email format (e.g. name@domain.com).';
      isValid = false;
      firstInvalidField = firstInvalidField || emailInput;
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      messageInput.classList.add('is-invalid');
      messageError.textContent = 'Please enter a message.';
      isValid = false;
      firstInvalidField = firstInvalidField || messageInput;
    } else if (messageInput.value.trim().length < 10) {
      messageInput.classList.add('is-invalid');
      messageError.textContent = 'Message should be at least 10 characters long.';
      isValid = false;
      firstInvalidField = firstInvalidField || messageInput;
    }

    // If validation failed, focus the first error field
    if (!isValid) {
      if (firstInvalidField) firstInvalidField.focus();
      return;
    }

    // Form is valid: simulate asynchronous delivery
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const senderName = nameInput.value.trim();

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      // Show success message
      formStatus.classList.add('success');
      formStatus.textContent = `Thank you, ${senderName}! Your message has been sent successfully. I will get back to you shortly.`;

      // Show toast
      showToast('Message sent successfully!');

      // Reset form
      form.reset();

      // Clear success banner after 8 seconds
      setTimeout(() => {
        formStatus.className = 'form-status';
        formStatus.textContent = '';
      }, 8000);
    }, 1000);
  });
}

/* --------------------------------------------------------------------------
   10. TOAST NOTIFICATION HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent-primary); flex-shrink: 0;" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Auto-remove toast after 3.5 seconds
  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

