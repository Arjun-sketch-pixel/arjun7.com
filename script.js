document.addEventListener('DOMContentLoaded', () => {
    // Add subtle tilt effect to card
    const card = document.querySelector('.card');

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });

    // Reset card position when mouse leaves window
    document.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
        card.style.transition = 'transform 0.5s ease';
    });

    // Remove transition when moving mouse to make it snappy
    document.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});
