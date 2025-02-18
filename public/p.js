const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let lapCount = 1;

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const milliseconds = Math.floor((elapsedTime / 100) % 10);
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(1, '0')}`;

  timerDisplay.textContent = formattedTime;
}

startBtn.addEventListener('click', () => {
  if (!timerInterval) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  }
});

pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  timerDisplay.textContent = '00:00:00.0';
  lapsList.innerHTML = ''; // Clear lap list
  lapCount = 1;
});

lapBtn.addEventListener('click', () => {
  const currentTime = timerDisplay.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCount}: ${currentTime}`;
  lapsList.appendChild(lapItem);
  lapCount++;
});