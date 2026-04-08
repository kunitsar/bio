document.addEventListener('DOMContentLoaded', () => {
    // Плавный скролл для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Опционально: Анимированные частицы на заднем плане (пример с Canvas)
    // Эта часть сложнее и может быть реализована как отдельный компонент или библиотека.
    // Пример простой реализации:
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1'; // Под контентом
        heroSection.appendChild(canvas);

        let particles = [];
        const numParticles = 100;

        function resizeCanvas() {
            canvas.width = heroSection.clientWidth;
            canvas.height = heroSection.clientHeight;
            createParticles(); // Пересоздаем частицы при изменении размера
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5, // 0.5 to 2
                    color: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2}), // Полупрозрачные белые звезды
                    speed: Math.random() * 0.5 + 0.1 // Медленное движение
                });
            }
        }

        function animateParticles() {
            requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.y += p.speed;
                if (p.y > canvas.height) {
                    p.y = 0; // Возвращаем частицу наверх
                    p.x = Math.random() * canvas.width; // Случайное X
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas(); // Инициализация
        animateParticles();
    }
});
