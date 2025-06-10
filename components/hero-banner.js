// Hero Banner Component
class HeroBannerComponent {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.animateElements();
    }

    render() {
        const heroHTML = `
            <div class="hero">
                <div class="container">
                    <h1 class="hero-title">The data factory for AI teams</h1>
                    <p class="hero-subtitle">
                        Labelbox delivers innovative services and software to operate, build, or staff your modern AI data factory
                    </p>
                    <div class="hero-actions">
                        <a href="#" class="btn btn-primary">Take a tour</a>
                        <a href="#" class="btn btn-secondary">Start for free</a>
                    </div>
                    <div class="hero-visual">
                        <div class="floating-elements">
                            <div class="floating-card animate-float" style="animation-delay: 0s;">
                                <div class="card-icon">🤖</div>
                                <span>AI Models</span>
                            </div>
                            <div class="floating-card animate-float" style="animation-delay: 0.5s;">
                                <div class="card-icon">📊</div>
                                <span>Data Quality</span>
                            </div>
                            <div class="floating-card animate-float" style="animation-delay: 1s;">
                                <div class="card-icon">⚡</div>
                                <span>Fast Training</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const heroContainer = document.getElementById('hero-banner');
        heroContainer.innerHTML = heroHTML;
        
        // Add styles for floating elements
        this.addFloatingElementsStyles();
    }

    addFloatingElementsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .hero-visual {
                margin-top: 60px;
                position: relative;
                height: 200px;
            }

            .floating-elements {
                display: flex;
                justify-content: center;
                gap: 40px;
                flex-wrap: wrap;
                position: relative;
            }

            .floating-card {
                background: rgba(255, 255, 255, 0.9);
                backdrop-filter: blur(10px);
                padding: 20px 30px;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                gap: 12px;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .floating-card:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
            }

            .card-icon {
                font-size: 24px;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--gradient-primary);
                border-radius: 8px;
            }

            .floating-card span {
                font-weight: 600;
                color: var(--text-primary);
                white-space: nowrap;
            }

            @media (max-width: 768px) {
                .floating-elements {
                    gap: 20px;
                }
                
                .floating-card {
                    padding: 15px 20px;
                    font-size: 14px;
                }
                
                .card-icon {
                    font-size: 20px;
                    width: 32px;
                    height: 32px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animateElements() {
        // Use Intersection Observer for animation triggers
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimations();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const heroElement = document.querySelector('.hero');
        if (heroElement) {
            observer.observe(heroElement);
        }
    }

    triggerAnimations() {
        const title = document.querySelector('.hero-title');
        const subtitle = document.querySelector('.hero-subtitle');
        const actions = document.querySelector('.hero-actions');

        // Animate elements with staggered timing
        setTimeout(() => {
            if (title) {
                title.style.opacity = '1';
                title.classList.add('animate-fadeInUp');
            }
        }, 200);

        setTimeout(() => {
            if (subtitle) {
                subtitle.style.opacity = '1';
                subtitle.classList.add('animate-fadeInUp');
            }
        }, 400);

        setTimeout(() => {
            if (actions) {
                actions.style.opacity = '1';
                actions.classList.add('animate-fadeInUp');
            }
        }, 600);

        // Animate floating cards
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.classList.add('animate-fadeInUp');
            }, 800 + (index * 200));
        });
    }

    // Add parallax effect on scroll
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const speed = scrolled * 0.5;
                hero.style.transform = `translateY(${speed}px)`;
            }
        });
    }
}

// Initialize hero banner component
document.addEventListener('DOMContentLoaded', () => {
    new HeroBannerComponent();
}); 