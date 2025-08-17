# 🚀 Развертывание Willow Cafe Menu на GitHub Pages

## 📋 Пошаговая инструкция

### 1. Подготовка GitHub репозитория

1. **Создайте новый репозиторий на GitHub:**
   - Перейдите на https://github.com
   - Нажмите "New repository"
   - Название: `willow-menu` (или любое другое)
   - Сделайте репозиторий публичным
   - ✅ Поставьте галочку "Add a README file"

2. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/ВАШ-USERNAME/willow-menu.git
   cd willow-menu
   ```

### 2. Загрузка файлов

1. **Скопируйте все файлы проекта в папку репозитория:**
   ```
   willow-menu/
   ├── .github/
   │   └── workflows/
   │       └── deploy.yml
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── menu-data.js
   ├── translations.js
   ├── logo.svg
   ├── test.html
   ├── package.json
   ├── _config.yml
   ├── .gitignore
   ├── README.md
   ├── GOOGLE_SHEETS_SETUP.md
   ├── INTEGRATION_STATUS.md
   └── DEPLOYMENT.md
   ```

2. **Обновите URL-ы в файлах:**
   
   В `index.html` замените:
   ```html
   <meta property="og:url" content="https://ВАШ-USERNAME.github.io/willow-menu/">
   <meta property="twitter:url" content="https://ВАШ-USERNAME.github.io/willow-menu/">
   <meta property="og:image" content="https://ВАШ-USERNAME.github.io/willow-menu/logo.svg">
   <meta property="twitter:image" content="https://ВАШ-USERNAME.github.io/willow-menu/logo.svg">
   ```

   В `package.json` замените:
   ```json
   "repository": {
     "type": "git", 
     "url": "git+https://github.com/ВАШ-USERNAME/willow-menu.git"
   },
   "homepage": "https://ВАШ-USERNAME.github.io/willow-menu/"
   ```

   В `_config.yml` замените:
   ```yaml
   url: "https://ВАШ-USERNAME.github.io"
   baseurl: "/willow-menu"
   ```

### 3. Загрузка в GitHub

```bash
# Добавить все файлы
git add .

# Создать коммит
git commit -m "Initial commit: Willow Cafe Menu with Google Sheets integration

🎨 Features:
- Liquid glass animated background
- Multilingual support (EN/RU/SR)
- Live Google Sheets integration
- Responsive design
- Auto-refresh menu updates

🚀 Ready for GitHub Pages hosting"

# Загрузить на GitHub
git push origin main
```

### 4. Настройка GitHub Pages

1. **Перейдите в настройки репозитория:**
   - Откройте ваш репозиторий на GitHub
   - Нажмите "Settings" (справа вверху)
   - Прокрутите до раздела "Pages" (в боковом меню)

2. **Настройте источник:**
   - Source: "GitHub Actions"
   - Сохраните настройки

3. **Подождите деплоя:**
   - Перейдите в раздел "Actions"
   - Дождитесь зеленой галочки ✅
   - Обычно занимает 2-5 минут

### 5. Проверка результата

1. **Ваш сайт будет доступен по адресу:**
   ```
   https://ВАШ-USERNAME.github.io/willow-menu/
   ```

2. **Проверьте функциональность:**
   - ✅ Открывается главная страница
   - ✅ Liquid glass анимация работает
   - ✅ Переключение языков работает
   - ✅ Данные загружаются из Google Таблиц
   - ✅ Фильтрация по категориям работает
   - ✅ Сайт адаптивный на мобильных

### 6. Обновление контента

**Для обновления меню:**
- Просто измените данные в Google Таблице
- Сайт автоматически обновится в течение 5 минут

**Для обновления кода:**
```bash
# Внесите изменения в файлы
git add .
git commit -m "Update: описание изменений"
git push origin main
```

## 🔧 Дополнительные настройки

### Пользовательский домен (опционально)

1. **Купите домен** (например, `willowcafe.com`)

2. **Добавьте файл CNAME:**
   ```bash
   echo "willowcafe.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push origin main
   ```

3. **Настройте DNS** у регистратора домена:
   ```
   CNAME record: www -> ВАШ-USERNAME.github.io
   A records: @ -> 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   ```

### HTTPS и безопасность

GitHub Pages автоматически предоставляет:
- ✅ HTTPS сертификат
- ✅ CDN для быстрой загрузки
- ✅ Защита от DDoS

### Аналитика (опционально)

Добавьте Google Analytics в `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Результат

После выполнения всех шагов у вас будет:

✅ **Живой сайт** доступный в интернете  
✅ **Автоматические деплои** при изменениях кода  
✅ **Интеграция с Google Таблицами** для обновления меню  
✅ **Многоязычный интерфейс** (EN/RU/SR)  
✅ **Адаптивный дизайн** для всех устройств  
✅ **Профессиональный liquid glass дизайн**  

## 🆘 Устранение проблем

**Сайт не открывается:**
- Проверьте, что репозиторий публичный
- Убедитесь, что GitHub Actions завершился успешно
- Подождите 10-15 минут после первого деплоя

**Данные не загружаются:**
- Убедитесь, что Google Таблица публична
- Проверьте консоль браузера (F12) на ошибки
- Таблица должна быть доступна по ссылке без авторизации

**Вопросы?**
- Создайте Issue в репозитории
- Проверьте логи в разделе Actions на GitHub

---
*Готово! Ваше кафе теперь онлайн! ☕✨*