/**
 * Willow Cafe Menu Application
 * GitHub Pages Ready - Production Version
 * Integrates with Google Sheets for live menu updates
 */

class MenuApp {
    constructor() {
        this.currentLang = 'en';
        this.currentCategory = 'all';
        this.menuItems = [];
        this.autoRefreshInterval = null;
        this.isMenuOpen = false;
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadMenu();
        this.renderMenu();
        this.hideLoading();
        this.startAutoRefresh();
    }

    setupEventListeners() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchLanguage(e.target.dataset.lang);
            });
        });

        // Category filter
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterByCategory(e.target.dataset.category);
            });
        });
    }

    async loadMenu() {
        try {
            this.menuItems = await loadMenuFromGoogleSheets();
            console.log('Меню загружено:', this.menuItems.length, 'элементов');
        } catch (error) {
            console.error('Error loading menu:', error);
            this.showError();
        }
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
        
        // Update translations
        updateTranslations(lang);
        
        // Re-render menu with new language
        this.renderMenu();
    }

    filterByCategory(category) {
        this.currentCategory = category;
        
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        
        // Re-render menu with filter
        this.renderMenu();
    }

    getFilteredItems() {
        if (this.currentCategory === 'all') {
            return this.menuItems;
        }
        
        return this.menuItems.filter(item => {
            const category = item.category.toLowerCase();
            const filterCategory = this.currentCategory.toLowerCase();
            
            // Специальная логика для разных категорий
            switch (filterCategory) {
                case 'coffee':
                    return category.includes('coffee');
                case 'bar':
                    return category.includes('rakija');
                case 'whisky':
                    return category.includes('whisky');
                case 'wine':
                    return category.includes('wine');
                case 'prosecco':
                    return category.includes('prosecco');
                case 'beverages':
                    return category.includes('beverages');
                case 'sandwiches':
                    return category.includes('sandwiches');
                case 'sweets':
                    return category.includes('sweets');
                default:
                    return category.includes(filterCategory);
            }
        });
    }

    renderMenu() {
        const menuGrid = document.getElementById('menuGrid');
        const filteredItems = this.getFilteredItems();
        
        menuGrid.innerHTML = '';
        
        filteredItems.forEach(item => {
            const menuItemElement = this.createMenuItemElement(item);
            menuGrid.appendChild(menuItemElement);
        });
        
        // Add animation delay for staggered entrance
        const items = menuGrid.querySelectorAll('.menu-item');
        items.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.animation = 'fadeInUp 0.6s ease-out forwards';
        });
    }

    createMenuItemElement(item) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        
        const categoryName = this.getCategoryTranslation(item.category);
        const itemName = item.names[this.currentLang] || item.names.en;
        const volume = item.volume ? `${item.volume}` : '';
        const composition = item.composition || '';
        
        div.innerHTML = `
            <div class="menu-item-category">${categoryName}</div>
            <div class="menu-item-header">
                <div>
                    <div class="menu-item-name">${itemName}</div>
                    ${volume ? `<div class="menu-item-volume">${volume}</div>` : ''}
                </div>
                <div class="menu-item-price">${item.price} ${translations[this.currentLang].currency}</div>
            </div>
            ${composition ? `<div class="menu-item-composition">${composition}</div>` : ''}
        `;
        
        return div;
    }

    getCategoryTranslation(category) {
        const categoryMap = {
            'Coffee &': 'coffee',
            'Bar / Rakija': 'bar',
            'Bar / Whisky': 'whisky',
            'Bar / White Wine': 'wine',
            'Bar / Red Wine': 'wine',
            'Prosecco': 'prosecco',
            'Beverages': 'beverages',
            'Sandwiches &': 'sandwiches',
            'Sweets': 'sweets'
        };
        
        const key = categoryMap[category] || 'all';
        return translations[this.currentLang].categories[key] || category;
    }

    hideLoading() {
        const loading = document.getElementById('loading');
        loading.style.display = 'none';
    }

    showError() {
        const menuGrid = document.getElementById('menuGrid');
        menuGrid.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: rgba(255, 255, 255, 0.8);">
                <p>Error loading menu. Please try again later.</p>
                <button onclick="menuApp.refreshMenu()" style="
                    margin-top: 1rem; 
                    padding: 10px 20px; 
                    background: rgba(255,255,255,0.2); 
                    border: 1px solid rgba(255,255,255,0.3); 
                    color: white; 
                    border-radius: 20px; 
                    cursor: pointer;
                ">Refresh Menu</button>
            </div>
        `;
        this.hideLoading();
    }
    
    // Auto refresh functionality
    startAutoRefresh() {
        // Обновляем каждые 5 минут
        this.autoRefreshInterval = setInterval(async () => {
            console.log('Автоматическое обновление меню...');
            await this.refreshMenu(false); // false = не показывать индикатор загрузки
        }, 5 * 60 * 1000);
    }
    
    stopAutoRefresh() {
        if (this.autoRefreshInterval) {
            clearInterval(this.autoRefreshInterval);
            this.autoRefreshInterval = null;
        }
    }
    
    toggleMenu() {
        const menuCategories = document.getElementById('menuCategories');
        const menuToggleBtn = document.querySelector('.menu-toggle-btn');
        
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.isMenuOpen) {
            menuCategories.classList.remove('hidden');
            menuToggleBtn.classList.add('active');
        } else {
            menuCategories.classList.add('hidden');
            menuToggleBtn.classList.remove('active');
        }
    }

    async refreshMenu(showLoading = true) {
        if (showLoading) {
            document.getElementById('loading').style.display = 'block';
        }
        
        try {
            const newMenuItems = await refreshMenuData();
            
            // Проверяем, изменились ли данные
            const currentDataString = JSON.stringify(this.menuItems);
            const newDataString = JSON.stringify(newMenuItems);
            
            if (currentDataString !== newDataString) {
                console.log('Обнаружены изменения в меню, обновляю...');
                this.menuItems = newMenuItems;
                this.renderMenu();
                
                // Показываем уведомление об обновлении
                this.showUpdateNotification();
            } else {
                console.log('Изменений в меню не обнаружено');
            }
        } catch (error) {
            console.error('Ошибка обновления меню:', error);
        }
        
        if (showLoading) {
            this.hideLoading();
        }
    }
    
    showUpdateNotification() {
        // Создаем временное уведомление
        const notification = document.createElement('div');
        notification.innerHTML = 'Меню обновлено!';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(168, 237, 234, 0.9);
            color: #000;
            padding: 10px 20px;
            border-radius: 20px;
            z-index: 1000;
            font-weight: 500;
            backdrop-filter: blur(10px);
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Add CSS animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    .menu-item {
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.menuApp = new MenuApp();
});