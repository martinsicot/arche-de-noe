// Main JavaScript for L'Arche de Noé website

// ============================================
// 1. THEME MANAGEMENT
// ============================================

const themeBtn = document.getElementById('theme-btn');
const themeMenu = document.getElementById('theme-menu');
const themeButtons = document.querySelectorAll('[data-theme]');

// Toggle theme menu
themeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('hidden');
});

// Close theme menu when clicking outside
document.addEventListener('click', (e) => {
    if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
        themeMenu.classList.add('hidden');
    }
});

// Change theme
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeMenu.classList.add('hidden');
    });
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'nature';
document.documentElement.setAttribute('data-theme', savedTheme);


// ============================================
// 2. LANGUAGE MANAGEMENT (i18n)
// ============================================

const langBtn = document.getElementById('lang-btn');
const langMenu = document.getElementById('lang-menu');
const langButtons = document.querySelectorAll('[data-lang]');
const currentLangEl = document.getElementById('current-lang');

// Toggle language menu
langBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('hidden');
});

// Close language menu when clicking outside
document.addEventListener('click', (e) => {
    if (!langMenu.contains(e.target) && e.target !== langBtn) {
        langMenu.classList.add('hidden');
    }
});

// Change language
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        langMenu.classList.add('hidden');
    });
});

// Set language function
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.setAttribute('lang', lang);
    currentLangEl.textContent = lang.toUpperCase();
    translatePage(lang);
}

// Translate page
function translatePage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations[lang], key);

        if (translation) {
            // Check if it's an input placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translation;
            } else {
                el.textContent = translation;
            }
        }
    });

    // Re-initialize Lucide icons after translation
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Helper function to get nested translation
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((current, key) => {
        // Handle array indices for lists
        if (key.includes('[') && key.includes(']')) {
            const arrayKey = key.substring(0, key.indexOf('['));
            const index = parseInt(key.substring(key.indexOf('[') + 1, key.indexOf(']')));
            return current?.[arrayKey]?.[index];
        }
        return current?.[key];
    }, obj);
}

// Load saved language or default to French
const savedLang = localStorage.getItem('language') || 'fr';
setLanguage(savedLang);


// ============================================
// 3. MOBILE MENU
// ============================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');

    // Animate icon
    const icon = mobileMenuBtn.querySelector('[data-lucide]');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu?.querySelectorAll('a');
mobileLinks?.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('[data-lucide]');
        icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });
});


// ============================================
// 4. SMOOTH SCROLL & ACTIVE NAV
// ============================================

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if it's just '#'
        if (href === '#') return;

        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.getElementById('navbar').offsetHeight;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    // Update active class
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-primary', 'font-semibold');
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('text-primary', 'font-semibold');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);


// ============================================
// 5. GALLERY & LIGHTBOX
// ============================================

const galleryFilters = document.querySelectorAll('.gallery-filter');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

// Filter gallery
galleryFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.getAttribute('data-filter');

        // Update active filter button
        galleryFilters.forEach(f => {
            f.classList.remove('active', 'bg-primary', 'text-white');
            f.classList.add('bg-white');
        });
        filter.classList.add('active', 'bg-primary', 'text-white');
        filter.classList.remove('bg-white');

        // Filter items
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Open lightbox
galleryItems.forEach(item => {
    const img = item.querySelector('img');
    img?.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
lightboxClose?.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});


// ============================================
// 6. FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = question.querySelector('[data-lucide="chevron-down"]');

    question?.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close all other FAQs
        faqItems.forEach(otherItem => {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('[data-lucide]');
            otherAnswer.classList.add('hidden');
            otherIcon.style.transform = 'rotate(0deg)';
        });

        // Toggle current FAQ
        if (isOpen) {
            answer.classList.add('hidden');
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.classList.remove('hidden');
            icon.style.transform = 'rotate(180deg)';
        }
    });
});


// ============================================
// 7. CONTACT FORM
// ============================================

const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        });

        if (response.ok) {
            formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700');
            formMessage.classList.add('bg-green-100', 'text-green-700');
            formMessage.textContent = translations[savedLang].contact.form.success;
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700');
        formMessage.classList.add('bg-red-100', 'text-red-700');
        formMessage.textContent = translations[savedLang].contact.form.error;
    }

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
});


// ============================================
// 8. BACK TO TOP BUTTON
// ============================================

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
        backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
});

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// ============================================
// 9. SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, .faq-item').forEach(el => {
    observer.observe(el);
});


// ============================================
// 10. NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }

    lastScroll = currentScroll;
});


// ============================================
// 11. INITIALIZATION
// ============================================

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Update active nav
    updateActiveNav();

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
            }, index * 100);
        });
    }, 100);
});


// ============================================
// 12. ACCESSIBILITY ENHANCEMENTS
// ============================================

// Trap focus in mobile menu when open
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !mobileMenu.classList.contains('hidden')) {
        const focusableElements = mobileMenu.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('[data-lucide]');
        icon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        mobileMenuBtn.focus();
    }
});


// ============================================
// 13. PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for scroll events
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

// Apply debounce to scroll handlers
const debouncedUpdateActiveNav = debounce(updateActiveNav, 100);
window.addEventListener('scroll', debouncedUpdateActiveNav);

console.log('🎨 L\'Arche de Noé website loaded successfully!');
