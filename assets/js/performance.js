// Performance.js - Otimizações críticas de performance
(function() {
    'use strict';

    // 1. Lazy Loading para imagens
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // 2. Resource Hints
    function addResourceHints() {
        const head = document.head;
        
        // Preconnect para fontes externas
        const preconnectGoogle = document.createElement('link');
        preconnectGoogle.rel = 'preconnect';
        preconnectGoogle.href = 'https://fonts.googleapis.com';
        head.appendChild(preconnectGoogle);

        const preconnectGstatic = document.createElement('link');
        preconnectGstatic.rel = 'preconnect';
        preconnectGstatic.href = 'https://fonts.gstatic.com';
        preconnectGstatic.crossOrigin = '';
        head.appendChild(preconnectGstatic);

        // Preload crítico CSS
        const preloadCSS = document.createElement('link');
        preloadCSS.rel = 'preload';
        preloadCSS.href = 'assets/css/styles.css';
        preloadCSS.as = 'style';
        head.appendChild(preloadCSS);
    }

    // 3. Service Worker para cache
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registrado com sucesso:', registration.scope);
                    })
                    .catch(registrationError => {
                        console.log('Falha no registro do SW:', registrationError);
                    });
            });
        }
    }

    // 4. Debounce para eventos de scroll
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

    // 5. Otimização de scroll
    let isScrolling = false;
    const handleScroll = debounce(() => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Lógica de scroll otimizada
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.parallax');
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });

                isScrolling = false;
            });
        }
        isScrolling = true;
    }, 16);

    // 6. Minificação de CSS crítico inline
    function optimizeCriticalCSS() {
        const criticalStyles = `
            *{margin:0;padding:0;box-sizing:border-box}
            body{font-family:Poppins,sans-serif;line-height:1.6;color:#333;overflow-x:hidden}
            .hero{min-height:100vh;background:linear-gradient(135deg,#ff6b6b,#4ecdc4);display:flex;align-items:center;justify-content:center;position:relative}
            .container{max-width:1200px;margin:0 auto;padding:0 20px}
            .btn-primary{background:linear-gradient(135deg,#ff6b6b,#ff8e8e);color:#fff;padding:15px 30px;border:none;border-radius:50px;font-size:1.1rem;cursor:pointer;transition:all 0.3s ease;text-decoration:none;display:inline-block}
            .btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(255,107,107,0.3)}
        `;

        const style = document.createElement('style');
        style.textContent = criticalStyles;
        document.head.insertBefore(style, document.head.firstChild);
    }

    // 7. Preload de recursos críticos
    function preloadCriticalResources() {
        const criticalResources = [
            { href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', as: 'style' },
            { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap', as: 'style' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
            document.head.appendChild(link);
        });
    }

    // 8. Inicialização otimizada
    function initPerformanceOptimizations() {
        // Otimizações imediatas
        optimizeCriticalCSS();
        addResourceHints();
        preloadCriticalResources();

        // Otimizações após DOM carregado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setupLazyLoading();
                registerServiceWorker();
                window.addEventListener('scroll', handleScroll, { passive: true });
            });
        } else {
            setupLazyLoading();
            registerServiceWorker();
            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    }

    // 9. Performance Monitoring
    function initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    const domContentLoaded = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart;
                    
                    console.log('Performance Metrics:', {
                        loadTime: `${loadTime}ms`,
                        domContentLoaded: `${domContentLoaded}ms`,
                        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 'N/A'
                    });

                    // Enviar métricas para analytics (se necessário)
                    if (window.gtag) {
                        gtag('event', 'page_load_time', {
                            value: Math.round(loadTime),
                            event_category: 'Performance'
                        });
                    }
                }, 0);
            });
        }
    }

    // Inicializar todas as otimizações
    initPerformanceOptimizations();
    initPerformanceMonitoring();

})();
