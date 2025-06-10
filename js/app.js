// Main App Coordinator
class App {
    constructor() {
        this.components = {};
        this.isLoaded = false;
        this.init();
    }

    init() {
        this.bindGlobalEvents();
        this.initializeAnimations();
        this.setupPerformanceOptimizations();
        
        // Mark as loaded after all components are initialized
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                this.isLoaded = true;
                this.onAppReady();
            }, 500);
        });
    }

    bindGlobalEvents() {
        // Global scroll handler for parallax and other effects
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });

        // Handle visibility change (for performance optimization)
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Add scroll-based animations and effects
        this.updateScrollProgress(scrollY, documentHeight - windowHeight);
        this.handleParallaxEffects(scrollY);
        this.updateNavigationState(scrollY);
    }

    updateScrollProgress(current, total) {
        const progress = Math.min(current / total, 1);
        
        // Create or update progress bar
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--gradient-primary);
                z-index: 9999;
                transition: width 0.2s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${progress * 100}%`;
    }

    handleParallaxEffects(scrollY) {
        // Add subtle parallax to hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = 0.3;
            hero.style.transform = `translateY(${scrollY * speed}px)`;
        }

        // Float effect for certain elements
        const floatingElements = document.querySelectorAll('.floating-card');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = Math.sin(Date.now() * 0.001 + index) * 5;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    updateNavigationState(scrollY) {
        const header = document.querySelector('.header');
        if (header) {
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    handleResize() {
        // Handle responsive adjustments
        const windowWidth = window.innerWidth;
        
        // Update mobile menu visibility
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav-menu');
        
        if (windowWidth > 768 && nav) {
            nav.style.display = 'flex';
        } else if (windowWidth <= 768 && nav && mobileToggle) {
            nav.style.display = 'none';
        }

        // Recalculate animations if needed
        this.recalculateAnimations();
    }

    handleKeyPress(e) {
        // Add keyboard shortcuts
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.modal, .overlay');
            modals.forEach(modal => modal.remove());
        }
        
        if (e.key === 'Home' || (e.ctrlKey && e.key === 'Home')) {
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            e.preventDefault();
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Pause animations when tab is not visible
            this.pauseAnimations();
        } else {
            // Resume animations when tab becomes visible
            this.resumeAnimations();
        }
    }

    initializeAnimations() {
        // Setup Intersection Observer for scroll-triggered animations
        this.setupIntersectionObserver();
        
        // Add CSS animations for page load
        this.addPageLoadAnimations();
        
        // Setup cursor effects
        this.setupCursorEffects();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    
                    // Add staggered animation to child elements
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-fadeInUp');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all sections
        const sections = document.querySelectorAll('section, .hero, .main-services, .features');
        sections.forEach(section => {
            this.intersectionObserver.observe(section);
        });
    }

    addPageLoadAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--bg-primary);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }

            .page-loader.hidden {
                opacity: 0;
                visibility: hidden;
            }

            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid var(--border-color);
                border-top: 3px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .fade-in-element {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }

            .fade-in-element.visible {
                opacity: 1;
                transform: translateY(0);
            }

            .in-view {
                animation: sectionFadeIn 0.8s ease forwards;
            }

            @keyframes sectionFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Create and show loader
        this.showPageLoader();
    }

    showPageLoader() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        document.body.appendChild(loader);

        // Hide loader when page is ready
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    }

    setupCursorEffects() {
        // Add custom cursor for interactive elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '0.7';
        });

        // Add hover effects
        const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .logo-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.opacity = '0.5';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.opacity = '0.7';
            });
        });
    }

    setupPerformanceOptimizations() {
        // Lazy load images
        this.setupLazyLoading();
        
        // Optimize animations for performance
        this.optimizeAnimations();
        
        // Setup service worker for caching (if needed)
        this.setupServiceWorker();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
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

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Reduce animations on low-end devices
        const isLowEndDevice = navigator.hardwareConcurrency <= 2;
        
        if (isLowEndDevice) {
            document.body.classList.add('reduced-motion');
            
            const reduceMotionStyle = document.createElement('style');
            reduceMotionStyle.textContent = `
                .reduced-motion * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(reduceMotionStyle);
        }
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(() => {
                console.log('Service Worker registered');
            }).catch(() => {
                console.log('Service Worker registration failed');
            });
        }
    }

    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
    }

    recalculateAnimations() {
        // Recalculate animation timings and positions
        const animatedElements = document.querySelectorAll('[class*="animate-"]');
        animatedElements.forEach(element => {
            element.style.animationDelay = '0s';
        });
    }

    onAppReady() {
        console.log('🚀 Labelbox homepage loaded successfully!');
        
        // Trigger any final setup
        this.triggerReadyAnimations();
        
        // Setup analytics or tracking if needed
        this.setupAnalytics();
    }

    triggerReadyAnimations() {
        // Add final touches to the page
        document.body.classList.add('app-ready');
        
        // Trigger hero animations
        setTimeout(() => {
            const heroElements = document.querySelectorAll('.hero h1, .hero p, .hero-actions');
            heroElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.classList.add('animate-fadeInUp');
                }, index * 200);
            });
        }, 300);
    }

    setupAnalytics() {
        // Setup event tracking
        const trackableElements = document.querySelectorAll('.btn, .nav-menu a, .footer a');
        trackableElements.forEach(element => {
            element.addEventListener('click', () => {
                const action = element.textContent.trim();
                const category = element.closest('header') ? 'Navigation' : 
                                element.closest('footer') ? 'Footer' : 'Button';
                
                console.log('Event tracked:', { category, action });
                // Here you would send to your analytics service
            });
        });
    }

    // Utility function for debouncing
    debounce(func, wait) {
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
}

// Initialize the app
const app = new App(); 