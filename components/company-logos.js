// Company Logos Component
class CompanyLogosComponent {
    constructor() {
        this.companies = [
            { name: 'ElevenLabs', logo: '🎯' },
            { name: 'Google', logo: '🔍' },
            { name: 'Shutterstock', logo: '📷' },
            { name: 'Ideogram', logo: '💡' },
            { name: 'Stryker', logo: '🏥' },
            { name: 'Intuitive', logo: '🤖' },
            { name: 'Warner Bros', logo: '🎬' },
            { name: 'Peloton', logo: '🚴' },
            { name: 'Dialpad', logo: '📞' },
            { name: 'Pinterest', logo: '📌' },
            { name: 'Liberty Mutual', logo: '🛡️' },
            { name: 'Ancestry', logo: '🌳' },
            { name: 'Walmart', logo: '🛒' },
            { name: 'Genentech', logo: '🧬' },
            { name: 'P&G', logo: '🧴' },
            { name: 'Speak', logo: '💬' }
        ];
        this.init();
    }

    init() {
        this.render();
        this.animateLogos();
        this.setupInfiniteScroll();
    }

    render() {
        const logosHTML = `
            <div class="company-logos">
                <div class="container">
                    <h3>Trusted by companies of all sizes — from startups to Fortune 500s</h3>
                    <div class="logos-wrapper">
                        <div class="logos-track">
                            ${this.companies.map(company => `
                                <div class="logo-item" data-company="${company.name}">
                                    <div class="logo-image">
                                        <span class="logo-icon">${company.logo}</span>
                                    </div>
                                    <span class="logo-text">${company.name}</span>
                                </div>
                            `).join('')}
                            ${this.companies.map(company => `
                                <div class="logo-item" data-company="${company.name}">
                                    <div class="logo-image">
                                        <span class="logo-icon">${company.logo}</span>
                                    </div>
                                    <span class="logo-text">${company.name}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;

        const logoContainer = document.getElementById('company-logos');
        logoContainer.innerHTML = logosHTML;
        
        this.addLogosStyles();
    }

    addLogosStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .logos-wrapper {
                overflow: hidden;
                width: 100%;
                position: relative;
                mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
                -webkit-mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
            }

            .logos-track {
                display: flex;
                gap: 60px;
                animation: scroll-logos 30s linear infinite;
                width: fit-content;
            }

            .logo-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                min-width: 120px;
                transition: all 0.3s ease;
                cursor: pointer;
                padding: 20px;
                border-radius: 12px;
                background: transparent;
            }

            .logo-item:hover {
                background: var(--bg-secondary);
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            }

            .logo-image {
                width: 60px;
                height: 60px;
                background: white;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                border: 1px solid var(--border-color);
                transition: all 0.3s ease;
            }

            .logo-item:hover .logo-image {
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                transform: scale(1.05);
            }

            .logo-icon {
                font-size: 24px;
                filter: grayscale(1);
                transition: filter 0.3s ease;
            }

            .logo-item:hover .logo-icon {
                filter: grayscale(0);
            }

            .logo-text {
                font-size: 14px;
                font-weight: 500;
                color: var(--text-secondary);
                text-align: center;
                transition: color 0.3s ease;
            }

            .logo-item:hover .logo-text {
                color: var(--text-primary);
            }

            @keyframes scroll-logos {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }

            .logos-track:hover {
                animation-play-state: paused;
            }

            @media (max-width: 768px) {
                .logos-track {
                    gap: 40px;
                    animation-duration: 25s;
                }

                .logo-item {
                    min-width: 100px;
                    padding: 15px;
                }

                .logo-image {
                    width: 50px;
                    height: 50px;
                }

                .logo-icon {
                    font-size: 20px;
                }

                .logo-text {
                    font-size: 12px;
                }
            }

            @media (max-width: 480px) {
                .logos-track {
                    gap: 30px;
                    animation-duration: 20s;
                }

                .logo-item {
                    min-width: 80px;
                    padding: 10px;
                }

                .logo-image {
                    width: 40px;
                    height: 40px;
                }

                .logo-icon {
                    font-size: 18px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animateLogos() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate title first
                    const title = entry.target.querySelector('h3');
                    setTimeout(() => {
                        if (title) {
                            title.style.opacity = '1';
                            title.classList.add('animate-fadeInUp');
                        }
                    }, 200);

                    // Animate the entire logos wrapper
                    const logosWrapper = entry.target.querySelector('.logos-wrapper');
                    setTimeout(() => {
                        if (logosWrapper) {
                            logosWrapper.style.opacity = '1';
                            logosWrapper.classList.add('animate-fadeInUp');
                        }
                    }, 600);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const logosSection = document.querySelector('.company-logos');
        if (logosSection) {
            // Initially hide elements
            const title = logosSection.querySelector('h3');
            const logosWrapper = logosSection.querySelector('.logos-wrapper');
            
            if (title) title.style.opacity = '0';
            if (logosWrapper) logosWrapper.style.opacity = '0';
            
            observer.observe(logosSection);
        }
    }

    setupInfiniteScroll() {
        // Add interaction to pause/resume animation
        const logosTrack = document.querySelector('.logos-track');
        const logoItems = document.querySelectorAll('.logo-item');

        if (logosTrack) {
            // Pause on hover
            logosTrack.addEventListener('mouseenter', () => {
                logosTrack.style.animationPlayState = 'paused';
            });

            // Resume on leave
            logosTrack.addEventListener('mouseleave', () => {
                logosTrack.style.animationPlayState = 'running';
            });
        }

        // Add click events to logo items
        logoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const companyName = item.getAttribute('data-company');
                console.log(`${companyName} logo clicked`);
                
                // Add click effect
                item.style.transform = 'translateY(-5px) scale(0.95)';
                setTimeout(() => {
                    item.style.transform = 'translateY(-5px) scale(1)';
                }, 150);
            });
        });
    }

    // Add method to change scroll speed based on user preference
    setScrollSpeed(speed = 'normal') {
        const logosTrack = document.querySelector('.logos-track');
        if (logosTrack) {
            const speeds = {
                slow: '45s',
                normal: '30s',
                fast: '20s'
            };
            logosTrack.style.animationDuration = speeds[speed] || speeds.normal;
        }
    }

    // Add method to temporarily highlight a specific company
    highlightCompany(companyName) {
        const logoItems = document.querySelectorAll('.logo-item');
        logoItems.forEach(item => {
            if (item.getAttribute('data-company') === companyName) {
                item.style.background = 'var(--bg-secondary)';
                item.style.transform = 'translateY(-5px) scale(1.1)';
                item.style.boxShadow = '0 15px 35px rgba(99, 102, 241, 0.2)';
                
                setTimeout(() => {
                    item.style.background = 'transparent';
                    item.style.transform = 'translateY(0) scale(1)';
                    item.style.boxShadow = 'none';
                }, 2000);
            }
        });
    }
}

// Initialize company logos component
document.addEventListener('DOMContentLoaded', () => {
    const companyLogos = new CompanyLogosComponent();
    
    // Example: You can control the component like this
    // companyLogos.setScrollSpeed('slow');
    // companyLogos.highlightCompany('Google');
}); 