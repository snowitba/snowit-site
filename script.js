// ==================== 
// Mobile Menu Toggle
// ====================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-content')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ==================== 
// Smooth Scrolling
// ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 
// Contact Form Handling
// ====================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!data.name || !data.company || !data.email || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        submitButton.style.opacity = '0.7';
        
        // TODO: Replace with actual form submission endpoint
        // For now, simulate submission
        console.log('Form Data:', data);
        
        // Simulate API call
        try {
            // In production, replace this with your actual API endpoint:
            // const response = await fetch('https://your-api-endpoint.com/contact', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // });
            
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            
            // Optional: Send to console for testing
            console.log('Form submitted successfully:', data);
            
            // Optional: Reset form after some time
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                submitButton.style.opacity = '1';
            }, 5000);
            
        } catch (error) {
            console.error('Form submission error:', error);
            alert('There was an error submitting the form. Please try again or contact us directly at info@snowit.ba');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.style.opacity = '1';
        }
    });
}

// ==================== 
// Scroll Animations
// ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animationObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
    animationObserver.observe(card);
    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 1500 + index * 100);
});

// Observe advantages
document.querySelectorAll('.advantage').forEach((advantage, index) => {
    advantage.style.opacity = '0';
    advantage.style.transform = 'translateY(30px)';
    advantage.style.transition = `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`;
    animationObserver.observe(advantage);
    setTimeout(() => { advantage.style.opacity = '1'; advantage.style.transform = 'translateY(0)'; }, 1500 + index * 100);
});

// Observe stats
document.querySelectorAll('.stat').forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`;
    animationObserver.observe(stat);
    setTimeout(() => { stat.style.opacity = '1'; stat.style.transform = 'translateY(0)'; }, 1500 + index * 150);
});

// ==================== 
// Navbar Scroll Effect
// ====================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ==================== 
// Counter Animation for Stats
// ====================

function animateCounter(element, target, suffix = '', isDecimal = false) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number
        let displayValue;
        if (isDecimal) {
            displayValue = current.toFixed(1);
        } else {
            displayValue = Math.floor(current);
        }
        
        element.textContent = displayValue + suffix;
    }, 16);
}

// Observe stat numbers for animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseFloat(statNumber.getAttribute('data-target'));
            
            // Determine suffix and format
            let suffix = '+';
            let isDecimal = false;
            
            if (target < 1) {
                // It's a percentage like 0.999 for 99.9%
                suffix = '%';
                isDecimal = true;
            } else if (target >= 10 && target < 100) {
                suffix = '+';
            } else if (target >= 99) {
                suffix = '%';
                isDecimal = true;
            }
            
            animateCounter(statNumber, target, suffix, isDecimal);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statObserver.observe(stat);
});

// ==================== 
// Form Input Enhancements
// ====================

// Add focus classes for better UX
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
        if (input.value) {
            input.parentElement.classList.add('filled');
        } else {
            input.parentElement.classList.remove('filled');
        }
    });
});

// ==================== 
// 3D Tilt Effect for Cards
// ====================

const tiltCards = document.querySelectorAll('.service-card, .advantage');

tiltCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.1s ease';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        this.style.transform = `translateY(-12px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ==================== 
// Parallax Effect for Hero
// ====================

const heroImage = document.querySelector('.hero-image');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        
        if (scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${rate}px) perspective(1000px) rotateY(-5deg)`;
        }
    });
}

// ==================== 
// Add Pulse Animation to CTA Button
// ====================

const heroCTA = document.querySelector('.hero-cta .btn-glow');
if (heroCTA) {
    setInterval(() => {
        heroCTA.style.animation = 'none';
        setTimeout(() => {
            heroCTA.style.animation = 'pulse 2.5s ease-in-out';
        }, 10);
    }, 5000);
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            box-shadow: 0 0 20px rgba(46, 134, 222, 0.4);
        }
        50% {
            box-shadow: 0 0 40px rgba(46, 134, 222, 0.7);
        }
    }
`;
document.head.appendChild(style);

// ==================== 
// Smooth Reveal for Sections
// ====================

const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

sections.forEach((section, i) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
    setTimeout(() => { section.style.opacity = '1'; section.style.transform = 'translateY(0)'; }, 1000 + i * 200);
});

// ==================== 
// Image Lazy Loading Enhancement
// ====================

const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==================== 
// Console Message
// ====================

console.log(
    '%c🔷 SnowIt - Technology Solutions That Move Industries Forward',
    'color: #2E86DE; font-size: 18px; font-weight: bold; padding: 10px;'
);
console.log(
    '%c💼 Enterprise IT Solutions for Healthcare, Transportation & Critical Infrastructure',
    'color: #1B2A4A; font-size: 14px;'
);
console.log(
    '%c🌐 Led by Asmir Merdžanović | Bosnia and Herzegovina',
    'color: #64748B; font-size: 12px;'
);
