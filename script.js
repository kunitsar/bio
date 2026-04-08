document.addEventListener('DOMContentLoaded', () => {
    const backgroundContainer = document.getElementById('backgroundContainer');
    const avatarImage = document.getElementById('avatarImage');
    const audioPlayer = document.getElementById('audioPlayer');
    const weatherCanvas = document.getElementById('weatherCanvas');
    const ctx = weatherCanvas.getContext('2d');

    const settingsToggle = document.getElementById('settingsToggle');
    const settingsPanel = document.getElementById('settingsPanel');

    const uploadBackgroundInput = document.getElementById('uploadBackground');
    const uploadAvatarInput = document.getElementById('uploadAvatar');
    const uploadMusicInput = document.getElementById('uploadMusic');
    const toggleWeatherButton = document.getElementById('toggleWeather');
    const saveSettingsButton = document.getElementById('saveSettings');
    const resetSettingsButton = document.getElementById('resetSettings');

    let weatherEffect = null; // 'snow' or 'rain' or null
    let animationFrameId = null; // Для остановки/запуска анимации погоды
    let particles = [];
    let particleCount = 100;

    // --- Функции для сохранения/загрузки настроек ---
    function saveSettings() {
        const settings = {
            backgroundImage: backgroundContainer.style.backgroundImage,
            avatarSrc: avatarImage.src,
            musicSrc: audioPlayer.src,
            weatherEffect: weatherEffect
        };
        localStorage.setItem('websiteSettings', JSON.stringify(settings));
        alert('Настройки сохранены!');
    }

    function loadSettings() {
        const savedSettings = localStorage.getItem('websiteSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);

            if (settings.backgroundImage) {
                backgroundContainer.style.backgroundImage = settings.backgroundImage;
            }
            if (settings.avatarSrc) {
                avatarImage.src = settings.avatarSrc;
            }
            if (settings.musicSrc) {
                audioPlayer.src = settings.musicSrc;
            }
            if (settings.weatherEffect) {
                weatherEffect = settings.weatherEffect;
                toggleWeather(true); // Применяем эффект
            }
        }
    }

    function resetSettings() {
        localStorage.removeItem('websiteSettings');
        alert('Настройки сброшены! Перезагрузите страницу.');
        // Для полного сброса нужно перезагрузить страницу или вручную сбросить все DOM-элементы
        // location.reload();
    }

    // --- Функции для управления фоном, аватаром, музыкой ---
    function handleFileUpload(inputElement, targetElement, property = 'src') {
        inputElement.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    if (property === 'src') {
                        targetElement.src = e.target.result;
                    } else if (property === 'backgroundImage') {
                        targetElement.style.backgroundImage = url('${e.target.result}');
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Привязываем загрузку файлов к элементам
    handleFileUpload(uploadBackgroundInput, backgroundContainer, 'backgroundImage');
    handleFileUpload(uploadAvatarInput, avatarImage, 'src');
    handleFileUpload(uploadMusicInput, audioPlayer, 'src');

    // --- Функции для эффектов погоды (снег/дождь) ---
    function resizeCanvas() {
        weatherCanvas.width = window.innerWidth;
        weatherCanvas.height = window.innerHeight;
        // При изменении размера, если эффект активен, пересоздаем частицы
        if (weatherEffect) {
            createParticles();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.
random() * weatherCanvas.width,
                y: Math.random() * weatherCanvas.height,
                size: Math.random() * 2 + 1, // Размер от 1 до 3
                speedX: (weatherEffect === 'rain') ? Math.random() * 2 - 1 : 0, // Небольшой горизонтальный дрейф для дождя
                speedY: (weatherEffect === 'rain') ? Math.random() * 8 + 5 : Math.random() * 3 + 1, // Скорость
                opacity: Math.random() * 0.5 + 0.3 // Прозрачность
            });
        }
    }

    function drawWeather() {
        if (!weatherEffect) {
            return;
        }

        ctx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;

            // Если частица ушла за пределы, возвращаем ее наверх
            if (p.y > weatherCanvas.height) {
                p.y = -p.size;
                p.x = Math.random() * weatherCanvas.width;
            }
            if (p.x < -p.size || p.x > weatherCanvas.width + p.size) {
                p.x = Math.random() * weatherCanvas.width;
            }

            ctx.beginPath();
            if (weatherEffect === 'snow') {
                ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2, false);
                ctx.fillStyle = rgba(255, 255, 255, ${p.opacity});
            } else if (weatherEffect === 'rain') {
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.speedX * 2, p.y + p.speedY * 2); // Линия для капли
                ctx.strokeStyle = rgba(173, 216, 230, ${p.opacity}); // Светло-голубой
                ctx.lineWidth = p.size / 2;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(drawWeather);
    }

    function toggleWeather(forceEffect = false) {
        if (forceEffect && weatherEffect) {
             // Если принудительно устанавливаем эффект при загрузке
            createParticles();
            if (!animationFrameId) {
                drawWeather();
            }
            toggleWeatherButton.textContent = Disable ${weatherEffect.charAt(0).toUpperCase() + weatherEffect.slice(1)};
            toggleWeatherButton.querySelector('i').className = (weatherEffect === 'snow') ? 'fas fa-snowflake' : 'fas fa-cloud-showers-heavy';
            return;
        }


        if (weatherEffect === 'snow') {
            weatherEffect = 'rain';
            toggleWeatherButton.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i> Toggle Rain';
        } else if (weatherEffect === 'rain') {
            weatherEffect = null;
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            ctx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height); // Очищаем канвас
            toggleWeatherButton.innerHTML = '<i class="fas fa-snowflake"></i> Toggle Snow';
        } else {
            weatherEffect = 'snow';
            toggleWeatherButton.innerHTML = '<i class="fas fa-snowflake"></i> Toggle Snow';
        }

        if (weatherEffect) {
            createParticles();
            if (!animationFrameId) { // Запускаем анимацию, если она не запущена
                drawWeather();
            }
        } else {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            ctx.clearRect(0, 0, weatherCanvas.width, weatherCanvas.height); // Очищаем канвас
        }
    }

    // --- Обработчики событий ---
    settingsToggle.addEventListener('click', () => {
        settingsPanel.classList.toggle('open');
    });

    toggleWeatherButton.addEventListener('click', () => toggleWeather());
    saveSettingsButton.addEventListener('click', saveSettings);
    resetSettingsButton.addEventListener('click', resetSettings);

    // Инициализация
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Устанавливаем размер канваса при загрузке
    loadSettings(); // Загружаем настройки
});
