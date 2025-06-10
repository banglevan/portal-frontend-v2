// Testimonials Component
class TestimonialsComponent {
    constructor() {
        this.testimonials = [
            {
                quote: "Our document intelligence teams are seeing a 2X increase in data quality.",
                company: "Fortune 500 Company",
                logo: "📊"
            },
            {
                quote: "Model accuracy improved 35% after using Labelbox, a 2x increase in model development.",
                company: "AI Startup",
                logo: "🚀"
            },
            {
                quote: "We now spend 2-3x less for quality data due to reduction in wasted spend.",
                company: "Tech Enterprise",
                logo: "💡"
            }
        ];
        this.init();
    }

    init() {
        this.render();
        this.animateTestimonials();
    }

    render() {
        const testimonialsHTML = `
            <div class="testimonials">
                <div class="container">
                    <h2>Why thought leaders choose Labelbox</h2>
                    
                    <div class="testimonials-grid">
                        ${this.testimonials.map((testimonial, index) => `
                            <div class="testimonial-card" data-index="${index}">
                                <div class="testimonial-icon">${testimonial.logo}</div>
                                <blockquote class="testimonial-quote">
                                    "${testimonial.quote}"
                                </blockquote>
                                <cite class="testimonial-source">— ${testimonial.company}</cite>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        const testimonialsContainer = document.getElementById('testimonials');
        testimonialsContainer.innerHTML = testimonialsHTML;
        
        this.addTestimonialsStyles();
    }

    addTestimonialsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .testimonial-icon {
                font-size: 48px;
                margin-bottom: 30px;
                text-align: center;
                opacity: 0.8;
            }

            .testimonial-quote {
                font-size: 1.25rem;
                line-height: 1.7;
                margin-bottom: 25px;
                font-style: italic;
                color: white;
                font-weight: 400;
                position: relative;
            }

            .testimonial-quote::before {
                content: '"';
                font-size: 4rem;
                position: absolute;
                top: -20px;
                left: -20px;
                color: rgba(255, 255, 255, 0.2);
                font-family: serif;
                line-height: 1;
            }

            .testimonial-source {
                font-style: normal;
                color: rgba(255, 255, 255, 0.8);
                font-weight: 500;
                font-size: 0.95rem;
            }

            .testimonial-card {
                text-align: center;
                position: relative;
                transition: all 0.3s ease;
            }

            .testimonial-card:hover {
                transform: translateY(-10px) scale(1.02);
                background: rgba(255, 255, 255, 0.15);
            }

            .testimonial-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
                border-radius: 16px;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: -1;
            }

            .testimonial-card:hover::before {
                opacity: 1;
            }

            /* Highlight important numbers */
            .testimonial-quote strong,
            .testimonial-quote b {
                color: #f59e0b;
                font-weight: 700;
            }

            @media (max-width: 768px) {
                .testimonials-grid {
                    grid-template-columns: 1fr;
                    gap: 30px;
                }

                .testimonial-quote {
                    font-size: 1.125rem;
                }

                .testimonial-icon {
                    font-size: 36px;
                }

                .testimonials h2 {
                    font-size: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add highlighting to numbers in quotes
        this.highlightNumbers();
    }

    highlightNumbers() {
        const quotes = document.querySelectorAll('.testimonial-quote');
        quotes.forEach(quote => {
            // Highlight percentages and multipliers
            quote.innerHTML = quote.innerHTML
                .replace(/(\d+%)/g, '<strong>$1</strong>')
                .replace(/(\d+[Xx])/g, '<strong>$1</strong>')
                .replace(/(2X|3x|35%|2-3x)/g, '<strong>$1</strong>');
        });
    }

    animateTestimonials() {
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

                    // Animate testimonial cards
                    const testimonialCards = entry.target.querySelectorAll('.testimonial-card');
                    testimonialCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.classList.add('animate-fadeInUp');
                        }, 400 + (index * 200));
                    });

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const testimonialsSection = document.querySelector('.testimonials');
        if (testimonialsSection) {
            // Initially hide testimonial cards
            const testimonialCards = testimonialsSection.querySelectorAll('.testimonial-card');
            testimonialCards.forEach(card => {
                card.style.opacity = '0';
            });
            
            observer.observe(testimonialsSection);
        }
    }

    // Add auto-rotation of testimonials
    addAutoRotation() {
        const cards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;

        setInterval(() => {
            // Remove highlight from current card
            cards[currentIndex].classList.remove('highlight');
            
            // Move to next card
            currentIndex = (currentIndex + 1) % cards.length;
            
            // Highlight new card
            cards[currentIndex].classList.add('highlight');
        }, 4000);

        // Add CSS for highlight effect
        const highlightStyle = document.createElement('style');
        highlightStyle.textContent = `
            .testimonial-card.highlight {
                transform: translateY(-15px) scale(1.05);
                background: rgba(255, 255, 255, 0.2);
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            }
        `;
        document.head.appendChild(highlightStyle);
    }

    // Add parallax effect
    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const testimonialsSection = document.querySelector('.testimonials');
            
            if (testimonialsSection) {
                const rect = testimonialsSection.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const cards = testimonialsSection.querySelectorAll('.testimonial-card');
                    cards.forEach((card, index) => {
                        const speed = 0.5 + (index * 0.1);
                        const yPos = -(scrolled - testimonialsSection.offsetTop) * speed;
                        card.style.transform = `translateY(${yPos}px)`;
                    });
                }
            }
        });
    }
}

// Initialize testimonials component
document.addEventListener('DOMContentLoaded', () => {
    new TestimonialsComponent();
}); 