// Gallery Component
class GalleryComponent {
    constructor() {
        this.allApplications = [];
        this.filteredApplications = [];
        this.currentCategory = 'All';
        this.currentChip = 'All Chips';
        this.searchQuery = '';
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.isLoading = false;
        this.init();
    }

    init() {
        // Wait for data to be available
        if (typeof applicationsData !== 'undefined') {
            this.allApplications = applicationsData.applications;
            this.filteredApplications = [...this.allApplications];
            this.render();
            this.bindEvents();
            this.animateOnLoad();
        } else {
            setTimeout(() => this.init(), 100);
        }
    }

    render() {
        this.renderFilters();
        this.renderChipDropdown();
        this.renderSearchBox();
        this.renderApplications();
        this.updateResultsCounter();
    }

    renderFilters() {
        const filterTagsContainer = document.getElementById('filter-tags');
        if (!filterTagsContainer) return;

        const filtersHTML = applicationsData.categories.map(category => `
            <span class="filter-tag ${category === this.currentCategory ? 'active' : ''}" 
                  data-category="${category}">
                ${category}
            </span>
        `).join('');

        filterTagsContainer.innerHTML = filtersHTML;
    }

    renderChipDropdown() {
        const filtersSection = document.querySelector('.gallery-filters .container');
        if (!filtersSection || filtersSection.querySelector('.chip-dropdown-container')) return;

        const chipDropdownHTML = `
            <div class="chip-dropdown-container">
                <label for="chip-filter" class="filter-label">Choose a chip type</label>
                <div class="dropdown-wrapper">
                    <select id="chip-filter" class="chip-dropdown">
                        ${applicationsData.chips.map(chip => `
                            <option value="${chip}" ${chip === this.currentChip ? 'selected' : ''}>
                                ${chip}
                            </option>
                        `).join('')}
                    </select>
                    <div class="dropdown-arrow">▼</div>
                </div>
            </div>
        `;

        // Insert chip dropdown before filter container
        const filterContainer = filtersSection.querySelector('.filter-container');
        filterContainer.insertAdjacentHTML('beforebegin', chipDropdownHTML);
    }

    renderSearchBox() {
        const filtersSection = document.querySelector('.gallery-filters .container');
        if (!filtersSection || filtersSection.querySelector('.search-container')) return;

        const searchHTML = `
            <div class="search-container">
                <div class="search-icon">🔍</div>
                <input type="text" 
                       class="search-box" 
                       placeholder="Search applications..." 
                       value="${this.searchQuery}">
            </div>
        `;

        // Insert search box before chip dropdown container
        const chipDropdownContainer = filtersSection.querySelector('.chip-dropdown-container');
        if (chipDropdownContainer) {
            chipDropdownContainer.insertAdjacentHTML('beforebegin', searchHTML);
        } else {
            const filterContainer = filtersSection.querySelector('.filter-container');
            filterContainer.insertAdjacentHTML('beforebegin', searchHTML);
        }
    }

    renderApplications() {
        const container = document.getElementById('applications-container');
        if (!container) return;

        if (this.isLoading) {
            container.innerHTML = `
                <div class="loading">
                    <div class="loading-spinner"></div>
                </div>
            `;
            return;
        }

        if (this.filteredApplications.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>No applications found</h3>
                    <p>Try adjusting your search criteria or browse different categories.</p>
                </div>
            `;
            this.updateLoadMoreButton(false);
            return;
        }

        // Calculate visible applications
        const startIndex = 0;
        const endIndex = this.currentPage * this.itemsPerPage;
        const visibleApps = this.filteredApplications.slice(startIndex, endIndex);

        const applicationsHTML = visibleApps.map(app => `
            <div class="app-card fade-in" data-app-id="${app.id}">
                <div class="app-header">
                    <div class="app-icon">${app.icon}</div>
                    <div class="app-info">
                        <h4>${app.name}</h4>
                        <div class="app-company">${app.company}</div>
                        <div class="app-chip">${app.chip}</div>
                    </div>
                </div>
                <div class="app-description">${app.description}</div>
                <div class="app-categories">
                    ${app.categories.map(category => `
                        <span class="app-category">${category}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');

        container.innerHTML = applicationsHTML;

        // Update load more button visibility
        this.updateLoadMoreButton(endIndex < this.filteredApplications.length);

        // Animate cards
        this.animateCards();
    }

    updateResultsCounter() {
        const filtersSection = document.querySelector('.gallery-filters .container');
        if (!filtersSection) return;

        let counterElement = filtersSection.querySelector('.results-counter');
        if (!counterElement) {
            counterElement = document.createElement('div');
            counterElement.className = 'results-counter';
            filtersSection.appendChild(counterElement);
        }

        const totalResults = this.filteredApplications.length;
        const currentlyShowing = Math.min(this.currentPage * this.itemsPerPage, totalResults);
        
        counterElement.textContent = `Showing ${currentlyShowing} of ${totalResults} applications`;
    }

    updateLoadMoreButton(show) {
        const loadMoreBtn = document.getElementById('load-more-btn');
        const container = loadMoreBtn?.parentElement;
        
        if (container) {
            container.style.display = show ? 'block' : 'none';
        }
    }

    filterApplications() {
        let filtered = [...this.allApplications];

        // Filter by category
        if (this.currentCategory !== 'All') {
            filtered = filtered.filter(app => 
                app.categories.includes(this.currentCategory)
            );
        }

        // Filter by chip
        if (this.currentChip !== 'All Chips') {
            filtered = filtered.filter(app => 
                app.chip === this.currentChip
            );
        }

        // Filter by search query
        if (this.searchQuery.trim()) {
            const query = this.searchQuery.toLowerCase().trim();
            filtered = filtered.filter(app =>
                app.name.toLowerCase().includes(query) ||
                app.company.toLowerCase().includes(query) ||
                app.description.toLowerCase().includes(query) ||
                app.chip.toLowerCase().includes(query) ||
                app.categories.some(cat => cat.toLowerCase().includes(query))
            );
        }

        this.filteredApplications = filtered;
        this.currentPage = 1; // Reset to first page
    }

    bindEvents() {
        // Filter tag clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-tag')) {
                this.handleCategoryFilter(e.target.dataset.category);
            }
        });

        // Search box input
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('search-box')) {
                this.handleSearch(e.target.value);
            }
        });

        // Chip dropdown change
        document.addEventListener('change', (e) => {
            if (e.target.id === 'chip-filter') {
                this.handleChipFilter(e.target.value);
            }
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreApplications();
            });
        }

        // App card clicks
        document.addEventListener('click', (e) => {
            const appCard = e.target.closest('.app-card');
            if (appCard) {
                this.handleAppClick(appCard.dataset.appId);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });
    }

    handleCategoryFilter(category) {
        // Update active filter
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        this.currentCategory = category;
        this.showLoading();
        
        setTimeout(() => {
            this.filterApplications();
            this.renderApplications();
            this.updateResultsCounter();
        }, 300);

        // Analytics tracking
        this.trackEvent('Filter', 'Category', category);
    }

    handleChipFilter(chip) {
        this.currentChip = chip;
        this.showLoading();
        
        setTimeout(() => {
            this.filterApplications();
            this.renderApplications();
            this.updateResultsCounter();
        }, 300);

        // Analytics tracking
        this.trackEvent('Filter', 'Chip', chip);
    }

    handleSearch(query) {
        this.searchQuery = query;
        
        // Debounce search
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.showLoading();
            setTimeout(() => {
                this.filterApplications();
                this.renderApplications();
                this.updateResultsCounter();
            }, 200);
        }, 300);

        // Analytics tracking
        if (query.trim()) {
            this.trackEvent('Search', 'Query', query);
        }
    }

    loadMoreApplications() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.textContent = 'Loading...';
            loadMoreBtn.disabled = true;
        }

        setTimeout(() => {
            this.currentPage++;
            this.renderApplications();
            this.updateResultsCounter();
            
            if (loadMoreBtn) {
                loadMoreBtn.textContent = 'Load More Applications';
                loadMoreBtn.disabled = false;
            }

            this.trackEvent('Pagination', 'Load More', this.currentPage);
        }, 500);
    }

    handleAppClick(appId) {
        const app = this.allApplications.find(a => a.id == appId);
        if (app) {
            console.log('Application selected:', app);
            
            // Create modal or redirect
            this.showAppModal(app);
            
            this.trackEvent('App', 'Click', app.name);
        }
    }

    showAppModal(app) {
        const modal = document.createElement('div');
        modal.className = 'app-modal-overlay';
        modal.innerHTML = `
            <div class="app-modal">
                <div class="app-modal-header">
                    <div class="app-modal-icon">${app.icon}</div>
                    <div class="app-modal-info">
                        <h2>${app.name}</h2>
                        <p>${app.company}</p>
                    </div>
                    <button class="modal-close">×</button>
                </div>
                <div class="app-modal-content">
                    <p>${app.description}</p>
                    <div class="modal-chip-info">
                        <span class="modal-chip-label">Compatible Chip:</span>
                        <span class="modal-chip-value">${app.chip}</span>
                    </div>
                    <div class="modal-categories">
                        ${app.categories.map(cat => `<span class="modal-category">${cat}</span>`).join('')}
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Learn More</button>
                        <button class="btn btn-outline">Add to Favorites</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyles = `
            .app-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .app-modal {
                background: white;
                border-radius: 16px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideInUp 0.3s ease;
            }
            .app-modal-header {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 30px;
                border-bottom: 1px solid var(--border-color);
            }
            .app-modal-icon {
                width: 60px;
                height: 60px;
                background: var(--gradient-primary);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
            }
            .app-modal-info h2 {
                margin: 0 0 5px 0;
                color: var(--text-primary);
            }
            .app-modal-info p {
                margin: 0;
                color: var(--text-secondary);
            }
            .modal-close {
                margin-left: auto;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                padding: 5px;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-close:hover {
                background: var(--bg-secondary);
            }
            .app-modal-content {
                padding: 30px;
            }
            .modal-chip-info {
                margin: 15px 0;
                padding: 12px;
                background: var(--bg-secondary);
                border-radius: 8px;
                border-left: 4px solid var(--primary-color);
            }
            .modal-chip-label {
                font-weight: 600;
                color: var(--text-primary);
                margin-right: 8px;
            }
            .modal-chip-value {
                color: var(--primary-color);
                font-weight: 500;
                background: rgba(99, 102, 241, 0.1);
                padding: 4px 8px;
                border-radius: 12px;
            }
            .modal-categories {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 20px 0;
            }
            .modal-category {
                padding: 6px 12px;
                background: rgba(99, 102, 241, 0.1);
                color: var(--primary-color);
                border-radius: 15px;
                font-size: 12px;
                font-weight: 500;
            }
            .modal-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            .modal-actions .btn {
                flex: 1;
            }
        `;

        // Add styles if not already present
        if (!document.querySelector('#modal-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'modal-styles';
            styleElement.textContent = modalStyles;
            document.head.appendChild(styleElement);
        }

        document.body.appendChild(modal);

        // Close modal events
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-close')) {
                modal.remove();
            }
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    clearSearch() {
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.value = '';
            this.handleSearch('');
        }
    }

    showLoading() {
        this.isLoading = true;
        this.renderApplications();
        
        setTimeout(() => {
            this.isLoading = false;
        }, 300);
    }

    animateOnLoad() {
        // Animate hero section
        const hero = document.querySelector('.gallery-hero');
        if (hero) {
            hero.style.opacity = '0';
            hero.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                hero.style.transition = 'all 0.8s ease';
                hero.style.opacity = '1';
                hero.style.transform = 'translateY(0)';
            }, 100);
        }

        // Animate filters
        const filters = document.querySelector('.gallery-filters');
        if (filters) {
            filters.style.opacity = '0';
            filters.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                filters.style.transition = 'all 0.6s ease';
                filters.style.opacity = '1';
                filters.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    animateCards() {
        const cards = document.querySelectorAll('.app-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    trackEvent(category, action, label) {
        // Analytics tracking
        console.log('Analytics:', { category, action, label });
        // Here you would send to your analytics service
    }

    // Public methods for external control
    selectCategory(category) {
        if (applicationsData.categories.includes(category)) {
            this.handleCategoryFilter(category);
        }
    }

    search(query) {
        this.handleSearch(query);
    }

    getStats() {
        return {
            totalApplications: this.allApplications.length,
            filteredApplications: this.filteredApplications.length,
            currentCategory: this.currentCategory,
            searchQuery: this.searchQuery,
            currentPage: this.currentPage
        };
    }
}

// Initialize gallery component
document.addEventListener('DOMContentLoaded', () => {
    new GalleryComponent();
}); 