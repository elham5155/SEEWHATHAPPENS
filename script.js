document.addEventListener('DOMContentLoaded', () => {
    const startMiningButton = document.getElementById('startMining');
    const walletAddressInput = document.getElementById('walletAddress');
    const walletAddressVisibleInput = document.getElementById('walletAddressVisibleInput');
    const walletInput = document.getElementById('walletInput');
    const statusElement = document.getElementById('status');
    const earnedBNBElement = document.getElementById('earnedBNB');
    const bnbLogo = document.getElementById('bnbLogo');
    const youtubeTask = document.getElementById('youtubeTask');
    const twitterTask = document.getElementById('twitterTask');
    const referralTask = document.getElementById('referralTask');
    const cryptoBackground = document.querySelector('.crypto-background');

    let isMining = false;
    let earnedBNB = 0;
    let miningInterval;
    let totalEarnedUSDT = 0;

    // Fetch BNB logo dynamically (replace with your logo URL)
    const logoURL = 'https://example.com/your-logo.png'; // Replace with your actual logo URL
    fetch(logoURL)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            bnbLogo.src = url;
        });

    // Generate random cryptocurrency elements
    const numCryptos = 10; // Number of cryptocurrency elements

    for (let i = 0; i < numCryptos; i++) {
        const crypto = document.createElement('div');
        crypto.classList.add('crypto');
        crypto.classList.add(getRandomCryptoClass());
        crypto.style.left = `${getRandomPosition()}%`;
        crypto.style.animationDelay = `${getRandomDelay()}s`;
        cryptoBackground.appendChild(crypto);
    }

    function getRandomCryptoClass() {
        const classes = ['btc', 'eth']; // Add more classes as needed
        return classes[Math.floor(Math.random() * classes.length)];
    }

    function getRandomPosition() {
        return Math.random() * 100; // Random position across the width of the screen
    }

    function getRandomDelay() {
        return Math.random() * 20; // Random animation delay between 0 and 20 seconds
    }

    bnbLogo.addEventListener('click', () => {
        if (isMining && totalEarnedUSDT < 10) {
            earnedBNB += 0.00001;
            earnedBNBElement.textContent = earnedBNB.toFixed(4);
            totalEarnedUSDT += 0.00001;
            checkHourlyLimit();
        }
    });

    startMiningButton.addEventListener('click', () => {
        const walletAddress = walletAddressInput.value.trim();

        if (!walletAddress) {
            alert('Please enter a valid BEP20 wallet address.');
            return;
        }

        if (isMining) {
            stopMining();
        } else {
            startMining(walletAddress);
        }
    });

    youtubeTask.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action of anchor tag
        if (isMining) {
            totalEarnedUSDT += 5;
            checkWalletAddressVisibility();
        }
    });

    twitterTask.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action of anchor tag
        if (isMining) {
            totalEarnedUSDT += 5;
            checkWalletAddressVisibility();
        }
    });

    referralTask.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default action of anchor tag
        if (isMining) {
            totalEarnedUSDT += 5;
            checkWalletAddressVisibility();
        }
    });

    function checkWalletAddressVisibility() {
        if (totalEarnedUSDT >= 100) {
            walletInput.style.display = 'none';
            walletAddressVisibleInput.value = walletAddressInput.value;
            walletAddressVisibleInput.style.display = 'block';
        }
    }

    function checkHourlyLimit() {
        if (totalEarnedUSDT >= 10) {
            // Disable logo tapping once hourly limit is reached
            bnbLogo.removeEventListener('click', handleClick);
            alert('Hourly limit reached. Please try again later.');
        }
    }

    function startMining(walletAddress) {
        isMining = true;
        startMiningButton.textContent = 'Stop Mining';
        statusElement.textContent = 'Mining...';

        miningInterval = setInterval(() => {
            earnedBNB += parseFloat((Math.random() * 0.0001).toFixed(4));
            earnedBNBElement.textContent = earnedBNB.toFixed(4);

            // Check if earnedBNB reaches 1 BNB
            if (earnedBNB >= 1) {
                stopMining();
                alert('You have mined 1 BNB! Now you can enter your wallet address.');
                walletInput.style.display = 'block'; // Show wallet address input
            }
        }, 1000);
    }

    function stopMining() {
        isMining = false;
        startMiningButton.textContent = 'Start Mining';
        statusElement.textContent = 'Not Mining';
        clearInterval(miningInterval);
    }
});

