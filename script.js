document.addEventListener('DOMContentLoaded', () => {
    const datetimeElement = document.getElementById('datetime');

    function updateDateTime() {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'short',
            month: 'short',
            day: '2-digit'
        };
        const formattedDate = now.toLocaleString('en-US', options); // 'Fri Nov 29'
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }); // '16:40'

        // Форматируем как "16:40 Fri Nov 29"
        // Разделяем на части и собираем в нужном порядке
        const parts = formattedDate.split(', '); // Например: ["Fri", "Nov 29", "16:40"]
        const finalString = ${time} ${parts[0]} ${parts[1]};

        datetimeElement.textContent = finalString;
    }

    // Обновляем время сразу и затем каждую секунду
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Дополнительно: Можно добавить обработчики для кнопок управления окном,
    // но в данном случае они будут просто заглушками, так как окно одно и фиксировано.
    // Например, для кнопки "close" можно просто спрятать окно:
    // const closeBtn = document.querySelector('.close-btn');
    // const terminalWindow = document.querySelector('.terminal-window');
    // if (closeBtn && terminalWindow) {
    //     closeBtn.addEventListener('click', () => {
    //         terminalWindow.style.display = 'none';
    //     });
    // }
});
