let intervalId = null;

document.getElementById('mainheading').addEventListener('mouseover', function () {
    intervalId = setInterval(createFireworksAroundBanner, 50);
});

document.getElementById('mainheading').addEventListener('mouseout', function () {
    clearInterval(intervalId);
});

function createFireworksAroundBanner() {
    const bannerArea = document.getElementById('bannerArea');
    const bannerRect = bannerArea.getBoundingClientRect();

    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.backgroundColor = getRandomColor();
    firework.style.width = firework.style.height = `${Math.random() * 25 + 5}px`;

    const randomX = Math.random() * bannerRect.width;
    const randomY = Math.random() * bannerRect.height;

    firework.style.left = `${bannerRect.left + randomX}px`;
    firework.style.top = `${bannerRect.top + randomY}px`;
    firework.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(firework);

    setTimeout(() => firework.remove(), 1500);
}

function getRandomColor() {
    const colors = ['#ff5733', '#33ff57', '#3357ff', '#f3ff33', '#ff33f3', '#ff5733', '#57ff33'];
    return colors[Math.floor(Math.random() * colors.length)];
}