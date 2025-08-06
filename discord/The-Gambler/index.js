// Burger menu functionality
const burgerMenu = document.getElementById('burgerMenu');
const mobileMenu = document.getElementById('mobileMenu');

burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = burgerMenu.contains(event.target) || mobileMenu.contains(event.target);
    if (!isClickInsideNav && mobileMenu.classList.contains('active')) {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Add fade-in animation to cards when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px) translateY(-2px)';
        this.style.boxShadow = '0 4px 20px rgba(26, 115, 232, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) translateY(0)';
        this.style.boxShadow = 'none';
    });
});

// Add loading animation on page load
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
});

// Initialize page with loading state
document.body.style.opacity = '0';
document.body.style.transform = 'translateY(10px)';
document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

// Add active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Handle window resize to close mobile menu if screen gets larger
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// // Back to top button functionality
// const backToTopBtn = document.getElementById('backToTop');

// window.addEventListener('scroll', function() {
//     if (window.pageYOffset > 300) {
//         backToTopBtn.style.display = 'block';
//     } else {
//         backToTopBtn.style.display = 'none';
//     }
// });

// backToTopBtn.addEventListener('click', function() {
//     window.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//     });
// });

// Enhanced form handling with better UX
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#message .contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="material-icons">hourglass_empty</span> Sending...';
            submitBtn.disabled = true;
            
            // Reset button after 3 seconds (form will redirect anyway)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Add focus animations to form inputs
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});