// Header Component
class HeaderComponent {
    constructor() {
        this.headerElement = null;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        const headerHTML = `
            <div class="header">
                <div class="container">
                    <a href="#" class="logo">
                        <div class="logo-icon">L</div>
                        <span>Labelbox</span>
                    </a>
                    
                    <nav>
                        <ul class="nav-menu">
                            <li><a href="#platform">Platform</a></li>
                            <li><a href="#gallery">Gallery</a></li>
                            <li><a href="#applications">Applications</a></li>
                            <li><a href="#resources">Resources</a></li>
                            <li><a href="#pricing">Pricing</a></li>
                        </ul>
                    </nav>
                    
                    <div class="header-actions">
                        <a href="#" class="btn btn-outline">Sign In</a>
                        <a href="#" class="btn btn-primary">Start for Free</a>
                    </div>
                </div>
            </div>
        `;

        const headerContainer = document.getElementById('header');
        headerContainer.innerHTML = headerHTML;
        this.headerElement = headerContainer.querySelector('.header');
    }

    bindEvents() {
        // Add scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.headerElement.classList.add('scrolled');
            } else {
                this.headerElement.classList.remove('scrolled');
            }
        });

        // Smooth scroll for navigation links
        const navLinks = this.headerElement.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#') && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Add mobile menu toggle (for future mobile implementation)
        this.addMobileMenuToggle();
    }

    addMobileMenuToggle() {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = '☰';
        mobileToggle.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            color: var(--text-primary);
            cursor: pointer;
            @media (max-width: 768px) {
                display: block;
            }
        `;

        const container = this.headerElement.querySelector('.container');
        const nav = container.querySelector('nav');
        container.insertBefore(mobileToggle, nav);

        mobileToggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
        });
    }
}

// Initialize header component
document.addEventListener('DOMContentLoaded', () => {
    new HeaderComponent();
}); 