// Get references to HTML elements
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');
const startTimerBtn = document.getElementById('startTimer');
const activeTimersSection = document.getElementById('activeTimers');

// Array to hold active timers
let timers = [];

// Function to start a new timer
function startNewTimer(hours, minutes, seconds) {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
    if (totalSeconds > 0) {
      const timer = {
        totalSeconds,
        intervalId: setInterval(() => {
          if (timer.totalSeconds <= 0) {
            clearInterval(timer.intervalId);
            handleTimerEnd(timer);
          } else {
            timer.totalSeconds--;
            updateTimerDisplay(timer);
          }
        }, 1000) // Update every second
      };
  
      timers.push(timer);
      displayActiveTimer(timer);
    } else {
      alert('Please enter a valid time.');
    }
  }
  
  //Function to display active timer
  function displayActiveTimer(timer) {
    const timerDiv = document.createElement('div');
    timerDiv.classList.add('active-timer');
    timerDiv.dataset.id = timer.intervalId; // Set data attribute for identification
    timerDiv.innerHTML = formatTime(timer.totalSeconds);
    
    const stopBtn = document.createElement('button');
    stopBtn.innerText = 'Stop Timer';
    stopBtn.addEventListener('click', () => stopTimer(timer));
  
    timerDiv.appendChild(stopBtn);
    activeTimersSection.appendChild(timerDiv);
  }

  
  // Function to update timer display
  function updateTimerDisplay(timer) {
    const timerDiv = activeTimersSection.querySelector(`[data-id="${timer.intervalId}"]`);
    if (timerDiv) {
      timerDiv.innerHTML = formatTime(timer.totalSeconds);
    }
  }

  
  // Function to handle timer end
  function handleTimerEnd(timer) {
    const timerDiv = activeTimersSection.querySelector(`[data-id="${timer.intervalId}"]`);
    if (timerDiv) {
      timerDiv.classList.add('timer-ended');
      timerDiv.innerHTML = 'Timer is up!'; // Show "Timer is up!" message
      setTimeout(() => {
        timerDiv.remove(); // Remove the timer display after some time
      }, 3000); // Change time as needed (3 seconds in this example)
    }
  }
  
  // Function to stop a timer
  function stopTimer(timer) {
    clearInterval(timer.intervalId);
    timers = timers.filter(t => t !== timer);
    const timerDiv = activeTimersSection.querySelector(`[data-id="${timer.intervalId}"]`);
    if (timerDiv) {
      timerDiv.remove();
    }
  }
  
  // Helper function to format time
  function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  
  // Event listener for starting a new timer
  startTimerBtn.addEventListener('click', () => {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
  
    startNewTimer(hours, minutes, seconds);
  });