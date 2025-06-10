// Features Component
class FeaturesComponent {
    constructor() {
        this.features = [
            {
                title: 'Model evaluation',
                description: 'Evaluate model performance and build differentiated models that users love with accurate and speedy human evals',
                icon: '📊'
            },
            {
                title: 'Supervised fine-tuning',
                description: 'Refine model performance and fine-tune models for specifics tasks and domains with human-generated data streams',
                icon: '⚡'
            },
            {
                title: 'RLHF',
                description: 'Align AI behavior with human preferences through preference rankings and multimodal chat evaluations',
                icon: '🧠'
            },
            {
                title: 'Red teaming',
                description: 'Proactively identify and address vulnerabilities in AI systems before deployment for responsible model development',
                icon: '🛡️'
            }
        ];
        this.init();
    }

    init() {
        this.render();
        this.animateFeatures();
    }

    render() {
        const featuresHTML = `
            <div class="features">
                <div class="container">
                    <h2>Discover the Labelbox difference</h2>
                    <p class="features-subtitle">Achieve AI breakthroughs with the most innovative post-training alignment</p>
                    <h3 class="features-section-title">Accelerate critical generative AI tasks with Labelbox</h3>
                    
                    <div class="features-grid">
                        ${this.features.map((feature, index) => `
                            <div class="feature-item" data-index="${index}">
                                <div class="feature-icon">${feature.icon}</div>
                                <h3>${feature.title}</h3>
                                <p>${feature.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const featuresContainer = document.getElementById('features');
        featuresContainer.innerHTML = featuresHTML;
        
        this.addFeaturesStyles();
    }

    addFeaturesStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .features-subtitle {
                text-align: center;
                font-size: 1.125rem;
                color: var(--text-secondary);
                margin-bottom: 40px;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .features-section-title {
                text-align: center;
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 60px;
                color: var(--text-primary);
            }

            .feature-item {
                position: relative;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .feature-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);
                border-radius: 16px;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: -1;
            }

            .feature-item:hover::before {
                opacity: 1;
            }

            .feature-item:hover {
                transform: translateY(-5px);
            }

            .feature-item:hover .feature-icon {
                transform: scale(1.1) rotate(5deg);
            }

            @media (max-width: 768px) {
                .features-grid {
                    grid-template-columns: 1fr;
                    gap: 30px;
                }

                .features h2 {
                    font-size: 2rem;
                }

                .features-section-title {
                    font-size: 1.25rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animateFeatures() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate headings
                    const title = entry.target.querySelector('h2');
                    const subtitle = entry.target.querySelector('.features-subtitle');
                    const sectionTitle = entry.target.querySelector('.features-section-title');
                    
                    setTimeout(() => {
                        if (title) title.classList.add('animate-fadeInUp');
                    }, 200);

                    setTimeout(() => {
                        if (subtitle) subtitle.classList.add('animate-fadeInUp');
                    }, 400);

                    setTimeout(() => {
                        if (sectionTitle) sectionTitle.classList.add('animate-fadeInUp');
                    }, 600);

                    // Animate feature items
                    const featureItems = entry.target.querySelectorAll('.feature-item');
                    featureItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.classList.add('animate-fadeInUp');
                        }, 800 + (index * 150));
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
            // Initially hide feature items
            const featureItems = featuresSection.querySelectorAll('.feature-item');
            featureItems.forEach(item => {
                item.style.opacity = '0';
            });
            
            observer.observe(featuresSection);
        }
    }

    // Add click interactions
    addClickInteractions() {
        const featureItems = document.querySelectorAll('.feature-item');
        featureItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                featureItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Show more details (could be expanded to show modal or more content)
                console.log(`Feature ${index + 1} clicked:`, this.features[index]);
            });
        });
    }
}

// Initialize features component
document.addEventListener('DOMContentLoaded', () => {
    new FeaturesComponent();
}); 