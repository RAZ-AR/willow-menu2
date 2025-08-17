const translations = {
    en: {
        hero: {
            title: "Welcome to Willow",
            subtitle: "Exquisite coffee & cuisine experience"
        },
        categories: {
            all: "All",
            coffee: "Coffee",
            bar: "Bar",
            whisky: "Whisky",
            wine: "Wine",
            prosecco: "Prosecco",
            beverages: "Beverages",
            sandwiches: "Sandwiches",
            sweets: "Sweets"
        },
        loading: "Loading menu...",
        currency: "RSD",
        menu: {
            toggle: "Menu"
        }
    },
    ru: {
        hero: {
            title: "Добро пожаловать в Willow",
            subtitle: "Изысканный кофе и кулинарный опыт"
        },
        categories: {
            all: "Все",
            coffee: "Кофе",
            bar: "Бар",
            whisky: "Виски",
            wine: "Вино",
            prosecco: "Просекко",
            beverages: "Напитки",
            sandwiches: "Сэндвичи",
            sweets: "Сладости"
        },
        loading: "Загрузка меню...",
        currency: "RSD",
        menu: {
            toggle: "Меню"
        }
    },
    sr: {
        hero: {
            title: "Добродошли у Willow",
            subtitle: "Изузетно кафе и кулинарско искуство"
        },
        categories: {
            all: "Све",
            coffee: "Кафа",
            bar: "Бар",
            whisky: "Виски",
            wine: "Вино",
            prosecco: "Просеко",
            beverages: "Пића",
            sandwiches: "Сендвичи",
            sweets: "Слаткиши"
        },
        loading: "Учитавање менија...",
        currency: "RSD",
        menu: {
            toggle: "Мени"
        }
    }
};

function updateTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        let translation = translations[lang];
        
        for (const k of keys) {
            translation = translation[k];
        }
        
        if (translation) {
            element.textContent = translation;
        }
    });
}