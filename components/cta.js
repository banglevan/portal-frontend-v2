// CTA Component
class CTAComponent {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.animateCTA();
        this.bindEvents();
    }

    render() {
        const ctaHTML = `
            <div class="cta">
                <div class="container">
                    <h2>Want to learn more?</h2>
                    <p>Let's explore how Labelbox can support your product recommendation needs.</p>
                    <div class="cta-actions">
                        <a href="#" class="btn">Contact us</a>
                        <a href="#" class="btn btn-outline-white">Schedule a demo</a>
                    </div>
                    
                    <div class="announcements">
                        <div class="announcement-badge">
                            <span class="badge-text">New</span>
                            <span class="announcement-content">
                                Discover how top models perform with Labelbox Leaderboards
                            </span>
                            <a href="#" class="announcement-link">Explore Labelbox leaderboards →</a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const ctaContainer = document.getElementById('cta');
        ctaContainer.innerHTML = ctaHTML;
        
        this.addCTAStyles();
    }

    addCTAStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cta-actions {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-bottom: 60px;
                flex-wrap: wrap;
            }

            .btn-outline-white {
                background: transparent;
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.5);
            }

            .btn-outline-white:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: white;
            }

            .announcements {
                text-align: center;
            }

            .announcement-badge {
                display: inline-flex;
                align-items: center;
                gap: 15px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                padding: 15px 25px;
                border-radius: 50px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
            }

            .announcement-badge:hover {
                background: rgba(255, 255, 255, 0.15);
                transform: translateY(-2px);
            }

            .badge-text {
                background: var(--accent-color);
                color: white;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
            }

            .announcement-content {
                color: white;
                font-weight: 500;
            }

            .announcement-link {
                color: white;
                text-decoration: none;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .announcement-link:hover {
                color: var(--accent-color);
                transform: translateX(5px);
            }
        `;
        document.head.appendChild(style);
    }

    animateCTA() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const elements = entry.target.querySelectorAll('h2, p, .cta-actions, .announcements');
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.classList.add('animate-fadeInUp');
                        }, 200 + (index * 200));
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const ctaSection = document.querySelector('.cta');
        if (ctaSection) {
            const elements = ctaSection.querySelectorAll('.cta-actions, .announcements');
            elements.forEach(el => {
                el.style.opacity = '0';
            });
            observer.observe(ctaSection);
        }
    }

    bindEvents() {
        const buttons = document.querySelectorAll('.cta .btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('CTA button clicked:', button.textContent);
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CTAComponent();
}); 