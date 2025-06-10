# 🚀 Labelbox Homepage Recreation

A modern, responsive recreation of the Labelbox homepage built with vanilla HTML, CSS, and JavaScript. This project features component-based architecture, smooth animations, and professional design patterns.

![Labelbox Homepage](https://img.shields.io/badge/Status-Complete-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎨 **Modern Design**
- Clean, professional layout matching Labelbox's brand
- Modern gradient backgrounds and glassmorphism effects
- Custom color scheme with CSS variables
- Responsive design for all screen sizes

### 🚀 **Advanced Animations**
- Smooth scroll-triggered animations using Intersection Observer
- Floating elements with CSS keyframe animations
- Parallax effects on scroll
- Custom cursor effects
- Loading animations and page transitions
- Auto-scrolling company logos marquee

### 📱 **Interactive Components**
- Fixed navigation with scroll effects
- Animated hero section with floating cards
- Interactive service cards with hover effects
- Testimonials with highlighted metrics
- Click-to-action with modal demonstrations
- Scroll-to-top functionality

### ⚡ **Performance Optimized**
- Component-based modular architecture
- Lazy loading setup for images
- Efficient scroll handlers with `requestAnimationFrame`
- Performance optimizations for low-end devices
- Service worker ready for caching

## 📁 Project Structure

```
labelbox-homepage/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # Main stylesheet with animations
├── components/             # JavaScript components
│   ├── header.js          # Navigation component
│   ├── hero-banner.js     # Hero section with animations
│   ├── company-logos.js   # Auto-scrolling logos
│   ├── main-services.js   # Service areas (Operate, Build, Staff)
│   ├── features.js        # AI capabilities showcase
│   ├── use-cases.js       # GenAI use cases grid
│   ├── testimonials.js    # Customer testimonials
│   ├── cta.js            # Call-to-action section
│   └── footer.js         # Footer with links
├── js/
│   └── app.js            # Main app coordinator
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - runs directly in browser

### Installation

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **That's it!** No compilation or build process needed

```bash
# If using a local server (recommended)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🧩 Components Overview

### 🔝 **Header Component** (`components/header.js`)
- Fixed navigation bar with scroll effects
- Responsive mobile menu
- Smooth scroll to sections
- Brand logo with gradient

### 🎯 **Hero Banner** (`components/hero-banner.js`)
- Animated title with gradient text
- Floating interactive cards
- Call-to-action buttons
- Background grid pattern

### 🏢 **Company Logos** (`components/company-logos.js`)
- Auto-scrolling horizontal marquee
- 16+ mock company logos
- Pause on hover functionality
- Responsive design

### ⚙️ **Main Services** (`components/main-services.js`)
- Three service areas: Operate, Build, Staff
- Interactive service cards
- Hover animations and effects
- Service-specific CTAs

### 🧠 **Features** (`components/features.js`)
- AI capabilities showcase
- Model evaluation, RLHF, Red teaming
- Grid layout with hover effects
- Icon-based feature representation

### 📋 **Use Cases** (`components/use-cases.js`)
- GenAI use cases grid
- Interactive cards with ripple effects
- "Learn more" links
- Responsive grid layout

### 💬 **Testimonials** (`components/testimonials.js`)
- Customer success stories
- Highlighted metrics (2X, 35%, etc.)
- Glass morphism card design
- Dark background section

### 📞 **Call-to-Action** (`components/cta.js`)
- Contact form integration
- Demo scheduling
- Announcement badges
- Gradient background

### 🔗 **Footer** (`components/footer.js`)
- Comprehensive site navigation
- Social media links
- Legal links and copyright
- Multi-column responsive layout

## 🎨 Customization

### Colors
Edit CSS variables in `styles/main.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #0f172a;
    --accent-color: #f59e0b;
    --text-primary: #0f172a;
    --text-secondary: #64748b;
}
```

### Animations
Modify animation durations and effects:

```css
/* Animation speed */
@keyframes fadeInUp {
    /* ... */
}

/* Company logos scroll speed */
.logos-track {
    animation: scroll-logos 30s linear infinite;
}
```

### Content
Update component data in respective JavaScript files:

```javascript
// In company-logos.js
this.companies = [
    { name: 'Your Company', logo: '🎯' },
    // Add more companies...
];

// In testimonials.js
this.testimonials = [
    {
        quote: "Your testimonial here",
        company: "Your Company",
        logo: "📊"
    }
];
```

## 🔧 Advanced Configuration

### Component Control
The main app provides global component control:

```javascript
// Access components
const app = new App();

// Control logo scroll speed
const companyLogos = new CompanyLogosComponent();
companyLogos.setScrollSpeed('slow'); // 'slow', 'normal', 'fast'

// Highlight specific company
companyLogos.highlightCompany('Google');
```

### Performance Settings
Adjust performance settings in `js/app.js`:

```javascript
// Reduce animations on low-end devices
const isLowEndDevice = navigator.hardwareConcurrency <= 2;

// Custom observer options
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
```

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Required Features
- CSS Grid and Flexbox
- CSS Custom Properties (Variables)
- Intersection Observer API
- ES6+ JavaScript features

## 🎭 Animation Details

### CSS Keyframes
- `fadeInUp` - Slide up with fade
- `fadeInLeft` / `fadeInRight` - Horizontal slide animations
- `float` - Continuous floating motion
- `pulse` - Breathing effect
- `scroll-logos` - Infinite horizontal scroll

### Intersection Observer
All components use Intersection Observer for performance-optimized scroll animations:

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Trigger animations
        }
    });
}, { threshold: 0.1 });
```

## 🛠️ Development

### Adding New Components

1. Create new component file in `components/`
2. Follow the component pattern:

```javascript
class NewComponent {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.animate();
        this.bindEvents();
    }

    render() {
        // Component HTML
    }

    animate() {
        // Animation logic
    }

    bindEvents() {
        // Event handlers
    }
}
```

3. Add component container to `index.html`
4. Include script in `index.html`

### Code Style
- Use ES6+ features
- Consistent naming conventions
- Modular component architecture
- Comments for complex logic

## 🐛 Troubleshooting

### Common Issues

**Animations not working:**
- Check browser support for Intersection Observer
- Ensure CSS custom properties are supported
- Verify JavaScript is enabled

**Layout issues on mobile:**
- Check viewport meta tag
- Verify CSS Grid/Flexbox support
- Test responsive breakpoints

**Performance issues:**
- Enable reduced motion for low-end devices
- Check console for JavaScript errors
- Optimize images if added

## 📄 License

This project is for educational and demonstration purposes. 

Original Labelbox branding and content belong to Labelbox, Inc.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

### Development Setup
1. Fork the repository
2. Make your changes
3. Test across different browsers
4. Submit a pull request

## 📞 Support

For questions or issues:
- Check browser console for errors
- Verify all files are properly linked
- Ensure modern browser compatibility

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**

*No frameworks, no build tools, just pure web technologies!* 