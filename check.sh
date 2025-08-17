#!/bin/bash

# 🔍 Проверка готовности системы для запуска setup.sh

# Цвета
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 Проверка готовности системы...${NC}"
echo ""

# Проверка macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}❌ Этот скрипт предназначен для macOS${NC}"
    exit 1
fi
echo -e "${GREEN}✅ macOS обнаружен${NC}"

# Проверка файлов проекта
required_files=("index.html" "styles.css" "script.js" "menu-data.js" "translations.js" "logo.svg")
missing_files=()

for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        missing_files+=("$file")
    fi
done

if [[ ${#missing_files[@]} -gt 0 ]]; then
    echo -e "${RED}❌ Отсутствуют файлы: ${missing_files[*]}${NC}"
    echo -e "${YELLOW}📁 Убедитесь, что вы находитесь в папке: /Users/bari/Documents/GitHub/MENU/${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Все файлы проекта найдены${NC}"

# Проверка Git
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git не установлен${NC}"
    echo -e "${YELLOW}📥 Установите Git: https://git-scm.com/download/mac${NC}"
    echo -e "${YELLOW}    Или через Homebrew: brew install git${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git установлен: $(git --version)${NC}"

# Проверка GitHub CLI (опционально)
if command -v gh &> /dev/null; then
    echo -e "${GREEN}✅ GitHub CLI установлен: $(gh --version | head -n1)${NC}"
    echo -e "${BLUE}ℹ️  Будет использоваться автоматическое создание репозитория${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub CLI не установлен${NC}"
    echo -e "${BLUE}ℹ️  Репозиторий нужно будет создать вручную${NC}"
    echo -e "${BLUE}   Установка (опционально): brew install gh${NC}"
fi

# Проверка интернет соединения
if ping -c 1 github.com &> /dev/null; then
    echo -e "${GREEN}✅ Соединение с GitHub доступно${NC}"
else
    echo -e "${RED}❌ Нет соединения с GitHub${NC}"
    echo -e "${YELLOW}🌐 Проверьте интернет соединение${NC}"
    exit 1
fi

# Проверка Google Sheets доступности
echo -e "${BLUE}🔍 Проверяем доступность Google Таблицы...${NC}"
if curl -s "https://docs.google.com/spreadsheets/d/1BRQuzea6bba0NxxPk9koLSzpHkfiAzrKmwDa8ow7128/export?format=csv" > /dev/null; then
    echo -e "${GREEN}✅ Google Таблица доступна${NC}"
else
    echo -e "${YELLOW}⚠️  Не удалось проверить Google Таблицу (возможно, нужен VPN)${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Система готова к запуску!${NC}"
echo -e "${BLUE}▶️  Запустите: ./setup.sh${NC}"
echo ""

# Проверка прав на выполнение
if [[ ! -x "setup.sh" ]]; then
    echo -e "${YELLOW}⚠️  Добавляем права на выполнение для setup.sh...${NC}"
    chmod +x setup.sh
    echo -e "${GREEN}✅ Права добавлены${NC}"
fi

echo -e "${BLUE}📋 Что будет происходить:${NC}"
echo "   1. Проверка Git конфигурации"
echo "   2. Обновление URL-ов в файлах"
echo "   3. Создание Git репозитория"
echo "   4. Создание репозитория на GitHub"
echo "   5. Загрузка файлов"
echo "   6. Настройка GitHub Pages"
echo ""
echo -e "${GREEN}⏱️  Время выполнения: ~2-3 минуты${NC}"