// ==================== ANIMACIÓN DE SCROLL ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Elementos que se animarán al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar animación según el tipo de elemento
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                } else if (entry.target.classList.contains('testimonio-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                } else if (entry.target.classList.contains('pricing-card')) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos los elementos que necesitan animación
    document.querySelectorAll('.service-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.testimonio-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.pricing-card').forEach(card => observer.observe(card));
});

// ==================== MENÚ HAMBURGUESA ==================== //
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animar las líneas del hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ==================== CONTADORES ANIMADOS ==================== //
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        
        let numberText = target.replace('%', '').replace('+', '').trim();
        const finalNumber = parseInt(numberText);
        
        let currentNumber = 0;
        const increment = Math.ceil(finalNumber / (speed / 16));

        const updateCount = () => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                if (isPercentage) {
                    counter.textContent = currentNumber + '%';
                } else if (isPlus) {
                    counter.textContent = currentNumber + '+';
                } else {
                    counter.textContent = currentNumber;
                }
            } else {
                if (isPercentage) {
                    counter.textContent = currentNumber + '%';
                } else if (isPlus) {
                    counter.textContent = currentNumber + '+';
                } else {
                    counter.textContent = currentNumber;
                }
                requestAnimationFrame(updateCount);
            }
        };

        updateCount();
    });
}

// Iniciar contadores cuando estén visibles
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ==================== FORMULARIO DE CONTACTO ==================== //
const contactForm = document.querySelector('.contacto-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validar campos
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            } else {
                input.style.borderColor = '';
                input.style.boxShadow = '';
            }
        });

        if (isValid) {
            // Simular envío
            const submitButton = contactForm.querySelector('.form-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = '✓ Mensaje Enviado';
            submitButton.style.background = '#16a34a';

            setTimeout(() => {
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.style.background = '';
                showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');
            }, 2000);
        } else {
            showNotification('Por favor, completa todos los campos.', 'error');
        }
    });
}

// ==================== NOTIFICACIONES ==================== //
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#16a34a' : type === 'error' ? '#ef4444' : '#0891b2'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideUp 0.3s ease-out;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== BOTONES CTA ==================== //
document.querySelectorAll('.cta-button, .cta-button-large, .pricing-button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Contratar') || this.textContent.includes('Consultar')) {
            showNotification('¡Gracias por tu interés! Nuestro equipo se contactará pronto.', 'success');
        } else if (this.textContent.includes('Solicitar') || this.textContent.includes('Agendar')) {
            // Scroll a la sección de contacto
            document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== EFECTOS DE MOUSE EN TARJETAS ==================== //
document.querySelectorAll('.service-card, .testimonio-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ==================== ANIMACIÓN DE NÚMEROS CON MULTIPLICADOR ==================== //
function formatNumber(num, isPrice = false) {
    if (isPrice) {
        return '$' + num.toLocaleString();
    }
    return num.toLocaleString();
}

// ==================== SCROLL INDICADOR ==================== //
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Cambiar color de navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    if (scrollTop > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

/* ==================== PARALLAX EFFECT ==================== */
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    
    // Parallax en hero background
    const heroBgImage = document.querySelector('.hero-background-image');
    if (heroBgImage) {
        heroBgImage.style.transform = `translateY(${scrollTop * 0.5}px)`;
    }

    // Parallax en hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollTop * 0.3}px)`;
    }
});

// ==================== LAZY LOADING SIMULADO ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Agregar animaciones suaves a todos los elementos cuando carga la página
    const allAnimatedElements = document.querySelectorAll(
        '.service-card, .testimonio-card, .pricing-card, .caracteristica-item'
    );

    allAnimatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
    });
});

// ==================== SMOOTH SCROLL LINKS ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ==================== DETECTAR REDUCCIÓN DE MOVIMIENTO ==================== //
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// ==================== EVENT LISTENERS PARA EFECTOS ADICIONALES ==================== //
document.addEventListener('DOMContentLoaded', () => {
    // Añadir efecto de ripple a botones
    document.querySelectorAll('.cta-button, .cta-button-large, .pricing-button, .form-submit').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                pointer-events: none;
                animation: scaleIn 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ==================== VALIDACIÓN DE EMAIL ==================== //
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Aplicar validación en tiempo real al campo de email
const emailInput = document.querySelector('input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
            this.style.borderColor = '#ef4444';
            showNotification('Por favor, ingresa un email válido.', 'error');
        } else {
            this.style.borderColor = '';
        }
    });
}

// ==================== EFECTO DE TIPO MÁQUINA EN HERO TITLE ==================== //
function typeEffect(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Aplicar efecto a hero title (opcional)
window.addEventListener('load', () => {
    // Descomentar si deseas el efecto de tipo máquina
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     typeEffect(heroTitle, heroTitle.textContent);
    // }
});

// ==================== ANIMACIÓN DE PROGRESO EN SCROLL ==================== //
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    // Puedes usar esto para mostrar una barra de progreso
    // document.documentElement.style.setProperty('--scroll-percent', scrollPercent + '%');
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== INICIALIZACIÓN ==================== //
console.log('SecureNet Pro - Página web cargada correctamente');
console.log('Versión: 1.0');
console.log('Animaciones y efectos activados');
