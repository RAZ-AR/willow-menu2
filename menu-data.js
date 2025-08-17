/**
 * Google Sheets Integration - Production Ready
 * Direct CSV loading without API keys
 * Optimized for GitHub Pages hosting
 */

// Google Sheets Configuration  
const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: '1BRQuzea6bba0NxxPk9koLSzpHkfiAzrKmwDa8ow7128',
    cacheDuration: 5 * 60 * 1000 // 5 минут кеша
};

// Cache for menu data
let menuDataCache = {
    data: null,
    timestamp: 0
};

// Function to fetch data from public Google Sheets (CSV format)
async function fetchFromGoogleSheets() {
    // Несколько вариантов URL для попытки загрузки
    const urls = [
        // Публичная CSV ссылка
        `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/export?format=csv&gid=0`,
        // Альтернативная ссылка с заголовками CORS
        `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/gviz/tq?tqx=out:csv&gid=0`,
        // Еще один вариант
        `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/export?exportFormat=csv&gid=0`
    ];
    
    for (let i = 0; i < urls.length; i++) {
        const url = urls[i];
        console.log(`Попытка загрузки из URL ${i + 1}:`, url);
        
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'text/csv,text/plain,*/*'
                },
                mode: 'cors'
            });
            
            if (!response.ok) {
                console.log(`URL ${i + 1} failed with status:`, response.status);
                continue;
            }
            
            const csvText = await response.text();
            console.log(`Успешно загружено из URL ${i + 1}, размер:`, csvText.length);
            console.log('Первые 200 символов:', csvText.substring(0, 200));
            
            const parsedData = parseCSV(csvText);
            if (parsedData && parsedData.length > 0) {
                return parsedData;
            }
        } catch (error) {
            console.log(`Ошибка с URL ${i + 1}:`, error.message);
        }
    }
    
    console.error('Все попытки загрузки из Google Sheets неудачны');
    
    // Последняя попытка через CORS proxy (если нужно)
    try {
        console.log('Попытка через CORS proxy...');
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_CONFIG.spreadsheetId}/export?format=csv&gid=0`)}`;
        
        const response = await fetch(proxyUrl);
        if (response.ok) {
            const data = await response.json();
            if (data.contents) {
                console.log('Успешно загружено через CORS proxy');
                const parsedData = parseCSV(data.contents);
                if (parsedData && parsedData.length > 0) {
                    return parsedData;
                }
            }
        }
    } catch (error) {
        console.log('CORS proxy также не сработал:', error.message);
    }
    
    return null;
}

// Function to parse CSV data
function parseCSV(csvText) {
    const lines = csvText.split('\n');
    const result = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Простой парсер CSV (обрабатывает запятые в кавычках)
        const row = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                row.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        
        // Добавляем последнее поле
        row.push(current.trim());
        result.push(row);
    }
    
    return result;
}

// Function to parse raw sheet data into menu format
function parseSheetData(rawData) {
    if (!rawData || rawData.length === 0) return [];
    
    console.log('Парсинг данных, всего строк:', rawData.length);
    
    const menuItems = [];
    let startIndex = 0;
    
    // Находим начало данных (пропускаем заголовки)
    for (let i = 0; i < rawData.length; i++) {
        const row = rawData[i];
        if (row && row.length >= 6 && 
            row[0] && 
            !row[0].toLowerCase().includes('категория') &&
            !row[0].toLowerCase().includes('category')) {
            startIndex = i;
            break;
        }
    }
    
    console.log('Начало данных с строки:', startIndex);
    if (startIndex < rawData.length) {
        console.log('Первая строка данных:', rawData[startIndex]);
    }
    
    // Обрабатываем все строки с данными
    for (let i = startIndex; i < rawData.length; i++) {
        const row = rawData[i];
        
        // Пропускаем пустые строки
        if (!row || row.length === 0 || !row[0] || row[0].trim() === '') continue;
        
        // Очищаем данные от лишних кавычек и пробелов
        const cleanRow = row.map(cell => {
            if (typeof cell === 'string') {
                return cell.replace(/^"(.*)"$/, '$1').trim();
            }
            return cell ? cell.toString().trim() : '';
        });
        
        // Структура вашей таблицы: Категория, Английский, Русский, Сербский, Объем, Стоимость, Состав
        const menuItem = {
            category: cleanRow[0] || '',
            names: {
                en: cleanRow[1] || '',
                ru: cleanRow[2] || '',
                sr: cleanRow[3] || ''
            },
            volume: cleanRow[4] || '',
            price: cleanRow[5] || '0',
            composition: cleanRow[6] || 'composition'
        };
        
        // Добавляем только корректные элементы (должны быть категория и хотя бы одно название)
        if (menuItem.category && 
            menuItem.category !== 'категория' && 
            menuItem.category !== 'category' && 
            (menuItem.names.en || menuItem.names.ru || menuItem.names.sr)) {
            
            console.log(`✅ Добавлен: [${menuItem.category}] ${menuItem.names.en || menuItem.names.ru || menuItem.names.sr} - ${menuItem.price} RSD`);
            menuItems.push(menuItem);
        }
    }
    
    console.log(`🎉 Обработано ${menuItems.length} пунктов меню`);
    
    // Показать уникальные категории
    const categories = [...new Set(menuItems.map(item => item.category))];
    console.log('📋 Найденные категории:', categories);
    
    return menuItems;
}

// Function to load menu with caching
async function loadMenuFromGoogleSheets(forceRefresh = false) {
    const now = Date.now();
    
    // Проверяем кеш
    if (!forceRefresh && 
        menuDataCache.data && 
        (now - menuDataCache.timestamp) < GOOGLE_SHEETS_CONFIG.cacheDuration) {
        console.log('Загружаю данные из кеша');
        return menuDataCache.data;
    }
    
    // Показываем индикатор загрузки
    console.log('Загружаю данные из Google Sheets...');
    
    try {
        // Пытаемся загрузить из Google Sheets
        const rawData = await fetchFromGoogleSheets();
        
        if (rawData) {
            const parsedData = parseSheetData(rawData);
            
            // Обновляем кеш
            menuDataCache = {
                data: parsedData,
                timestamp: now
            };
            
            console.log(`Загружено ${parsedData.length} элементов меню`);
            return parsedData;
        } else {
            throw new Error('Не удалось получить данные из Google Sheets');
        }
        
    } catch (error) {
        console.error('Ошибка загрузки меню:', error);
        
        // Возвращаем кешированные данные если есть
        if (menuDataCache.data) {
            console.log('Использую кешированные данные из-за ошибки');
            return menuDataCache.data;
        }
        
        // Возвращаем пустой массив или демо-данные
        console.log('Возвращаю демо-данные');
        return getDemoData();
    }
}

// Demo data for development/fallback (точно по структуре вашей Google Таблицы)
function getDemoData() {
    return [
        {
            category: "Coffee &",
            names: {
                en: "Espresso",
                ru: "Эспрессо",
                sr: "Еспресо"
            },
            volume: "S",
            price: "150",
            composition: "composition"
        },
        {
            category: "Coffee &",
            names: {
                en: "Espresso",
                ru: "Эспрессо",
                sr: "Еспресо"
            },
            volume: "L",
            price: "250",
            composition: "composition"
        },
        {
            category: "Coffee &",
            names: {
                en: "Americano",
                ru: "Американо",
                sr: "Американо"
            },
            volume: "S",
            price: "150",
            composition: "composition"
        },
        {
            category: "Coffee &",
            names: {
                en: "Americano",
                ru: "Американо",
                sr: "Американо"
            },
            volume: "L",
            price: "270",
            composition: "composition"
        },
        {
            category: "Coffee &",
            names: {
                en: "Cappuccino",
                ru: "Капучино",
                sr: "Капучино"
            },
            volume: "S",
            price: "200",
            composition: "composition"
        },
        {
            category: "Coffee &",
            names: {
                en: "Latte",
                ru: "Латте",
                sr: "Лате"
            },
            volume: "S",
            price: "320",
            composition: "composition"
        },
        {
            category: "Coffee &",
            names: {
                en: "Flat White",
                ru: "Флэт уайт",
                sr: "Флет вајт"
            },
            volume: "S",
            price: "380",
            composition: "composition"
        },
        {
            category: "Coffee &",
            names: {
                en: "Iced Americano",
                ru: "Айс американо",
                sr: "Ајс американо"
            },
            volume: "L",
            price: "300",
            composition: "composition"
        }
    ];
}

// Function to refresh menu data
async function refreshMenuData() {
    return await loadMenuFromGoogleSheets(true);
}