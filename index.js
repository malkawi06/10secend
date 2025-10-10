let time = 0;
let isRunning = false;
let bestScore = null;
let interval = null;
let startTime = 0;
let qrTimeout = null;

// Audio elements
const clickSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZizcIGWi77eeeTRAMUKfj8LZjHAY4ktfzzXksBSR3x/DdkEAKFF606+uoVRQKRp/g8r5sIQUrgs/y2Yk3CBlou+3nnk0QDFC');
const dingSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAgICAgICAgICAgICAgICAgICCg4SFhoiJi4yOkJKUlZeZm52en6Gio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5ebn6Onq6+zt7u/w8fLz9PX29/j5+vv8/f7/');

// Elements
const timer = document.getElementById('timer');
const timerContainer = document.getElementById('timerContainer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const tryAgainBtn = document.getElementById('tryAgainBtn');
const result = document.getElementById('result');
const bestScoreContainer = document.getElementById('bestScoreContainer');
const bestScoreValue = document.getElementById('bestScoreValue');
const qrContainer = document.getElementById('qrContainer');

// Event Listeners
startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);
tryAgainBtn.addEventListener('click', handleTryAgain);

function handleStart() {
    time = 0;
    result.style.display = 'none';
    isRunning = true;
    startBtn.style.display = 'none';
    stopBtn.style.display = 'block';
    
    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    
    // Start timer
    startTime = Date.now();
    interval = setInterval(() => {
        time = Date.now() - startTime;
        updateTimer();
    }, 10);
}

function handleStop() {
    isRunning = false;
    clearInterval(interval);
    
    const elapsed = time / 1000;
    let resultMessage = "";
    let emoji = "";
    
    // Play ding sound if close to 10
    if (elapsed >= 9.5 && elapsed <= 10.5) {
        dingSound.currentTime = 0;
        dingSound.play().catch(() => {});
    }
    
    // Calculate result
    if (elapsed >= 9.90 && elapsed <= 10.10) {
        emoji = "🎯";
        resultMessage = "مثالي! دقة عالية";
        if (bestScore === null || Math.abs(elapsed - 10) < Math.abs(bestScore - 10)) {
            bestScore = elapsed;
            updateBestScore();
        }
    } else if (elapsed >= 9.70 && elapsed <= 10.30) {
        emoji = "👏";
        resultMessage = "قريب جداً!";
    } else if (elapsed >= 9.50 && elapsed <= 10.50) {
        emoji = "💪";
        resultMessage = "جيد! حاول مرة أخرى";
    } else {
        emoji = "⚠️";
        const diff = Math.abs(10 - elapsed);
        resultMessage = `فارق ${diff.toFixed(2)} ثانية`;
    }
    
    // Show result
    result.innerHTML = `<p class="result-text">${emoji} ${resultMessage}</p>`;
    result.style.display = 'block';
    
    stopBtn.style.display = 'none';
    tryAgainBtn.style.display = 'block';
    
    // Show QR code after 5 seconds
    qrTimeout = setTimeout(() => {
        qrContainer.style.display = 'block';
    }, 5000);
}

function handleTryAgain() {
    time = 0;
    result.style.display = 'none';
    qrContainer.style.display = 'none';
    tryAgainBtn.style.display = 'none';
    startBtn.style.display = 'block';
    timerContainer.classList.remove('scale-up');
    
    // Clear QR timeout
    if (qrTimeout) {
        clearTimeout(qrTimeout);
    }
    
    updateTimer();
}

function updateTimer() {
    const seconds = time / 1000;
    timer.textContent = seconds.toFixed(2);
    
    // Update color
    timer.className = 'timer';
    if (seconds < 8) {
        timer.classList.add('blue');
    } else if (seconds < 9.9) {
        timer.classList.add('yellow');
    } else if (seconds <= 10.1) {
        timer.classList.add('green');
    } else {
        timer.classList.add('red');
    }
    
    // Update scale
    if (seconds >= 9.8 && seconds <= 10.2) {
        timerContainer.classList.add('scale-up');
    } else {
        timerContainer.classList.remove('scale-up');
    }
}

function updateBestScore() {
    bestScoreContainer.style.display = 'block';
    bestScoreValue.textContent = (bestScore).toFixed(2);
}
