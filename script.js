let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${minutes}:${seconds}.${milliseconds}`;
}

startStopBtn.addEventListener('click', () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Stop';
    running = true;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    running = false;
  }
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = '00:00.000';
  laps.innerHTML = '';
  startStopBtn.textContent = 'Start';
  running = false;
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const li = document.createElement('li');
    li.textContent = formatTime(elapsedTime);
    laps.appendChild(li);
  }
});
