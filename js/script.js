// ===== MENU MOBILE =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

// Abrir menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
    });
}

// Fechar menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});

// ===== HEADER SCROLL =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== VALIDAÇÃO DE FORMULÁRIO =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Limpar erros anteriores
        clearErrors();
        
        // Obter valores dos campos
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validar nome
        if (name === '') {
            showError('name', 'Por favor, preencha seu nome');
            isValid = false;
        } else if (name.length < 3) {
            showError('name', 'O nome deve ter pelo menos 3 caracteres');
            isValid = false;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            showError('email', 'Por favor, preencha seu email');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError('email', 'Por favor, insira um email válido');
            isValid = false;
        }
        
        // Validar telefone (opcional, mas se preenchido, deve ser válido)
        if (phone !== '') {
            const phoneRegex = /^[\d\s\(\)\-]+$/;
            if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
                showError('phone', 'Por favor, insira um telefone válido');
                isValid = false;
            }
        }
        
        // Validar assunto
        if (subject === '') {
            showError('subject', 'Por favor, selecione um assunto');
            isValid = false;
        }
        
        // Validar mensagem
        if (message === '') {
            showError('message', 'Por favor, preencha a mensagem');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'A mensagem deve ter pelo menos 10 caracteres');
            isValid = false;
        }
        
        // Se válido, enviar formulário
        if (isValid) {
            // Simular envio (aqui você integraria com uma API)
            const formSuccess = document.getElementById('form-success');
            formSuccess.style.display = 'block';
            contactForm.reset();
            
            // Scroll para mensagem de sucesso
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Ocultar mensagem após 5 segundos
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });
}

// Função para mostrar erro
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (field && errorElement) {
        field.style.borderColor = '#ef4444';
        errorElement.textContent = message;
    }
}

// Função para limpar erros
function clearErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    
    errorElements.forEach(error => {
        error.textContent = '';
    });
    
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
}

// Limpar erros ao digitar
const formInputs = document.querySelectorAll('.form-input, .form-textarea');
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        const fieldId = input.id;
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (errorElement) {
            errorElement.textContent = '';
            input.style.borderColor = '';
        }
    });
});

// ===== MÁSCARA DE TELEFONE =====
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            if (value.length <= 10) {
                value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
            } else {
                value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
            }
            e.target.value = value;
        }
    });
}

// ===== ANIMAÇÕES AO SCROLL =====
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

// Observar elementos para animação
const animateElements = document.querySelectorAll('.highlight-card, .feature-item, .pricing-card, .benefit-item, .faq-item');
animateElements.forEach(el => {
    observer.observe(el);
});

// ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== EFEITO HOVER NOS CARDS =====
const cards = document.querySelectorAll('.highlight-card, .feature-item, .pricing-card, .benefit-item');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== VALIDAÇÃO EM TEMPO REAL =====
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const errorElement = document.getElementById('email-error');
        
        if (this.value && !emailRegex.test(this.value)) {
            showError('email', 'Por favor, insira um email válido');
        } else if (errorElement) {
            errorElement.textContent = '';
            this.style.borderColor = '';
        }
    });
}

// ===== PREVENIR ENVIO DUPLO DO FORMULÁRIO =====
if (contactForm) {
    let isSubmitting = false;
    
    contactForm.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        
        isSubmitting = true;
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
        }
        
        // Reabilitar após 3 segundos (simulando envio)
        setTimeout(() => {
            isSubmitting = false;
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensagem';
            }
        }, 3000);
    });
}

// ===== CONSOLE MESSAGE =====
console.log('%c💰 Finança Fácil', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cBem-vindo ao nosso site!', 'font-size: 14px; color: #6b7280;');
console.log('%cPara mais informações, entre em contato: contato@financafacil.com.br', 'font-size: 12px; color: #9ca3af;');

