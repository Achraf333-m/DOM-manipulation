const timerMinutes = document.querySelector(".timer__minutes");
const timerSeconds = document.querySelector(".timer__seconds");
const timerMilliseconds = document.querySelector(".timer__milliseconds");

const startButton = document.querySelector('.stopwatch__start')
const pauseButton = document.querySelector('.stopwatch__stop')
const resetButton = document.querySelector('.stopwatch__reset')
// 25 mins in ms
const countdown = 25 * 60 * 1000 

let cancelId;
let time = 0;
let timer;
let savedTime = 0;
let timing;

function startCountDown() {
    startButton.disabled = true
    pauseButton.disabled = false
    resetButton.disabled = false
  timer = Date.now();

  cancelId = requestAnimationFrame(updateTimer);
}

function pauseCountDown() {
    startButton.disabled = false
    pauseButton.disabled = true
    resetButton.disabled = false
  savedTime += Date.now() - timer;
  cancelAnimationFrame(cancelId);
}

function resetCountDown() {
  if (timer > 0) {
    savedTime = 0;
    timer = Date.now();
    timerMinutes.innerHTML = "25";
    timerMilliseconds.innerHTML = "000";
    timerSeconds.innerHTML = "00";
  }
}

function updateTimer() {
  timing = countdown - time;
  time = savedTime + Date.now() - timer;

  if (timing < 0) {
    return resetCountDown()
  }
  let milliseconds = timing;
  let seconds = milliseconds / 1000;
  let minutes = seconds / 60;

  let Tminutes = Math.floor(minutes % 60)
  let Tseconds = Math.floor(seconds % 60)
  let Tmilliseconds = Math.floor(milliseconds % 1000)

  if (length(Tminutes) === 1) {
    Tminutes = '0' + Tminutes
  }

  if (length(Tmilliseconds) < 3) {
    Tmilliseconds = Tmilliseconds.toString().padStart(3, '0')
  }

  if (length(Tseconds) === 1) {
    Tseconds = '0' + Tseconds
  }

  timerMinutes.innerHTML = Tminutes;
  timerMilliseconds.innerHTML = Tmilliseconds;
  timerSeconds.innerHTML = Tseconds;

  cancelId = requestAnimationFrame(updateTimer);
}

const length = (num) => {
    return num.toString().length
}