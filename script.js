atri, [08.04.2026 16:55]
:root {
    --bg-color: #1a1a1a;
    --text-color: #e0e0e0;
    --accent-color: #00ff00; /* Зеленый как в терминале */
    --window-bg: #2b2b2b;
    --window-border: #444;
    --header-bg: #333;
}

body {
    font-family: 'Roboto Mono', monospace;
    background-color: var(--bg-color);
    color: var(--text-color);
    margin: 0;
    overflow: hidden; /* Чтобы окна не выходили за пределы */
}

.top-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-bg);
    padding: 8px 15px;
    border-bottom: 1px solid var(--window-border);
    font-size: 0.9em;
}

.user-info, .time-date, .social-links {
    color: var(--accent-color);
}

.social-links a {
    color: var(--text-color);
    text-decoration: none;
    margin-left: 15px;
}

.social-links a:hover {
    color: var(--accent-color);
}

#desktop {
    position: relative;
    width: 100vw;
    height: calc(100vh - 40px); /* Высота без учета панели */
}

.window {
    position: absolute;
    background-color: var(--window-bg);
    border: 1px solid var(--window-border);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    min-width: 300px;
    min-height: 150px;
    resize: both; /* Позволяет изменять размер окна */
    overflow: auto;
    left: 50px; /* Начальное положение */
    top: 50px;
    display: flex;
    flex-direction: column;
}

.window-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--header-bg);
    padding: 5px 10px;
    cursor: grab; /* Для перетаскивания */
    border-bottom: 1px solid var(--window-border);
}

.window-header span {
    font-weight: bold;
    color: var(--text-color);
}

.window-controls button {
    background: none;
    border: 1px solid var(--window-border);
    color: var(--text-color);
    padding: 2px 6px;
    margin-left: 5px;
    cursor: pointer;
}

.window-controls button:hover {
    background-color: var(--accent-color);
    color: var(--bg-color);
}

.window-content {
    padding: 10px;
    flex-grow: 1;
}

.terminal-input {
    display: flex;
    margin-top: 10px;
}

.prompt {
    color: var(--accent-color);
    margin-right: 5px;
}

#command-input {
    flex-grow: 1;
    background: none;
    border: none;
    color: var(--text-color);
    outline: none;
    caret-color: var(--accent-color); /* Цвет курсора */
}

atri, [08.04.2026 16:56]
querySelector('.window-content').style.display = 'block';
        });

        return newWindow;
    }

    // Пример использования createWindow
    // createWindow('new-text-editor', 'Text Editor', '<textarea style="width:100%; height:100%; background:none; border:none; color:inherit;"></textarea>');

    // Функция для смены темы
    function applyTheme(themeName) {
        const root = document.documentElement;
        if (themeName === 'dark-blue') {
            root.style.setProperty('--bg-color', '#0d1117');
            root.style.setProperty('--text-color', '#c9d1d9');
            root.style.setProperty('--accent-color', '#58a6ff');
            root.style.setProperty('--window-bg', '#161b22');
            root.style.setProperty('--window-border', '#30363d');
            root.style.setProperty('--header-bg', '#21262d');
        } else if (themeName === 'light') {
            root.style.setProperty('--bg-color', '#f0f0f0');
            root.style.setProperty('--text-color', '#333');
            root.style.setProperty('--accent-color', '#007bff');
            root.style.setProperty('--window-bg', '#fff');
            root.style.setProperty('--window-border', '#ccc');
            root.style.setProperty('--header-bg', '#eee');
        }
        // Добавь другие темы здесь
    }
});
