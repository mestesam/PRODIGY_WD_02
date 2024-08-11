let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime;
let running = false;
let lapNumber = 1;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapResetBtn = document.getElementById('lapResetBtn');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('running');
        lapResetBtn.textContent = 'Lap';
        running = true;
    } else {
        clearInterval(tInterval);
        savedTime = difference;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('running');
        lapResetBtn.textContent = 'Reset';
        running = false;
    }
}

function lapReset() {
    if (running) {
        let lapTime = display.textContent;
        const lapDiv = document.createElement('div');
        lapDiv.className = 'lap';
        lapDiv.innerHTML = `Lap ${lapNumber++}: ${lapTime}`;
        lapsContainer.prepend(lapDiv); // Adds new laps to the top for better visibility
        lapDiv.style.opacity = 0;
        lapDiv.style.transform = 'translateX(-100px)';
        setTimeout(() => {
            lapDiv.style.opacity = 1;
            lapDiv.style.transform = 'translateX(0)';
        }, 10); // Smooth transition for new lap entry
    } else {
        while (lapsContainer.firstChild) {
            lapsContainer.removeChild(lapsContainer.firstChild);
        }
        display.textContent = '00:00:00';
        savedTime = 0;
        lapNumber = 1;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = (updatedTime - startTime) + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    display.textContent = hours + ':' + minutes + ':' + seconds;
}

startStopBtn.addEventListener('click', startStop);
lapResetBtn.addEventListener('click', lapReset);