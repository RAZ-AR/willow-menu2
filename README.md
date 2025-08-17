# ☕ Willow Cafe - Live Menu Website

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://your-username.github.io/willow-menu/)
[![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Integrated-blue)](https://docs.google.com/spreadsheets/d/1BRQuzea6bba0NxxPk9koLSzpHkfiAzrKmwDa8ow7128/)
[![Multilingual](https://img.shields.io/badge/Languages-EN%20%7C%20RU%20%7C%20SR-orange)](/)

Beautiful cafe landing page with liquid glass design and live Google Sheets integration.

![Willow Cafe Preview](https://via.placeholder.com/800x400/2C3E50/FFFFFF?text=Willow+Cafe+Menu)

## Особенности

- 🎨 Динамический liquid glass фон с анимацией
- 🌍 Многоязычная поддержка (EN/RU/SR)
- 📱 Адаптивный дизайн для всех устройств
- 🔄 Интеграция с Google Таблицами для меню
- ⚡ Быстрая загрузка и плавные анимации
- 🏪 Фильтрация по категориям меню

## Структура файлов

```
/
├── index.html          # Главная страница
├── styles.css          # Стили с liquid glass эффектами
├── script.js           # Основная логика приложения
├── translations.js     # Переводы для разных языков
├── menu-data.js        # Данные меню (симуляция API)
├── logo.svg            # Логотип Willow
└── README.md           # Документация
```

## Интеграция с Google Таблицами

🔗 **Прямая связь с Google Sheets уже настроена!**

Ваша таблица: `https://docs.google.com/spreadsheets/d/1BRQuzea6bba0NxxPk9koLSzpHkfiAzrKmwDa8ow7128/`

### Быстрый старт:

1. **Готово к работе!** API ключ не нужен - используется прямое чтение публичных данных.

2. **Структура таблицы (уже настроена):**
   - Колонка A: Категория меню
   - Колонка B: Название (английский)
   - Колонка C: Название (русский) 
   - Колонка D: Название (сербский)
   - Колонка E: Объем напитка
   - Колонка F: Стоимость (RSD)
   - Колонка G: Состав

**Поддерживаемые категории:**
- Coffee & (кофе)
- Bar / Rakija (ракия)
- Bar / Whisky (виски)
- Bar / White Wine, Bar / Red Wine (вино)
- Prosecco (просекко)
- Beverages (напитки)
- Sandwiches & (сэндвичи)
- Sweets (сладости)

3. **Готово!** Просто откройте `index.html` - изменения в таблице автоматически появятся на сайте.

🧪 **Тестирование:** Откройте `test.html` для проверки загрузки данных  
📖 **Подробная инструкция:** см. `GOOGLE_SHEETS_SETUP.md`

### Автоматические функции:

✅ Обновление каждые 5 минут  
✅ Кеширование для быстрой загрузки  
✅ Уведомления об изменениях  
✅ Кнопка ручного обновления  
✅ Поддержка offline режима

## 🚀 Quick Start

### GitHub Pages Deployment (Recommended)

1. **Fork this repository**
2. **Enable GitHub Pages** in Settings > Pages > Source: GitHub Actions
3. **Update URLs** in files (replace `your-username` with your GitHub username)
4. **Your site will be live at:** `https://your-username.github.io/willow-menu/`

📖 **Detailed deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

### Local Development

1. Clone the repository
2. Start a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js  
   npx live-server
   
   # VS Code
   Use Live Server extension
   ```
3. Open `http://localhost:8000`

## Настройка

### Изменение цветов фона:
В `styles.css` найдите `.liquid-background` и измените градиент:

```css
background: linear-gradient(45deg, 
    #ваш_цвет1 0%, 
    #ваш_цвет2 20%, 
    /* ... */
);
```

### Добавление новых языков:
1. Обновите `translations.js`
2. Добавьте кнопку языка в HTML
3. Обновите данные меню с новыми переводами

### Кастомизация логотипа:
Замените `logo.svg` на ваш логотип, сохранив размеры 120x40px.

## Технические детали

- **Анимации:** CSS keyframes с hardware acceleration
- **Производительность:** Lazy loading изображений, оптимизированные анимации
- **Совместимость:** Современные браузеры (ES6+)
- **Фреймворки:** Vanilla JS (без зависимостей)

## Разработка

Для локальной разработки рекомендуется использовать Live Server или подобный инструмент для автоматической перезагрузки.

```bash
# Пример с Python
python -m http.server 8000

# Или с Node.js
npx live-server
```

## Лицензия

Проект создан для Willow Cafe. Все права защищены.