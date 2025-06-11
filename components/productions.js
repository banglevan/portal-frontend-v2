// Productions Component
class ProductionsComponent {
    constructor() {
        this.animationObserver = null;
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.bindEvents();
        this.initInteractiveElements();
    }

    setupScrollAnimations() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.category-card, .showcase-item, .stat-item');
        animatedElements.forEach(el => {
            this.animationObserver.observe(el);
        });
    }

    bindEvents() {
        // Category card interactions
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
            card.addEventListener('click', this.handleCardClick.bind(this));
        });

        // Showcase item interactions
        const showcaseItems = document.querySelectorAll('.showcase-item');
        showcaseItems.forEach(item => {
            item.addEventListener('click', this.handleShowcaseClick.bind(this));
        });

        // CTA button interactions
        const ctaButtons = document.querySelectorAll('.cta-actions .btn');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', this.handleCTAClick.bind(this));
        });

        // Learn more buttons
        const learnMoreButtons = document.querySelectorAll('.category-card .btn');
        learnMoreButtons.forEach(btn => {
            btn.addEventListener('click', this.handleLearnMoreClick.bind(this));
        });
    }

    handleCardHover(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.category-icon');
        
        // Add hover animation
        card.style.transform = 'translateY(-10px) scale(1.02)';
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }

        // Add subtle shadow animation
        card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2)';
    }

    handleCardLeave(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.category-icon');
        
        // Reset animations
        card.style.transform = '';
        if (icon) {
            icon.style.transform = '';
        }
        card.style.boxShadow = '';
    }

    handleCardClick(e) {
        const card = e.currentTarget;
        const category = card.dataset.category;
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        console.log(`Clicked on category: ${category}`);
        
        // Track analytics
        this.trackEvent('Category', 'Click', category);
    }

    handleShowcaseClick(e) {
        const item = e.currentTarget;
        const productName = item.querySelector('h3').textContent;
        
        // Create and show product modal
        this.showProductModal(item);
        
        console.log(`Clicked on product: ${productName}`);
        this.trackEvent('Product', 'Click', productName);
    }

    handleCTAClick(e) {
        const button = e.currentTarget;
        const buttonText = button.textContent.trim();
        
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        console.log(`CTA clicked: ${buttonText}`);
        this.trackEvent('CTA', 'Click', buttonText);
    }

    handleLearnMoreClick(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const card = button.closest('.category-card');
        const category = card.dataset.category;
        
        // Show category details modal
        this.showCategoryModal(category);
        
        this.trackEvent('LearnMore', 'Click', category);
    }

    showProductModal(productElement) {
        const productName = productElement.querySelector('h3').textContent;
        const productDesc = productElement.querySelector('p').textContent;
        const specs = Array.from(productElement.querySelectorAll('.spec')).map(spec => spec.textContent);

        const modal = document.createElement('div');
        modal.className = 'product-modal-overlay';
        modal.innerHTML = `
            <div class="product-modal">
                <div class="modal-header">
                    <h2>${productName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="modal-image">
                        ${productElement.querySelector('.product-placeholder').outerHTML}
                    </div>
                    <div class="modal-details">
                        <p>${productDesc}</p>
                        <div class="modal-specs">
                            <h4>Key Features:</h4>
                            <ul>
                                ${specs.map(spec => `<li>${spec}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-actions">
                            <button class="btn btn-primary">Request Quote</button>
                            <button class="btn btn-outline">Download Specs</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(modal);

        // Bind close events
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    showCategoryModal(category) {
        const categoryData = this.getCategoryData(category);
        
        const modal = document.createElement('div');
        modal.className = 'category-modal-overlay';
        modal.innerHTML = `
            <div class="category-modal">
                <div class="modal-header">
                    <h2>${categoryData.title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="category-overview">
                        <p>${categoryData.description}</p>
                    </div>
                    <div class="category-features">
                        <h4>Key Benefits:</h4>
                        <ul>
                            ${categoryData.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="category-products">
                        <h4>Available Products:</h4>
                        <div class="product-list">
                            ${categoryData.products.map(product => `
                                <div class="product-item">
                                    <strong>${product.name}</strong>
                                    <span>${product.description}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Contact Sales</button>
                        <button class="btn btn-outline">View All Products</button>
                    </div>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(modal);

        // Bind close events
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        document.body.style.overflow = 'hidden';
    }

    getCategoryData(category) {
        const categories = {
            cameras: {
                title: 'Smart Camera Devices',
                description: 'Our smart camera solutions combine advanced AI processing with high-quality imaging to deliver comprehensive surveillance and analytics capabilities.',
                benefits: [
                    'Real-time object detection and classification',
                    'Advanced facial recognition technology',
                    'Behavioral analytics and anomaly detection',
                    'Weather-resistant design for outdoor use',
                    'Low-light and night vision capabilities'
                ],
                products: [
                    { name: 'SmartCam Pro X1', description: 'Premium 4K camera with advanced AI' },
                    { name: 'SmartCam Indoor 360', description: 'Indoor panoramic surveillance camera' },
                    { name: 'SmartCam Outdoor Pro', description: 'Weatherproof outdoor security camera' }
                ]
            },
            aibox: {
                title: 'AI Box Solutions',
                description: 'Powerful edge computing devices that bring AI processing capabilities directly to your location, reducing latency and improving performance.',
                benefits: [
                    'High-performance GPU acceleration',
                    'Support for multiple camera inputs',
                    'Real-time AI processing at the edge',
                    'Flexible deployment options',
                    'Scalable architecture for growth'
                ],
                products: [
                    { name: 'EdgeAI Box 5000', description: 'High-performance edge computing unit' },
                    { name: 'EdgeAI Box Compact', description: 'Compact solution for small deployments' },
                    { name: 'EdgeAI Box Enterprise', description: 'Enterprise-grade AI processing unit' }
                ]
            },
            analytics: {
                title: 'Data Analysis Services',
                description: 'Comprehensive analytics platform that transforms raw data into actionable insights for informed decision-making.',
                benefits: [
                    'Real-time data processing and analysis',
                    'Custom dashboard creation',
                    'Predictive modeling and forecasting',
                    'Advanced data visualization',
                    'API integration capabilities'
                ],
                products: [
                    { name: 'Analytics Suite Pro', description: 'Complete analytics platform' },
                    { name: 'Custom Analytics', description: 'Tailored analytics solutions' },
                    { name: 'Real-time Dashboard', description: 'Live data monitoring and alerts' }
                ]
            }
        };

        return categories[category] || categories.cameras;
    }

    closeModal(modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
            document.body.style.overflow = '';
        }, 300);
    }

    initInteractiveElements() {
        // Add smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Add parallax effect to hero section
        this.initParallaxEffect();

        // Add counter animation for stats
        this.animateCounters();
    }

    initParallaxEffect() {
        const hero = document.querySelector('.productions-hero');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const suffix = counter.textContent.replace(/[\d]/g, '');
                counter.textContent = Math.floor(current) + suffix;
            }, 20);
        };

        // Start animation when counters come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    }

    trackEvent(category, action, label) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }
        console.log(`Analytics: ${category} - ${action} - ${label}`);
    }
}

// Initialize Productions component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProductionsComponent();
}); 