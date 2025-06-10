// Main Services Component
class MainServicesComponent {
    constructor() {
        this.services = [
            {
                title: 'Operate',
                subtitle: 'Access managed labeling services',
                description: 'Labelbox labeling services is your fully managed solution for high-quality data and human evaluations by our exclusive Alignerr network.',
                buttonText: 'Discover labeling services',
                link: '#operate',
                icon: '⚙️'
            },
            {
                title: 'Build',
                subtitle: 'Build your own data factory',
                description: 'The Labelbox platform is the industry\'s best model evaluation and data labeling software, purpose-built to deliver the highest quality data for AI and ML.',
                buttonText: 'Explore the platform',
                link: '#build',
                icon: '🏗️'
            },
            {
                title: 'Staff',
                subtitle: 'Hire proven AI trainers',
                description: 'Labelbox Alignerr Connect lets you discover and hire experienced AI trainers to integrate directly into your existing processes and with your AI teams.',
                buttonText: 'Build your AI team',
                link: '#staff',
                icon: '👥'
            }
        ];
        this.init();
    }

    init() {
        this.render();
        this.animateServices();
    }

    render() {
        const servicesHTML = `
            <div class="main-services" id="services">
                <div class="container">
                    <h2>Generate quality data at scale for any AI project</h2>
                    <p>AI teams depend on an AI data factory to generate unique training data and to evaluate their model's performance. Labelbox is the only vendor with a comprehensive set of data solutions to help you operate, build, or staff your AI data factory.</p>
                    
                    <div class="services-grid">
                        ${this.services.map((service, index) => `
                            <div class="service-card" data-index="${index}">
                                <div class="service-icon">${service.icon}</div>
                                <h3>${service.title}</h3>
                                <h4>${service.subtitle}</h4>
                                <p>${service.description}</p>
                                <a href="${service.link}" class="btn btn-primary">${service.buttonText} ></a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const servicesContainer = document.getElementById('main-services');
        servicesContainer.innerHTML = servicesHTML;
        
        this.addServiceStyles();
    }

    addServiceStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .service-icon {
                font-size: 48px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 80px;
                background: var(--bg-secondary);
                border-radius: 50%;
                margin: 0 auto 20px;
            }

            .service-card h4 {
                font-size: 1.25rem;
                font-weight: 600;
                margin-bottom: 15px;
                color: var(--text-primary);
            }

            .service-card {
                text-align: center;
                position: relative;
                overflow: hidden;
            }

            .service-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
                transition: left 0.5s ease;
            }

            .service-card:hover::before {
                left: 100%;
            }

            @media (max-width: 768px) {
                .service-icon {
                    font-size: 36px;
                    width: 60px;
                    height: 60px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animateServices() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate main heading and description
                    const title = entry.target.querySelector('h2');
                    const description = entry.target.querySelector('p');
                    
                    setTimeout(() => {
                        if (title) {
                            title.classList.add('animate-fadeInUp');
                        }
                    }, 200);

                    setTimeout(() => {
                        if (description) {
                            description.classList.add('animate-fadeInUp');
                        }
                    }, 400);

                    // Animate service cards
                    const serviceCards = entry.target.querySelectorAll('.service-card');
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.classList.add('animate-fadeInUp');
                        }, 600 + (index * 200));
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const servicesSection = document.querySelector('.main-services');
        if (servicesSection) {
            // Initially hide service cards
            const serviceCards = servicesSection.querySelectorAll('.service-card');
            serviceCards.forEach(card => {
                card.style.opacity = '0';
            });
            
            observer.observe(servicesSection);
        }
    }

    // Add interactive hover effects
    addInteractiveEffects() {
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize main services component
document.addEventListener('DOMContentLoaded', () => {
    new MainServicesComponent();
}); 