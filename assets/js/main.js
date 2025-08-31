// ===== CURSO AUTO MAQUIAGEM - MAIN SCRIPT =====
// Desenvolvido por Sena Technologies

(function() {
    'use strict';

    // ===== CONFIGURAÇÕES =====
    const CONFIG = {
        animationDuration: 800,
        scrollOffset: 100,
        debounceDelay: 250
    };

    // ===== UTILITY FUNCTIONS =====
    const utils = {
        // Debounce function para otimizar performance
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Smooth scroll para elementos
        smoothScroll: function(target, duration = 800) {
            const targetElement = document.querySelector(target);
            if (!targetElement) return;

            const targetPosition = targetElement.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        },

        // Verificar se elemento está visível
        isElementVisible: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
    };

    // ===== HEADER SCROLL EFFECT =====
    const headerScrollEffect = () => {
        const header = document.querySelector('header');
        if (!header) return;

        const handleScroll = utils.debounce(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, CONFIG.debounceDelay);

        window.addEventListener('scroll', handleScroll);
    };

    // ===== MOBILE MENU =====
    const mobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Accessibility
            const isOpen = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            navMenu.setAttribute('aria-hidden', !isOpen);
        });

        // Fechar menu ao clicar em link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
                navMenu.setAttribute('aria-hidden', true);
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', false);
                navMenu.setAttribute('aria-hidden', true);
            }
        });
    };

    // ===== SMOOTH SCROLL NAVIGATION =====
    const smoothScrollNavigation = () => {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                if (target && target !== '#') {
                    utils.smoothScroll(target);
                }
            });
        });
    };

    // ===== SCROLL ANIMATIONS =====
    const scrollAnimations = () => {
        const animatedElements = document.querySelectorAll('.scroll-fade');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    };

    // ===== CTA BUTTON TRACKING =====
    const ctaTracking = () => {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                // Analytics tracking
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'click', {
                        event_category: 'CTA',
                        event_label: `CTA Button ${index + 1}`,
                        value: 1
                    });
                }

                // Loading state
                const originalText = button.textContent;
                button.style.pointerEvents = 'none';
                button.innerHTML = '<span class="loading"></span> Carregando...';
                
                setTimeout(() => {
                    button.style.pointerEvents = 'auto';
                    button.textContent = originalText;
                }, 2000);

                console.log('CTA clicked:', {
                    button: index + 1,
                    text: originalText,
                    timestamp: new Date().toISOString()
                });
            });
        });
    };

    // ===== FORM HANDLING =====
    const formHandling = () => {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton ? submitButton.textContent : '';
                
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.innerHTML = '<span class="loading"></span> Enviando...';
                }

                // Simular envio (substituir por integração real)
                setTimeout(() => {
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }
                    
                    // Mostrar mensagem de sucesso
                    showNotification('Mensagem enviada com sucesso!', 'success');
                }, 2000);
            });
        });
    };

    // ===== NOTIFICATION SYSTEM =====
    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles inline para garantir funcionamento
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#28a745' : '#17a2b8',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '5px',
            zIndex: '9999',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Remover após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    };

    // ===== LAZY LOADING IMAGES =====
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    };

    // ===== PERFORMANCE MONITORING =====
    const performanceMonitoring = () => {
        if (typeof performance !== 'undefined' && performance.timing) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const timing = performance.timing;
                    const loadTime = timing.loadEventEnd - timing.navigationStart;
                    
                    console.log('Performance Metrics:', {
                        loadTime: loadTime + 'ms',
                        domReady: (timing.domContentLoadedEventEnd - timing.navigationStart) + 'ms',
                        firstPaint: performance.getEntriesByType('paint')[0]?.startTime + 'ms'
                    });

                    // Enviar métricas para analytics se disponível
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'timing_complete', {
                            name: 'load',
                            value: loadTime
                        });
                    }
                }, 1000);
            });
        }
    };

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    const accessibilityImprovements = () => {
        // Focus trap para modal (se existir)
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                modal.addEventListener('keydown', (e) => {
                    if (e.key === 'Tab') {
                        if (e.shiftKey) {
                            if (document.activeElement === firstElement) {
                                lastElement.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                firstElement.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });
            }
        });

        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Pular para o conteúdo principal';
        
        Object.assign(skipLink.style, {
            position: 'absolute',
            top: '-40px',
            left: '6px',
            background: '#000',
            color: '#fff',
            padding: '8px',
            textDecoration: 'none',
            zIndex: '10000',
            borderRadius: '4px'
        });

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    };

    // ===== INICIALIZAÇÃO =====
    const init = () => {
        // Verificar se DOM está pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        try {
            headerScrollEffect();
            mobileMenu();
            smoothScrollNavigation();
            scrollAnimations();
            ctaTracking();
            formHandling();
            lazyLoadImages();
            performanceMonitoring();
            accessibilityImprovements();

            console.log('🎉 Curso Auto Maquiagem - Script inicializado com sucesso!');
            
        } catch (error) {
            console.error('Erro na inicialização do script:', error);
        }
    };

    // ===== ERROR HANDLING =====
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
        
        // Enviar erro para analytics se disponível
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: e.error.toString(),
                fatal: false
            });
        }
    });

    // Inicializar quando script for carregado
    init();

})();
