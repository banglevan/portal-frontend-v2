// Gallery App Initialization
class GalleryApp {
    constructor() {
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

            console.log('Gallery app initialized successfully');
        } catch (error) {
            console.error('Error initializing gallery app:', error);
        }
    }

    async loadComponent(componentName) {
        const container = document.getElementById(componentName);
        if (container && window[`${componentName}Component`]) {
            const component = new window[`${componentName}Component`]();
            if (component.render) {
                container.innerHTML = component.render();
            }
        }
    }

    initNavigation() {
        // Set active navigation item
        const navItems = document.querySelectorAll('.nav-link');
        navItems.forEach(item => {
            if (item.textContent.toLowerCase().includes('gallery') || 
                item.href?.includes('gallery')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                const href = navLink.getAttribute('href');
                
                if (href === 'index.html' || href === './') {
                    e.preventDefault();
                    window.location.href = 'index.html';
                } else if (href === 'gallery.html' || href === './gallery.html') {
                    // Already on gallery page
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
    }

    addBreadcrumb() {
        const heroSection = document.querySelector('.gallery-hero .container');
        if (heroSection) {
            const breadcrumb = document.createElement('nav');
            breadcrumb.className = 'breadcrumb';
            breadcrumb.innerHTML = `
                <span class="breadcrumb-item">
                    <a href="index.html">Home</a>
                </span>
                <span class="breadcrumb-separator">›</span>
                <span class="breadcrumb-item active">Gallery</span>
            `;

            // Insert at the beginning of hero container
            heroSection.insertBefore(breadcrumb, heroSection.firstChild);
        }

        // Add breadcrumb styles
        const breadcrumbStyles = `
            .breadcrumb {
                margin-bottom: 30px;
                font-size: 14px;
                color: var(--text-secondary);
            }
            .breadcrumb-item a {
                color: var(--text-secondary);
                text-decoration: none;
                transition: color 0.3s ease;
            }
            .breadcrumb-item a:hover {
                color: var(--primary-color);
            }
            .breadcrumb-item.active {
                color: var(--text-primary);
                font-weight: 500;
            }
            .breadcrumb-separator {
                margin: 0 8px;
                opacity: 0.5;
            }
        `;

        if (!document.querySelector('#breadcrumb-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'breadcrumb-styles';
            styleElement.textContent = breadcrumbStyles;
            document.head.appendChild(styleElement);
        }
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle if no input is focused
            if (document.activeElement.tagName === 'INPUT') return;

            switch(e.key) {
                case '/':
                    e.preventDefault();
                    const searchBox = document.querySelector('.search-box');
                    if (searchBox) {
                        searchBox.focus();
                    }
                    break;
                    
                case 'h':
                    e.preventDefault();
                    window.location.href = 'index.html';
                    break;
                    
                case 'r':
                    e.preventDefault();
                    window.location.reload();
                    break;
            }
        });

        // Add keyboard shortcuts help
        this.addKeyboardShortcutsHelp();
    }

    addKeyboardShortcutsHelp() {
        const helpButton = document.createElement('button');
        helpButton.className = 'keyboard-help-btn';
        helpButton.innerHTML = '⌨️';
        helpButton.title = 'Keyboard shortcuts';
        
        helpButton.addEventListener('click', () => {
            this.showKeyboardShortcuts();
        });

        document.body.appendChild(helpButton);

        // Add help button styles
        const helpStyles = `
            .keyboard-help-btn {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                opacity: 0.8;
            }
            .keyboard-help-btn:hover {
                opacity: 1;
                transform: scale(1.1);
            }
        `;

        if (!document.querySelector('#help-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'help-styles';
            styleElement.textContent = helpStyles;
            document.head.appendChild(styleElement);
        }
    }

    showKeyboardShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'shortcuts-modal-overlay';
        modal.innerHTML = `
            <div class="shortcuts-modal">
                <div class="shortcuts-header">
                    <h3>Keyboard Shortcuts</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="shortcuts-content">
                    <div class="shortcut-item">
                        <kbd>/</kbd>
                        <span>Focus search box</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>H</kbd>
                        <span>Go to homepage</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>R</kbd>
                        <span>Reload page</span>
                    </div>
                    <div class="shortcut-item">
                        <kbd>Esc</kbd>
                        <span>Clear search / Close modal</span>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .shortcuts-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .shortcuts-modal {
                background: white;
                border-radius: 16px;
                max-width: 400px;
                width: 90%;
                animation: slideInUp 0.3s ease;
            }
            .shortcuts-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 30px 30px 20px;
                border-bottom: 1px solid var(--border-color);
            }
            .shortcuts-header h3 {
                margin: 0;
                color: var(--text-primary);
            }
            .shortcuts-content {
                padding: 20px 30px 30px;
            }
            .shortcut-item {
                display: flex;
                align-items: center;
                gap: 20px;
                padding: 12px 0;
                border-bottom: 1px solid var(--border-color);
            }
            .shortcut-item:last-child {
                border-bottom: none;
            }
            .shortcut-item kbd {
                background: var(--bg-secondary);
                padding: 6px 12px;
                border-radius: 6px;
                font-family: monospace;
                font-weight: bold;
                border: 1px solid var(--border-color);
                min-width: 40px;
                text-align: center;
            }
            .shortcut-item span {
                color: var(--text-secondary);
            }
        `;

        if (!document.querySelector('#shortcuts-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'shortcuts-styles';
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(modal);

        // Close modal events
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.remove();
            }
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    addScrollEffects() {
        let ticking = false;

        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.gallery-hero');
            
            if (hero) {
                // Parallax effect
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }

            ticking = false;
        }

        function requestScrollUpdate() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestScrollUpdate);
    }

    addBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.title = 'Back to top';
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        document.body.appendChild(backToTopBtn);

        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Add back to top styles
        const backToTopStyles = `
            .back-to-top {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--primary-color);
                color: white;
                border: none;
                font-size: 20px;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
            }
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .back-to-top:hover {
                transform: scale(1.1) translateY(0);
                background: var(--primary-dark);
            }
        `;

        if (!document.querySelector('#back-to-top-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'back-to-top-styles';
            styleElement.textContent = backToTopStyles;
            document.head.appendChild(styleElement);
        }
    }
}

// Initialize the gallery app
document.addEventListener('DOMContentLoaded', () => {
    new GalleryApp();
}); 