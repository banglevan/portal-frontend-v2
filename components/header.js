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
                            <li><a href="index.html">Home</a></li>
                            
                            <!-- Productions with Mega Menu -->
                            <li class="nav-item-dropdown">
                                <a href="productions.html" class="nav-link-dropdown">
                                    Productions
                                    <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="6,9 12,15 18,9"></polyline>
                                    </svg>
                                </a>
                                <div class="mega-menu productions-menu">
                                    <div class="mega-menu-container">
                                        <div class="mega-menu-categories">
                                            <h4>Product Categories</h4>
                                            <ul class="category-list">
                                                <li class="category-item" data-category="cameras">
                                                    Smart Cameras
                                                </li>
                                                <li class="category-item" data-category="aibox">
                                                    AI Box Solutions
                                                </li>
                                                <li class="category-item" data-category="analytics">
                                                    Data Analytics
                                                </li>
                                                <li class="category-item" data-category="accessories">
                                                    Accessories
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="mega-menu-products">
                                            <div class="products-container" id="productsContainer">
                                                <div class="default-content">
                                                    <h4>Select a category</h4>
                                                    <p>Hover over a category to see our products</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            
                            <!-- Gallery with Mega Menu -->
                            <li class="nav-item-dropdown">
                                <a href="gallery.html" class="nav-link-dropdown">
                                    Gallery
                                    <svg class="dropdown-arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="6,9 12,15 18,9"></polyline>
                                    </svg>
                                </a>
                                <div class="mega-menu gallery-menu">
                                    <div class="mega-menu-container">
                                        <div class="mega-menu-categories">
                                            <h4>Application Categories</h4>
                                            <ul class="category-list">
                                                <li class="category-item" data-category="assessment">
                                                    Assessment
                                                </li>
                                                <li class="category-item" data-category="engineering">
                                                    Engineering
                                                </li>
                                                <li class="category-item" data-category="math">
                                                    Math
                                                </li>
                                                <li class="category-item" data-category="science">
                                                    Science
                                                </li>
                                                <li class="category-item" data-category="language">
                                                    Language
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="mega-menu-products">
                                            <div class="products-container" id="appsContainer">
                                                <div class="default-content">
                                                    <h4>Select a category</h4>
                                                    <p>Hover over a category to see available applications</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            
                            <li><a href="applications-manager.html">Applications</a></li>
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

        // Initialize mega menu functionality
        this.initMegaMenu();

        // Handle navigation links
        const navLinks = this.headerElement.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Handle external page navigation
                if (href === 'gallery.html' || href === 'index.html' || href === 'applications-manager.html' || href === 'productions.html') {
                    // Let the browser handle the navigation naturally
                    return;
                }
                
                // Handle anchor links for smooth scrolling
                if (href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
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

    initMegaMenu() {
        // Initialize products and apps data
        this.initMegaMenuData();

        // Bind mega menu events
        const megaMenuItems = this.headerElement.querySelectorAll('.nav-item-dropdown');
        megaMenuItems.forEach(item => {
            const megaMenu = item.querySelector('.mega-menu');
            const categoryItems = item.querySelectorAll('.category-item');

            // Show/hide mega menu on hover
            item.addEventListener('mouseenter', () => {
                megaMenu.classList.add('show');
            });

            item.addEventListener('mouseleave', () => {
                megaMenu.classList.remove('show');
                // Reset to default content
                this.resetMegaMenuContent(item);
            });

            // Handle category hover
            categoryItems.forEach(categoryItem => {
                categoryItem.addEventListener('mouseenter', () => {
                    const category = categoryItem.dataset.category;
                    const isProductions = item.querySelector('.productions-menu') !== null;
                    this.showCategoryProducts(categoryItem, category, isProductions);
                });

                categoryItem.addEventListener('mouseleave', () => {
                    categoryItem.classList.remove('active');
                });
            });
        });
    }

    initMegaMenuData() {
        // Products data for Productions menu
        this.productsData = {
            cameras: [
                { name: 'SmartCam Pro X1', description: '4K AI-powered surveillance camera', price: '$1,299' },
                { name: 'SmartCam Indoor 360', description: '360° indoor monitoring solution', price: '$899' },
                { name: 'SmartCam Outdoor Pro', description: 'Weather-resistant outdoor camera', price: '$1,599' },
                { name: 'SmartCam Mini', description: 'Compact indoor security camera', price: '$399' }
            ],
            aibox: [
                { name: 'EdgeAI Box 5000', description: 'High-performance edge computing', price: '$2,999' },
                { name: 'EdgeAI Box Compact', description: 'Small-scale AI deployment', price: '$1,499' },
                { name: 'EdgeAI Box Enterprise', description: 'Enterprise-grade AI processing', price: '$4,999' },
                { name: 'EdgeAI Box Lite', description: 'Entry-level AI processing unit', price: '$799' }
            ],
            analytics: [
                { name: 'Analytics Suite Pro', description: 'Complete data analysis platform', price: '$499/mo' },
                { name: 'Analytics Dashboard Hub', description: 'Centralized monitoring solution', price: '$299/mo' },
                { name: 'Custom Analytics', description: 'Tailored analytics solutions', price: 'Custom' },
                { name: 'Real-time Dashboard', description: 'Live monitoring and alerts', price: '$199/mo' }
            ],
            accessories: [
                { name: 'Mounting Kit Pro', description: 'Professional camera mounting', price: '$149' },
                { name: 'Power Adapter Kit', description: 'PoE+ power solutions', price: '$89' },
                { name: 'Storage Module', description: 'Local data storage expansion', price: '$299' },
                { name: 'Network Switch', description: 'AI-optimized network switch', price: '$399' }
            ]
        };

        // Applications data for Gallery menu
        this.appsData = {
            assessment: [
                { name: 'TestGenius Pro', description: 'Advanced assessment platform', rating: '4.9' },
                { name: 'QuizBuilder AI', description: 'AI-powered quiz generation', rating: '4.8' },
                { name: 'GradeTracker Plus', description: 'Comprehensive grading system', rating: '4.7' },
                { name: 'Assessment Analytics', description: 'Data-driven assessment insights', rating: '4.6' }
            ],
            engineering: [
                { name: 'CAD Master Pro', description: 'Professional CAD software', rating: '4.9' },
                { name: 'Circuit Simulator', description: 'Electronic circuit design tool', rating: '4.8' },
                { name: '3D ModelBuilder', description: '3D modeling and simulation', rating: '4.7' },
                { name: 'Engineering Calculator', description: 'Advanced engineering calculations', rating: '4.5' }
            ],
            math: [
                { name: 'MathGenius Pro', description: 'Advanced mathematics platform', rating: '4.9' },
                { name: 'AlgebraVision', description: 'Interactive algebra learning', rating: '4.8' },
                { name: 'Statistics Studio', description: 'Statistical analysis tool', rating: '4.7' },
                { name: 'Geometry Explorer', description: 'Interactive geometry learning', rating: '4.6' }
            ],
            science: [
                { name: 'Lab Simulator Pro', description: 'Virtual laboratory experiments', rating: '4.9' },
                { name: 'Chemistry Builder', description: 'Molecular modeling software', rating: '4.8' },
                { name: 'Physics Playground', description: 'Interactive physics simulations', rating: '4.7' },
                { name: 'Biology Explorer', description: 'Interactive biology learning', rating: '4.6' }
            ],
            language: [
                { name: 'LanguageMaster AI', description: 'AI-powered language learning', rating: '4.9' },
                { name: 'Grammar Genius', description: 'Advanced grammar checker', rating: '4.8' },
                { name: 'Vocabulary Builder', description: 'Interactive vocabulary expansion', rating: '4.7' },
                { name: 'Pronunciation Trainer', description: 'Speech improvement tool', rating: '4.6' }
            ]
        };
    }

    showCategoryProducts(categoryItem, category, isProductions) {
        // Remove active class from siblings
        const siblings = categoryItem.parentElement.querySelectorAll('.category-item');
        siblings.forEach(sibling => sibling.classList.remove('active'));
        
        // Add active class to current item
        categoryItem.classList.add('active');

        // Get the products container
        const containerId = isProductions ? 'productsContainer' : 'appsContainer';
        const container = document.getElementById(containerId);
        
        if (!container) return;

        // Get data based on menu type
        const data = isProductions ? this.productsData[category] : this.appsData[category];
        
        if (!data) return;

        // Create products HTML
        const productsHTML = data.map(item => `
            <div class="mega-menu-item">
                <div class="item-content">
                    <h5>${item.name}</h5>
                    <p>${item.description}</p>
                    <div class="item-meta">
                        ${isProductions ? 
                            `<span class="price">${item.price}</span>` : 
                            `<span class="rating">⭐ ${item.rating}</span>`
                        }
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="category-products">
                <h4>${categoryItem.textContent.trim()}</h4>
                <div class="products-grid">
                    ${productsHTML}
                </div>
                <div class="view-all">
                    <a href="${isProductions ? 'productions.html' : 'gallery.html'}" class="btn btn-outline btn-sm">
                        View All ${isProductions ? 'Products' : 'Applications'}
                    </a>
                </div>
            </div>
        `;
    }

    resetMegaMenuContent(menuItem) {
        const isProductions = menuItem.querySelector('.productions-menu') !== null;
        const containerId = isProductions ? 'productsContainer' : 'appsContainer';
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = `
                <div class="default-content">
                    <h4>Select a category</h4>
                    <p>Hover over a category to see our ${isProductions ? 'products' : 'applications'}</p>
                </div>
            `;
        }

        // Remove active classes
        const categoryItems = menuItem.querySelectorAll('.category-item');
        categoryItems.forEach(item => item.classList.remove('active'));
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