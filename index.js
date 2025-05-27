let timeLeft = 25 * 60;
let timer = null;
let mode = 'pomodoro';
let savedTask = '';

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('time').textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        timer = null;
        document.getElementById('alarm').play();
        alert('Time is up!');
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  if (mode === 'pomodoro') timeLeft = 25 * 60;
  else if (mode === 'short') timeLeft = 5 * 60;
  else if (mode === 'long') timeLeft = 15 * 60;
  updateDisplay();
  document.getElementById('taskInput').value = '';
  savedTask = '';
  document.getElementById('taskDisplay').textContent = 'No task set.';
}

function setMode(newMode) {
  mode = newMode;
  resetTimer();
}

function saveTask() {
  const task = document.getElementById('taskInput').value.trim();
  const display = document.getElementById('taskDisplay');

  if (task) {
    savedTask = task;
    display.textContent = `Current Task: ${savedTask}`;
    document.getElementById('taskInput').value = '';
  } else {
    display.textContent = 'No task set.';
  }
}

 

function editTime() {
  const input = document.getElementById('editMinutes');
  let minutes = parseInt(input.value);

  if (!isNaN(minutes) && minutes > 0 && minutes <= 60) {
    timeLeft = minutes * 60;
    updateDisplay();
    input.value = '';
    clearInterval(timer);
    timer = null;
  } else {
    alert('Please enter a valid number between 1 and 60.');
  }
}

updateDisplay();
