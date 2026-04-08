// Эффект небольшого наклона карточки при движении мыши
const card = document.querySelector('.glass-card');

document.addEventListener('mousemove', (e) => {
    let xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    let yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// Сброс при уходе мыши
document.addEventListener('mouseenter', () => {
    card.style.transition = "none";
});

document.addEventListener('mouseleave', () => {
    card.style.transition = "all 0.5s ease";
    card.style.transform = `rotateY(0deg) rotateX(0deg)`;
});
