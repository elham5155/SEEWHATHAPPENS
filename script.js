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

    let isMining = false;
    let earnedBNB = 0;
    let miningInterval;
    let totalEarnedUSDT = 0;

    // Fetch BNB logo dynamically
    fetch('https://cryptologos.cc/logos/binance-coin-bnb-logo.png')
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            bnbLogo.src = url;
        });

    bnbLogo.addEventListener('click', () => {
        if (isMining && totalEarnedUSDT < 10) {
            earnedBNB += 0.0000000001;
            earnedBNBElement.textContent = earnedBNB.toFixed(4);
            totalEarnedUSDT += 0.00000001;
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

    youtubeTask.addEventListener('click', () => {
        if (isMining) {
            totalEarnedUSDT += 5;
            checkWalletAddressVisibility();
        }
    });

    twitterTask.addEventListener('click', () => {
        if (isMining) {
            totalEarnedUSDT += 5;
            checkWalletAddressVisibility();
        }
    });

    referralTask.addEventListener('click', () => {
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
            earnedBNB += parseFloat((Math.random() * 0.00000001).toFixed(4));
            earnedBNBElement.textContent = earnedBNB.toFixed(4);
        }, 1000);
    }

    function stopMining() {
        isMining = false;
        startMiningButton.textContent = 'Start Mining';
        statusElement.textContent = 'Not Mining';
        clearInterval(miningInterval);
    }
});
