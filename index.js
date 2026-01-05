let time = 0;
let isRunning = false;
let intervalId = null;
let startTime = 0;
let bestScore = null;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resultDiv = document.getElementById('result');
const bestScoreDiv = document.getElementById('bestScore');
const bestScoreValue = document.getElementById('bestScoreValue');

function formatTime(milliseconds) {
    return (milliseconds / 1000).toFixed(2);
}

function updateTimer() {
    const elapsed = Date.now() - startTime;
    time = elapsed;
    timerDisplay.textContent = formatTime(time);
}

function handleStart() {
    time = 0;
    resultDiv.innerHTML = '';
    isRunning = true;
    
    startTime = Date.now();
    intervalId = setInterval(updateTimer, 10);
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function handleStop() {
    isRunning = false;
    clearInterval(intervalId);
    
    const elapsed = time / 1000;
    let resultMessage = '';
    let emoji = '';
    
    if (elapsed >= 9.99 && elapsed <= 10.01) {
        emoji = '';
        resultMessage = 'عشان ما تزعل ربحت معنا مبرووك ';
        
        if (bestScore === null || Math.abs(elapsed - 10) < Math.abs(bestScore - 10)) {
            bestScore = elapsed;
            bestScoreValue.textContent = formatTime(bestScore * 1000);
            bestScoreDiv.classList.add('show');
        }
    } else if (elapsed >= 9.70 && elapsed <= 10.02) {
        emoji = '';
        resultMessage = '  قرررربتتتت لكن ما ربحت ';
    } else if (elapsed >= 9.50 && elapsed <= 10.50) {
        emoji = '';
        resultMessage = 'بدك فت خبز   ';
    } else {
        emoji = '';
        const diff = Math.abs(10 - elapsed);
        resultMessage = `الفرق ${diff.toFixed(2)} ثانية بسس`;
    }
    
    resultDiv.innerHTML = `<p>${emoji} ${resultMessage}</p>`;
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

startBtn.addEventListener('click', handleStart);
stopBtn.addEventListener('click', handleStop);


