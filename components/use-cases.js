// Use Cases Component
class UseCasesComponent {
    constructor() {
        this.useCases = [
            {
                title: 'Complex reasoning',
                description: 'Advanced problem-solving capabilities for sophisticated AI applications',
                icon: '🧩'
            },
            {
                title: 'Multimodal reasoning',
                description: 'Cross-modal understanding for text, image, and audio processing',
                icon: '🔄'
            },
            {
                title: 'Image tasks',
                description: 'Computer vision and image processing for various applications',
                icon: '🖼️'
            },
            {
                title: 'Audio tasks',
                description: 'Speech recognition, audio analysis, and sound processing',
                icon: '🎵'
            },
            {
                title: 'Coding tasks',
                description: 'Code generation, debugging, and programming assistance',
                icon: '💻'
            },
            {
                title: 'Multilingual',
                description: 'Support for multiple languages and cross-lingual tasks',
                icon: '🌍'
            },
            {
                title: 'Object detection',
                description: 'Identify and locate objects within images and videos',
                icon: '🎯'
            }
        ];
        this.init();
    }

    init() {
        this.render();
        this.animateUseCases();
    }

    render() {
        const useCasesHTML = `
            <div class="use-cases">
                <div class="container">
                    <h2>Train your models on our proven GenAI use cases</h2>
                    
                    <div class="use-cases-grid">
                        ${this.useCases.map((useCase, index) => `
                            <div class="use-case-item" data-index="${index}">
                                <div class="use-case-icon">${useCase.icon}</div>
                                <h3>${useCase.title}</h3>
                                <p>${useCase.description}</p>
                                <a href="#" class="learn-more">Learn more →</a>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="use-cases-footer">
                        <a href="#" class="btn btn-outline">See all use cases</a>
                        <p class="footer-note">Interested in task-specific labeling? Explore Computer Vision and Natural Language Processing (NLP).</p>
                    </div>
                </div>
            </div>
        `;

        const useCasesContainer = document.getElementById('use-cases');
        useCasesContainer.innerHTML = useCasesHTML;
        
        this.addUseCasesStyles();
    }

    addUseCasesStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .use-case-icon {
                font-size: 40px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 70px;
                height: 70px;
                background: var(--gradient-primary);
                border-radius: 50%;
                margin: 0 auto 20px;
                transition: all 0.3s ease;
            }

            .use-case-item:hover .use-case-icon {
                transform: scale(1.1) rotate(10deg);
                box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
            }

            .learn-more {
                color: var(--primary-color);
                text-decoration: none;
                font-weight: 500;
                font-size: 14px;
                transition: all 0.3s ease;
                display: inline-flex;
                align-items: center;
                gap: 5px;
                margin-top: 15px;
            }

            .learn-more:hover {
                transform: translateX(5px);
                color: var(--accent-color);
            }

            .use-cases-footer {
                text-align: center;
                margin-top: 60px;
            }

            .footer-note {
                margin-top: 30px;
                color: var(--text-secondary);
                font-size: 14px;
                max-width: 600px;
                margin-left: auto;
                margin-right: auto;
            }

            .use-case-item {
                position: relative;
                overflow: hidden;
            }

            .use-case-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(45deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05));
                opacity: 0;
                transition: opacity 0.3s ease;
                border-radius: 12px;
                z-index: -1;
            }

            .use-case-item:hover::before {
                opacity: 1;
            }

            @media (max-width: 768px) {
                .use-cases-grid {
                    grid-template-columns: 1fr;
                    gap: 25px;
                }

                .use-case-icon {
                    font-size: 32px;
                    width: 60px;
                    height: 60px;
                }

                .use-cases h2 {
                    font-size: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animateUseCases() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate heading
                    const title = entry.target.querySelector('h2');
                    setTimeout(() => {
                        if (title) title.classList.add('animate-fadeInUp');
                    }, 200);

                    // Animate use case items
                    const useCaseItems = entry.target.querySelectorAll('.use-case-item');
                    useCaseItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.classList.add('animate-fadeInUp');
                        }, 400 + (index * 100));
                    });

                    // Animate footer
                    const footer = entry.target.querySelector('.use-cases-footer');
                    setTimeout(() => {
                        if (footer) {
                            footer.style.opacity = '1';
                            footer.classList.add('animate-fadeInUp');
                        }
                    }, 800 + (useCaseItems.length * 100));

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const useCasesSection = document.querySelector('.use-cases');
        if (useCasesSection) {
            // Initially hide elements
            const useCaseItems = useCasesSection.querySelectorAll('.use-case-item');
            const footer = useCasesSection.querySelector('.use-cases-footer');
            
            useCaseItems.forEach(item => {
                item.style.opacity = '0';
            });
            
            if (footer) footer.style.opacity = '0';
            
            observer.observe(useCasesSection);
        }
    }

    // Add interactive grid rearrangement
    addInteractiveEffects() {
        const useCaseItems = document.querySelectorAll('.use-case-item');
        
        useCaseItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Add subtle scale and shadow effects
                item.style.transform = 'translateY(-5px) scale(1.02)';
                item.style.zIndex = '10';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                item.style.zIndex = '1';
            });

            // Add click effect
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(99, 102, 241, 0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = item.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                
                item.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
}

// Initialize use cases component
document.addEventListener('DOMContentLoaded', () => {
    new UseCasesComponent();
}); 