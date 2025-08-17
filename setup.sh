#!/bin/bash

# 🚀 Willow Cafe Menu - Automated GitHub Setup Script
# Для macOS - автоматическое создание и развертывание на GitHub Pages

# Цвета для красивого вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Функция для красивого вывода
print_step() {
    echo -e "${BLUE}🔵 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

# Заголовок
echo -e "${PURPLE}"
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                    🍃 WILLOW CAFE MENU                   ║"
echo "║                  GitHub Pages Setup Script              ║"
echo "║                        for macOS                        ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Проверка, что мы в правильной директории
if [[ ! -f "index.html" ]] || [[ ! -f "menu-data.js" ]]; then
    print_error "Скрипт должен быть запущен в папке с файлами проекта!"
    print_info "Перейдите в папку: cd /Users/bari/Documents/GitHub/MENU/"
    exit 1
fi

print_success "Файлы проекта найдены!"

# Шаг 1: Проверка Git
print_step "Проверяем установку Git..."
if ! command -v git &> /dev/null; then
    print_error "Git не установлен!"
    print_info "Установите Git: https://git-scm.com/download/mac"
    print_info "Или через Homebrew: brew install git"
    exit 1
fi
print_success "Git установлен: $(git --version)"

# Шаг 2: Проверка GitHub CLI (опционально)
if command -v gh &> /dev/null; then
    print_success "GitHub CLI найден: $(gh --version | head -n1)"
    USE_GH_CLI=true
else
    print_warning "GitHub CLI не установлен. Будем использовать веб-интерфейс."
    print_info "Для автоматического создания репозитория установите: brew install gh"
    USE_GH_CLI=false
fi

# Шаг 3: Сбор информации от пользователя
echo ""
print_step "Настройка параметров проекта"

# GitHub username
while true; do
    echo -n "Введите ваш GitHub username: "
    read GITHUB_USERNAME
    if [[ -n "$GITHUB_USERNAME" ]]; then
        break
    fi
    print_error "Username не может быть пустым!"
done

# Repository name
echo -n "Название репозитория (по умолчанию: willow-menu): "
read REPO_NAME
REPO_NAME=${REPO_NAME:-"willow-menu"}

# Шаг 4: Проверка/настройка Git конфигурации
print_step "Проверяем Git конфигурацию..."

if [[ -z "$(git config --global user.name)" ]]; then
    echo -n "Введите ваше имя для Git: "
    read GIT_NAME
    git config --global user.name "$GIT_NAME"
fi

if [[ -z "$(git config --global user.email)" ]]; then
    echo -n "Введите ваш email для Git: "
    read GIT_EMAIL
    git config --global user.email "$GIT_EMAIL"
fi

print_success "Git настроен: $(git config --global user.name) <$(git config --global user.email)>"

# Шаг 5: Обновление URL-ов в файлах
print_step "Обновляем URL-ы в файлах проекта..."

# Создаем backup
cp index.html index.html.backup
cp package.json package.json.backup
cp _config.yml _config.yml.backup

# Обновляем index.html
sed -i '' "s/your-username/$GITHUB_USERNAME/g" index.html
sed -i '' "s/willow-menu/$REPO_NAME/g" index.html

# Обновляем package.json
sed -i '' "s/your-username/$GITHUB_USERNAME/g" package.json
sed -i '' "s/willow-menu/$REPO_NAME/g" package.json

# Обновляем _config.yml
sed -i '' "s/your-username/$GITHUB_USERNAME/g" _config.yml
sed -i '' "s/willow-menu/$REPO_NAME/g" _config.yml

print_success "URL-ы обновлены!"

# Шаг 6: Инициализация Git репозитория
print_step "Инициализируем Git репозиторий..."

if [[ -d ".git" ]]; then
    print_warning "Git репозиторий уже существует. Пропускаем инициализацию."
else
    git init
    print_success "Git репозиторий инициализирован!"
fi

# Добавляем файлы
git add .

# Коммит
git commit -m "Initial commit: Willow Cafe Menu

🎨 Features:
- Liquid glass animated background
- Multilingual support (EN/RU/SR)
- Live Google Sheets integration
- Responsive design
- Auto-refresh menu updates

🚀 Ready for GitHub Pages hosting

Co-authored-by: Claude <noreply@anthropic.com>"

print_success "Файлы добавлены и коммит создан!"

# Шаг 7: Создание GitHub репозитория
if [[ "$USE_GH_CLI" == true ]]; then
    print_step "Создаем репозиторий на GitHub..."
    
    if gh repo create "$REPO_NAME" --public --description "Willow Cafe multilingual menu with live Google Sheets integration" --push; then
        print_success "Репозиторий создан и код загружен!"
        REPO_CREATED=true
    else
        print_error "Ошибка создания репозитория через GitHub CLI"
        REPO_CREATED=false
    fi
else
    print_step "Подготавливаем команды для ручного создания репозитория..."
    REPO_CREATED=false
fi

# Шаг 8: Инструкции для ручного создания (если нужно)
if [[ "$REPO_CREATED" == false ]]; then
    echo ""
    print_warning "Создайте репозиторий вручную:"
    echo -e "${YELLOW}1. Перейдите на https://github.com${NC}"
    echo -e "${YELLOW}2. Нажмите 'New repository'${NC}"
    echo -e "${YELLOW}3. Название: $REPO_NAME${NC}"
    echo -e "${YELLOW}4. Сделайте публичным${NC}"
    echo -e "${YELLOW}5. НЕ добавляйте README, .gitignore или LICENSE${NC}"
    echo -e "${YELLOW}6. Нажмите 'Create repository'${NC}"
    echo ""
    
    print_step "После создания репозитория выполните:"
    echo -e "${CYAN}git remote add origin https://github.com/$GITHUB_USERNAME/$REPO_NAME.git${NC}"
    echo -e "${CYAN}git branch -M main${NC}"
    echo -e "${CYAN}git push -u origin main${NC}"
    echo ""
    
    # Добавляем remote если репозиторий не создан автоматически
    echo -n "Нажмите Enter после создания репозитория на GitHub..."
    read
    
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    git branch -M main
    git push -u origin main
    
    print_success "Код загружен на GitHub!"
fi

# Шаг 9: Настройка GitHub Pages
echo ""
print_step "Настройка GitHub Pages:"
echo -e "${YELLOW}1. Перейдите на https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo -e "${YELLOW}2. Нажмите 'Settings' (справа вверху)${NC}"
echo -e "${YELLOW}3. В боковом меню найдите 'Pages'${NC}"
echo -e "${YELLOW}4. В разделе 'Source' выберите 'GitHub Actions'${NC}"
echo -e "${YELLOW}5. Дождитесь завершения деплоя (2-5 минут)${NC}"

# Шаг 10: Финальная информация
echo ""
print_success "🎉 ГОТОВО! Ваш сайт будет доступен по адресу:"
echo -e "${GREEN}📱 https://$GITHUB_USERNAME.github.io/$REPO_NAME/${NC}"
echo ""

print_info "📊 Проверьте статус деплоя:"
echo -e "${CYAN}https://github.com/$GITHUB_USERNAME/$REPO_NAME/actions${NC}"
echo ""

print_info "📋 Полезные ссылки:"
echo -e "${CYAN}🔗 Репозиторий: https://github.com/$GITHUB_USERNAME/$REPO_NAME${NC}"
echo -e "${CYAN}⚙️  Настройки Pages: https://github.com/$GITHUB_USERNAME/$REPO_NAME/settings/pages${NC}"
echo -e "${CYAN}📊 Google Таблица: https://docs.google.com/spreadsheets/d/1BRQuzea6bba0NxxPk9koLSzpHkfiAzrKmwDa8ow7128/${NC}"
echo ""

print_success "🍃 Willow Cafe Menu успешно развернуто!"
print_info "Изменения в Google Таблице автоматически появятся на сайте в течение 5 минут."

# Открыть браузер с репозиторием (опционально)
echo -n "Открыть репозиторий в браузере? (y/n): "
read OPEN_BROWSER
if [[ "$OPEN_BROWSER" =~ ^[Yy]$ ]]; then
    open "https://github.com/$GITHUB_USERNAME/$REPO_NAME"
fi

echo ""
echo -e "${PURPLE}╔══════════════════════════════════════════════════════════╗"
echo -e "║                    ✨ ДЕПЛОЙ ЗАВЕРШЕН ✨                 ║"
echo -e "╚══════════════════════════════════════════════════════════╝${NC}"