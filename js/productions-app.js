// Productions App Initialization
class ProductionsApp {
    constructor() {
        this.headerComponent = null;
        this.footerComponent = null;
        this.productionsComponent = null;
        this.init();
    }

    async init() {
        try {
            // Load header component
            await this.loadComponent('header');
            
            // Load footer component  
            await this.loadComponent('footer');

            // Initialize navigation
            this.initNavigation();

            // Add page-specific functionality
            this.addPageSpecifics();

            console.log('Productions app initialized successfully');
        } catch (error) {
            console.error('Error initializing productions app:', error);
        }
    }

    async loadComponent(componentName) {
        return new Promise((resolve) => {
            // Components are loaded via script tags in HTML
            // This method ensures they're properly initialized
            const checkComponent = () => {
                if (componentName === 'header' && typeof HeaderComponent !== 'undefined') {
                    this.headerComponent = new HeaderComponent();
                    resolve();
                } else if (componentName === 'footer' && typeof FooterComponent !== 'undefined') {
                    this.footerComponent = new FooterComponent();
                    resolve();
                } else {
                    setTimeout(checkComponent, 50);
                }
            };
            checkComponent();
        });
    }

    initNavigation() {
        // Set active navigation item
        const navItems = document.querySelectorAll('.nav-menu a');
        navItems.forEach(item => {
            if (item.textContent.toLowerCase().includes('productions') || 
                item.href?.includes('productions')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-menu a');
            if (navLink) {
                const href = navLink.getAttribute('href');
                
                if (href === 'index.html' || href === './') {
                    e.preventDefault();
                    window.location.href = 'index.html';
                } else if (href === 'gallery.html') {
                    e.preventDefault();
                    window.location.href = 'gallery.html';
                } else if (href === 'applications-manager.html') {
                    e.preventDefault();
                    window.location.href = 'applications-manager.html';
                } else if (href === 'productions.html') {
                    // Already on productions page
                    e.preventDefault();
                }
            }
        });
    }

    addPageSpecifics() {
        // Add breadcrumb navigation
        this.addBreadcrumb();

        // Add keyboard shortcuts
        this.addKeyboardShortcuts();

        // Add scroll effects
        this.addScrollEffects();

        // Add back to top button
        this.addBackToTop();

        // Add page loading animation
        this.addLoadingAnimation();
    }

    addBreadcrumb() {
        const breadcrumb = document.createElement('div');
        breadcrumb.className = 'breadcrumb';
        breadcrumb.innerHTML = `
            <div class="container">
                <nav>
                    <a href="index.html">Home</a>
                    <span class="separator">›</span>
                    <span class="current">Productions</span>
                </nav>
            </div>
        `;
        
        // Insert after header
        const header = document.getElementById('header');
        if (header && header.nextSibling) {
            header.parentNode.insertBefore(breadcrumb, header.nextSibling);
        }

        // Add breadcrumb styles
        const style = document.createElement('style');
        style.textContent = `
            .breadcrumb {
                background: var(--bg-secondary);
                padding: 10px 0;
                border-bottom: 1px solid var(--border-color);
            }
            .breadcrumb nav {
                display: flex;
                align-items: center;
                font-size: 14px;
            }
            .breadcrumb a {
                color: var(--primary-color);
                text-decoration: none;
            }
            .breadcrumb a:hover {
                text-decoration: underline;
            }
            .breadcrumb .separator {
                margin: 0 10px;
                color: var(--text-secondary);
            }
            .breadcrumb .current {
                color: var(--text-primary);
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Alt + H: Go to Home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            
            // Alt + G: Go to Gallery
            if (e.altKey && e.key === 'g') {
                e.preventDefault();
                window.location.href = 'gallery.html';
            }
            
            // Alt + A: Go to Applications
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                window.location.href = 'applications-manager.html';
            }
            
            // Escape: Close any open modals
            if (e.key === 'Escape') {
                const modals = document.querySelectorAll('.product-modal-overlay, .category-modal-overlay');
                modals.forEach(modal => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                        document.body.style.overflow = '';
                    }
                });
            }
        });
    }

    addScrollEffects() {
        let ticking = false;

        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            
            // Header shadow effect
            const header = document.querySelector('.header');
            if (header) {
                if (scrolled > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate);
    }

    addBackToTop() {
        const backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '↑';
        backToTop.setAttribute('aria-label', 'Back to top');
        
        document.body.appendChild(backToTop);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 100;
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            .back-to-top:hover {
                background: var(--secondary-color);
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
            }
            @media (max-width: 768px) {
                .back-to-top {
                    bottom: 20px;
                    right: 20px;
                    width: 45px;
                    height: 45px;
                    font-size: 18px;
                }
            }
        `;
        document.head.appendChild(style);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    addLoadingAnimation() {
        // Add fade-in animation to page elements
        const elements = document.querySelectorAll('.productions-hero, .product-categories, .product-showcase, .cta-section');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }
}

// Initialize the Productions app
const productionsApp = new ProductionsApp(); 