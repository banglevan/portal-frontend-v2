// Footer Component
class FooterComponent {
    constructor() {
        this.footerData = {
            company: {
                name: 'Labelbox',
                tagline: 'We enable breakthroughs',
                description: 'The data factory for AI teams'
            },
            sections: [
                {
                    title: 'Platform',
                    links: [
                        { text: 'Data Labeling', href: '#labeling' },
                        { text: 'Model Evaluation', href: '#evaluation' },
                        { text: 'Data Management', href: '#management' },
                        { text: 'Integrations', href: '#integrations' }
                    ]
                },
                {
                    title: 'Services',
                    links: [
                        { text: 'Labeling Services', href: '#services' },
                        { text: 'Consulting', href: '#consulting' },
                        { text: 'Support', href: '#support' },
                        { text: 'Training', href: '#training' }
                    ]
                },
                {
                    title: 'Resources',
                    links: [
                        { text: 'Documentation', href: '#docs' },
                        { text: 'Blog', href: '#blog' },
                        { text: 'Case Studies', href: '#cases' },
                        { text: 'Community', href: '#community' }
                    ]
                },
                {
                    title: 'Company',
                    links: [
                        { text: 'About Us', href: '#about' },
                        { text: 'Careers', href: '#careers' },
                        { text: 'Press', href: '#press' },
                        { text: 'Contact', href: '#contact' }
                    ]
                }
            ],
            legal: [
                { text: 'Terms of Service', href: '#terms' },
                { text: 'Privacy Notice', href: '#privacy' },
                { text: 'Copyright Dispute Policy', href: '#copyright' }
            ]
        };
        this.init();
    }

    init() {
        this.render();
        this.animateFooter();
        this.bindEvents();
    }

    render() {
        const footerHTML = `
            <div class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section footer-brand">
                            <div class="footer-logo">
                                <div class="logo-icon">L</div>
                                <span class="logo-text">${this.footerData.company.name}</span>
                            </div>
                            <p class="footer-tagline">${this.footerData.company.tagline}</p>
                            <p class="footer-description">${this.footerData.company.description}</p>
                            
                            <div class="social-links">
                                <a href="#" class="social-link" title="LinkedIn">💼</a>
                                <a href="#" class="social-link" title="Twitter">🐦</a>
                                <a href="#" class="social-link" title="GitHub">💻</a>
                                <a href="#" class="social-link" title="YouTube">📺</a>
                            </div>
                        </div>
                        
                        ${this.footerData.sections.map(section => `
                            <div class="footer-section">
                                <h3>${section.title}</h3>
                                <ul>
                                    ${section.links.map(link => `
                                        <li><a href="${link.href}">${link.text}</a></li>
                                    `).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="footer-bottom">
                        <div class="footer-legal">
                            <span>© ${new Date().getFullYear()} ${this.footerData.company.name}, Inc</span>
                            <div class="legal-links">
                                ${this.footerData.legal.map(link => `
                                    <a href="${link.href}">${link.text}</a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const footerContainer = document.getElementById('footer');
        footerContainer.innerHTML = footerHTML;
        
        this.addFooterStyles();
    }

    addFooterStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .footer-brand {
                max-width: 300px;
            }

            .footer-logo {
                display: flex;
                align-items: center;
                margin-bottom: 20px;
            }

            .footer-logo .logo-icon {
                width: 32px;
                height: 32px;
                background: var(--gradient-primary);
                border-radius: 6px;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 18px;
            }

            .footer-logo .logo-text {
                font-size: 20px;
                font-weight: 700;
                color: white;
            }

            .footer-tagline {
                color: rgba(255, 255, 255, 0.9);
                font-weight: 600;
                margin-bottom: 10px;
                font-size: 14px;
            }

            .footer-description {
                color: rgba(255, 255, 255, 0.7);
                margin-bottom: 30px;
                line-height: 1.6;
            }

            .social-links {
                display: flex;
                gap: 15px;
            }

            .social-link {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                text-decoration: none;
                font-size: 16px;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .social-link:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }

            .footer-legal {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }

            .legal-links {
                display: flex;
                gap: 20px;
                flex-wrap: wrap;
            }

            .legal-links a {
                color: rgba(255, 255, 255, 0.7);
                text-decoration: none;
                font-size: 14px;
                transition: color 0.3s ease;
            }

            .legal-links a:hover {
                color: white;
            }

            @media (max-width: 768px) {
                .footer-content {
                    grid-template-columns: 1fr;
                    gap: 30px;
                    text-align: center;
                }

                .footer-brand {
                    max-width: none;
                }

                .footer-legal {
                    flex-direction: column;
                    text-align: center;
                    gap: 15px;
                }

                .legal-links {
                    justify-content: center;
                }

                .social-links {
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    animateFooter() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate footer sections
                    const footerSections = entry.target.querySelectorAll('.footer-section');
                    footerSections.forEach((section, index) => {
                        setTimeout(() => {
                            section.style.opacity = '1';
                            section.classList.add('animate-fadeInUp');
                        }, 200 + (index * 150));
                    });

                    // Animate footer bottom
                    const footerBottom = entry.target.querySelector('.footer-bottom');
                    setTimeout(() => {
                        if (footerBottom) {
                            footerBottom.style.opacity = '1';
                            footerBottom.classList.add('animate-fadeInUp');
                        }
                    }, 600 + (footerSections.length * 150));

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const footerSection = document.querySelector('.footer');
        if (footerSection) {
            // Initially hide elements
            const footerSections = footerSection.querySelectorAll('.footer-section');
            const footerBottom = footerSection.querySelector('.footer-bottom');
            
            footerSections.forEach(section => {
                section.style.opacity = '0';
            });
            
            if (footerBottom) footerBottom.style.opacity = '0';
            
            observer.observe(footerSection);
        }
    }

    bindEvents() {
        // Add hover effects to footer links
        const footerLinks = document.querySelectorAll('.footer a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Footer link clicked:', link.textContent);
                
                // Add click effect
                link.style.transform = 'translateX(3px)';
                setTimeout(() => {
                    link.style.transform = 'translateX(0)';
                }, 150);
            });
        });

        // Add special effects to social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-2px) rotate(5deg)';
            });

            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) rotate(0deg)';
            });
        });

        // Add scroll-to-top functionality
        this.addScrollToTop();
    }

    addScrollToTop() {
        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.innerHTML = '↑';
        scrollToTopButton.className = 'scroll-to-top';
        scrollToTopButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            color: white;
            border: none;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        `;

        document.body.appendChild(scrollToTopButton);

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopButton.style.opacity = '1';
                scrollToTopButton.style.visibility = 'visible';
            } else {
                scrollToTopButton.style.opacity = '0';
                scrollToTopButton.style.visibility = 'hidden';
            }
        });

        // Smooth scroll to top
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add hover effect
        scrollToTopButton.addEventListener('mouseenter', () => {
            scrollToTopButton.style.transform = 'translateY(-3px) scale(1.1)';
        });

        scrollToTopButton.addEventListener('mouseleave', () => {
            scrollToTopButton.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Initialize footer component
document.addEventListener('DOMContentLoaded', () => {
    new FooterComponent();
}); 