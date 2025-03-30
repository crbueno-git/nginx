// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            
            // Animação do ícone do menu
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        });
    });
    
    // Adicionar classe 'scrolled' ao header quando rolar a página
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animação de elementos ao scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Adicionar classe para animação em elementos específicos
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const features = section.querySelectorAll('.feature, .step, .benefit-card');
        features.forEach(feature => {
            feature.classList.add('animate-on-scroll');
        });
    });
    
    // Executar animação no carregamento e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulário de contato - Prevenção de envio e feedback
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio bem-sucedido
            const formElements = this.elements;
            let isValid = true;
            
            // Validação básica
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].type !== 'submit' && formElements[i].value.trim() === '') {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].classList.remove('error');
                }
            }
            
            if (isValid) {
                // Feedback de sucesso
                this.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Mensagem Enviada!</h3><p>Agradecemos seu contato. Retornaremos em breve.</p></div>';
                
                // Resetar formulário após alguns segundos (em um caso real, isso seria após confirmação do servidor)
                setTimeout(() => {
                    this.reset();
                    this.innerHTML = `
                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input type="text" id="name" name="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                        <div class="form-group">
                            <label for="subject">Assunto</label>
                            <input type="text" id="subject" name="subject" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Mensagem</label>
                            <textarea id="message" name="message" rows="5" required></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Enviar Mensagem</button>
                    `;
                }, 5000);
            }
        });
    }
    
    // Adicionar contador de estatísticas
    const statsElements = document.querySelectorAll('.stat-number');
    if (statsElements.length > 0) {
        const animateStats = function() {
            statsElements.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 segundos
                const startTime = Date.now();
                
                const updateStat = function() {
                    const currentTime = Date.now();
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const value = Math.floor(progress * target);
                    
                    stat.textContent = value.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };
                
                updateStat();
            });
        };
        
        // Iniciar animação quando a seção estiver visível
        const statsSection = statsElements[0].closest('section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
});

// Adicionar estilos CSS para o menu mobile e animações
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        /* Menu Mobile Styles */
        @media (max-width: 768px) {
            nav {
                position: fixed;
                top: 70px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background-color: var(--primary-color);
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            nav.active {
                left: 0;
            }
            
            nav ul {
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                padding: 20px 0;
            }
            
            nav ul li {
                margin: 15px 0;
            }
            
            .mobile-menu-toggle span {
                transition: all 0.3s ease;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        /* Animações */
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Delay para animações em sequência */
        .feature:nth-child(2),
        .step:nth-child(2),
        .benefit-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature:nth-child(3),
        .step:nth-child(3),
        .benefit-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .feature:nth-child(4),
        .step:nth-child(4),
        .benefit-card:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        .feature:nth-child(5),
        .benefit-card:nth-child(5) {
            transition-delay: 0.8s;
        }
        
        .feature:nth-child(6),
        .benefit-card:nth-child(6) {
            transition-delay: 1s;
        }
        
        /* Estilo para header com scroll */
        header.scrolled {
            padding: 10px 0;
            background-color: rgba(5, 20, 64, 0.98);
        }
        
        /* Estilo para formulário */
        .form-group input.error,
        .form-group textarea.error {
            border-color: #ff3860;
            box-shadow: 0 0 0 2px rgba(255, 56, 96, 0.2);
        }
        
        .success-message {
            text-align: center;
            padding: 30px 20px;
        }
        
        .success-message i {
            font-size: 4rem;
            color: #23d160;
            margin-bottom: 20px;
        }
        
        .success-message h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: var(--primary-color);
        }
    `;
    
    document.head.appendChild(style);
});