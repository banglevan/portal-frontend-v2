// Applications Manager Component
class ApplicationsManagerComponent {
    constructor() {
        this.currentApp = null;
        this.currentTab = 'general';
        this.applications = userApplicationsData.applications;
        this.filteredApplications = [...this.applications];
        this.sidebarCollapsed = false;
        
        this.init();
    }

    init() {
        this.renderApplicationsList();
        this.bindEvents();
        this.updateBannerStats();
        
        // Show empty state initially
        this.showEmptyState();
    }

    updateBannerStats() {
        const stats = userApplicationsData.stats;
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length >= 3) {
            statNumbers[0].textContent = stats.activeApplications;
            statNumbers[1].textContent = stats.totalCategories;
            statNumbers[2].textContent = `${stats.averageUptime}%`;
        }
    }

    renderApplicationsList() {
        const applicationsList = document.getElementById('applicationsList');
        
        const applicationsHTML = this.filteredApplications.map(app => `
            <div class="app-item" data-app-id="${app.id}">
                <div class="app-icon" style="background-color: ${app.iconColor}; color: white;">
                    ${app.icon}
                </div>
                <div class="app-info">
                    <div class="app-name">${app.name}</div>
                    <div class="app-type">${app.typeName}</div>
                </div>
                <div class="app-status ${app.status}"></div>
            </div>
        `).join('');

        applicationsList.innerHTML = applicationsHTML;
    }

    selectApplication(appId) {
        // Remove active class from all apps
        document.querySelectorAll('.app-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to selected app
        const selectedItem = document.querySelector(`[data-app-id="${appId}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        // Get application data
        this.currentApp = this.applications.find(app => app.id === parseInt(appId));
        
        if (this.currentApp) {
            this.showApplicationConfig();
            this.loadApplicationConfig();
        }
    }

    showApplicationConfig() {
        const emptyState = document.getElementById('emptyState');
        const configTabs = document.getElementById('configTabs');
        const currentAppInfo = document.getElementById('currentAppInfo');

        // Hide empty state
        emptyState.style.display = 'none';
        
        // Show config tabs
        configTabs.style.display = 'flex';

        // Update header info
        currentAppInfo.innerHTML = `
            <h2>${this.currentApp.name}</h2>
            <p>${this.currentApp.description}</p>
        `;
    }

    showEmptyState() {
        const emptyState = document.getElementById('emptyState');
        const configTabs = document.getElementById('configTabs');
        
        emptyState.style.display = 'flex';
        configTabs.style.display = 'none';
    }

    loadApplicationConfig() {
        if (!this.currentApp) return;

        const config = this.currentApp.config;

        // Load General tab
        this.loadConfigValue('appName', config.general.name);
        this.loadConfigValue('appType', config.general.type);
        this.loadConfigValue('appStatus', config.general.status);
        this.loadConfigValue('appDescription', config.general.description);

        // Load Advanced tab
        this.loadConfigValue('modelVersion', config.advanced.modelVersion);
        this.loadConfigValue('confidenceThreshold', config.advanced.confidenceThreshold);
        this.loadConfigValue('processingMode', config.advanced.processingMode);
        this.loadConfigValue('enablePreprocessing', config.advanced.enablePreprocessing);

        // Load Performance tab
        this.loadConfigValue('maxRequests', config.performance.maxRequests);
        this.loadConfigValue('requestTimeout', config.performance.requestTimeout);
        this.loadConfigValue('memoryLimit', config.performance.memoryLimit);
        this.loadConfigValue('cpuCores', config.performance.cpuCores);

        // Load Security tab
        this.loadConfigValue('apiKey', config.security.apiKey);
        this.loadConfigValue('enableAuth', config.security.enableAuth);
        this.loadConfigValue('enableHttps', config.security.enableHttps);
        this.loadConfigValue('allowedOrigins', config.security.allowedOrigins);

        // Load Monitoring tab
        this.loadConfigValue('logLevel', config.monitoring.logLevel);
        this.loadConfigValue('enableMetrics', config.monitoring.enableMetrics);
        this.loadConfigValue('enableAlerts', config.monitoring.enableAlerts);
        this.loadConfigValue('alertEmail', config.monitoring.alertEmail);

        // Update confidence threshold display
        this.updateRangeValue('confidenceThreshold', config.advanced.confidenceThreshold);
    }

    loadConfigValue(elementId, value) {
        const element = document.getElementById(elementId);
        if (!element) return;

        if (element.type === 'checkbox') {
            element.checked = value;
        } else {
            element.value = value;
        }
    }

    updateRangeValue(rangeId, value) {
        const rangeInput = document.getElementById(rangeId);
        const rangeValue = rangeInput.parentElement.querySelector('.range-value');
        
        if (rangeValue) {
            rangeValue.textContent = `${value}%`;
        }
    }

    switchTab(tabName) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('active');
        });

        // Add active class to selected tab
        const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const tabPane = document.getElementById(`${tabName}Tab`);

        if (tabBtn) tabBtn.classList.add('active');
        if (tabPane) tabPane.classList.add('active');

        this.currentTab = tabName;
    }

    toggleSidebar() {
        const sidebar = document.getElementById('applicationsSidebar');
        this.sidebarCollapsed = !this.sidebarCollapsed;
        
        if (this.sidebarCollapsed) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
    }

    searchApplications(query) {
        const searchTerm = query.toLowerCase();
        
        this.filteredApplications = this.applications.filter(app => {
            return app.name.toLowerCase().includes(searchTerm) ||
                   app.typeName.toLowerCase().includes(searchTerm) ||
                   app.description.toLowerCase().includes(searchTerm);
        });

        this.renderApplicationsList();
    }

    saveConfiguration() {
        if (!this.currentApp) {
            alert('No application selected');
            return;
        }

        // Collect all form data
        const configData = {
            general: {
                name: document.getElementById('appName').value,
                type: document.getElementById('appType').value,
                status: document.getElementById('appStatus').value,
                description: document.getElementById('appDescription').value
            },
            advanced: {
                modelVersion: document.getElementById('modelVersion').value,
                confidenceThreshold: parseInt(document.getElementById('confidenceThreshold').value),
                processingMode: document.getElementById('processingMode').value,
                enablePreprocessing: document.getElementById('enablePreprocessing').checked
            },
            performance: {
                maxRequests: parseInt(document.getElementById('maxRequests').value),
                requestTimeout: parseInt(document.getElementById('requestTimeout').value),
                memoryLimit: parseFloat(document.getElementById('memoryLimit').value),
                cpuCores: parseInt(document.getElementById('cpuCores').value)
            },
            security: {
                apiKey: document.getElementById('apiKey').value,
                enableAuth: document.getElementById('enableAuth').checked,
                enableHttps: document.getElementById('enableHttps').checked,
                allowedOrigins: document.getElementById('allowedOrigins').value
            },
            monitoring: {
                logLevel: document.getElementById('logLevel').value,
                enableMetrics: document.getElementById('enableMetrics').checked,
                enableAlerts: document.getElementById('enableAlerts').checked,
                alertEmail: document.getElementById('alertEmail').value
            }
        };

        // Update current app config
        this.currentApp.config = configData;

        // Update application in the main array
        const appIndex = this.applications.findIndex(app => app.id === this.currentApp.id);
        if (appIndex !== -1) {
            this.applications[appIndex] = this.currentApp;
        }

        // Show success message
        this.showNotification('Configuration saved successfully!', 'success');

        console.log('Saved configuration for:', this.currentApp.name, configData);
    }

    exportConfiguration() {
        if (!this.currentApp) {
            alert('No application selected');
            return;
        }

        const configData = {
            application: {
                name: this.currentApp.name,
                type: this.currentApp.type,
                id: this.currentApp.id
            },
            config: this.currentApp.config,
            exportedAt: new Date().toISOString()
        };

        const dataStr = JSON.stringify(configData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.currentApp.name.replace(/\s+/g, '_')}_config.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Configuration exported successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideInNotification 0.3s ease;
        `;
        notification.textContent = message;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInNotification {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInNotification 0.3s ease reverse';
            setTimeout(() => {
                document.body.removeChild(notification);
                document.head.removeChild(style);
            }, 300);
        }, 3000);
    }

    bindEvents() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Application search
        const appSearch = document.getElementById('appSearch');
        appSearch.addEventListener('input', (e) => {
            this.searchApplications(e.target.value);
        });

        // Application selection
        document.getElementById('applicationsList').addEventListener('click', (e) => {
            const appItem = e.target.closest('.app-item');
            if (appItem) {
                const appId = appItem.dataset.appId;
                this.selectApplication(appId);
            }
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Range input updates
        const confidenceRange = document.getElementById('confidenceThreshold');
        if (confidenceRange) {
            confidenceRange.addEventListener('input', (e) => {
                this.updateRangeValue('confidenceThreshold', e.target.value);
            });
        }

        // Save configuration
        const saveButtons = document.querySelectorAll('.btn-primary');
        saveButtons.forEach(btn => {
            if (btn.textContent.includes('Save')) {
                btn.addEventListener('click', () => {
                    this.saveConfiguration();
                });
            }
        });

        // Export configuration
        const exportButtons = document.querySelectorAll('.btn-outline');
        exportButtons.forEach(btn => {
            if (btn.textContent.includes('Export')) {
                btn.addEventListener('click', () => {
                    this.exportConfiguration();
                });
            }
        });

        // API Key regeneration
        const apiKeyButton = document.querySelector('.btn-action');
        if (apiKeyButton) {
            apiKeyButton.addEventListener('click', () => {
                const apiKeyInput = document.getElementById('apiKey');
                const newKey = 'sk-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                apiKeyInput.value = newKey;
                this.showNotification('API Key regenerated!', 'success');
            });
        }

        // New Application button
        const newAppButton = document.querySelector('.sidebar-footer .btn-primary');
        if (newAppButton) {
            newAppButton.addEventListener('click', () => {
                this.showNotification('New Application feature coming soon!', 'info');
            });
        }

        // Form validation
        this.addFormValidation();
    }

    addFormValidation() {
        // Add real-time validation
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const value = input.value;
        let isValid = true;
        let errorMessage = '';

        // Validate based on input type
        switch (input.type) {
            case 'number':
                const min = parseFloat(input.min);
                const max = parseFloat(input.max);
                const numValue = parseFloat(value);
                
                if (isNaN(numValue)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid number';
                } else if (min !== undefined && numValue < min) {
                    isValid = false;
                    errorMessage = `Value must be at least ${min}`;
                } else if (max !== undefined && numValue > max) {
                    isValid = false;
                    errorMessage = `Value must be at most ${max}`;
                }
                break;
            
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
        }

        // Update input styling
        input.style.borderColor = isValid ? '' : '#ef4444';
        
        // Remove existing error message
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message if invalid
        if (!isValid && errorMessage) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = 'color: #ef4444; font-size: 12px; margin-top: 5px;';
            errorDiv.textContent = errorMessage;
            input.parentElement.appendChild(errorDiv);
        }

        return isValid;
    }
}

// Initialize the component when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the applications manager page
    if (document.querySelector('.applications-main')) {
        window.applicationsManager = new ApplicationsManagerComponent();
    }
}); 