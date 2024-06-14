let coinCount = 0;

const logo = document.getElementById('logo');
const coinCounter = document.getElementById('coin-count');

logo.addEventListener('click', () => {
    coinCount++;
    coinCounter.textContent = coinCount;
    logo.classList.add('shake');
    setTimeout(() => {
        logo.classList.remove('shake');
    }, 500);
});

