# 🍎 Пошаговое руководство для macOS

## 🚀 Автоматический запуск Willow Cafe на GitHub Pages

### 📋 Что у вас есть:
✅ **setup.sh** - автоматический скрипт развертывания  
✅ **check.sh** - проверка готовности системы  
✅ **config.txt** - конфигурационный файл  
✅ Все файлы проекта готовы  

---

## ⚡ Быстрый старт (2-3 минуты)

### 1. 📂 Откройте Терминал
```bash
# Способ 1: Spotlight Search
⌘ + Space → введите "terminal" → Enter

# Способ 2: Finder
Applications → Utilities → Terminal
```

### 2. 📁 Перейдите в папку проекта
```bash
cd /Users/bari/Documents/GitHub/MENU/
```

### 3. 🔍 Проверьте готовность системы
```bash
chmod +x check.sh
./check.sh
```
**Ожидаемый результат:** все галочки ✅ зеленые

### 4. 🚀 Запустите автоматический setup
```bash
chmod +x setup.sh
./setup.sh
```

### 5. 📝 Следуйте инструкциям скрипта
Скрипт спросит:
- **GitHub username** - ваш логин на GitHub
- **Название репозитория** - по умолчанию `willow-menu`
- **Git настройки** - имя и email (если не настроены)

### 6. ✅ Готово!
Скрипт автоматически:
- ✅ Обновит все URL-ы в файлах
- ✅ Создаст Git репозиторий
- ✅ Создаст репозиторий на GitHub (если установлен GitHub CLI)
- ✅ Загрузит все файлы
- ✅ Даст инструкции по настройке GitHub Pages

---

## 🛠️ Если что-то пошло не так

### Проблема: "Permission denied"
```bash
chmod +x setup.sh
chmod +x check.sh
```

### Проблема: "Git not found"
```bash
# Установите Git
brew install git

# Или скачайте с сайта
open https://git-scm.com/download/mac
```

### Проблема: "GitHub CLI not found" 
```bash
# Опционально для автоматического создания репозитория
brew install gh
```

### Проблема: не можете найти папку
```bash
# Проверьте путь
ls /Users/bari/Documents/GitHub/MENU/

# Или найдите файлы
find /Users -name "index.html" -path "*/MENU/*" 2>/dev/null
```

---

## 📱 Альтернативный способ (если Terminal пугает)

### Через GitHub Desktop:
1. Скачайте [GitHub Desktop](https://desktop.github.com/)
2. Установите и войдите в GitHub аккаунт
3. Нажмите "Create New Repository"
4. Название: `willow-menu`
5. Local Path: `/Users/bari/Documents/GitHub/MENU/`
6. Нажмите "Create Repository"
7. Нажмите "Publish Repository"

### Настройка GitHub Pages:
1. Откройте https://github.com/ВАШ-USERNAME/willow-menu
2. Settings → Pages
3. Source: "GitHub Actions"
4. Готово! 

---

## 🎯 Финальный результат

После выполнения у вас будет:

🌐 **Живой сайт:** `https://ваш-username.github.io/willow-menu/`  
📊 **Интеграция с Google Sheets** - меню обновляется автоматически  
🌍 **3 языка** - EN/RU/SR переключение  
📱 **Адаптивный дизайн** - работает на всех устройствах  
🎨 **Liquid glass анимация** - красивый динамический фон  
⚡ **Быстрая загрузка** - оптимизировано для GitHub Pages  

---

## 🆘 Поддержка

### Если возникли проблемы:

1. **Проверьте вывод скрипта** - все ошибки выводятся с пояснениями
2. **Запустите check.sh** - покажет что нужно исправить
3. **Проверьте GitHub Actions** - https://github.com/ваш-username/willow-menu/actions

### Логи скрипта сохраняются в:
- `setup.log` - полный лог выполнения
- `*.backup` - backup файлы на случай отката

---

## ⏱️ Временные затраты

✅ **Подготовка:** 30 секунд (открыть Terminal, перейти в папку)  
✅ **Проверка:** 30 секунд (./check.sh)  
✅ **Запуск:** 2-3 минуты (./setup.sh + ввод данных)  
✅ **GitHub Pages:** 2-5 минут (автоматическое развертывание)  

**Общее время: ~5-10 минут до полного запуска! 🚀**

---

## 🎉 Поздравляем!

После выполнения у вас будет профессиональный сайт кафе с:
- Живыми данными из Google Таблиц
- Красивым современным дизайном  
- Многоязычной поддержкой
- Бесплатным хостингом на GitHub Pages

**Просто запустите `./setup.sh` и следуйте инструкциям! ☕✨**