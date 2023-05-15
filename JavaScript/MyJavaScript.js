// Get the DOM elements
const endDate = document.querySelector("input[name='endDate']");
const clock = document.querySelector(".clock");

// Initialize variables
let timeInterval;
let timeStop = true;

// Check if there is a saved value in local storage
const saveValue = localStorage.getItem("countDown") || false;
if (saveValue) {
  startClock(saveValue);
  let inputValue = new Date(saveValue);
  endDate.valueAsDate = inputValue;
}

// Event listener for date change
endDate.addEventListener("change", function (e) {
  e.preventDefault();
  
  // Clear the previous interval
  clearInterval(timeInterval);
  
  // Get the new date from the input field
  const temp = new Date(endDate.value);
  
  // Save the new date to local storage
  localStorage.setItem("countdown", temp);
  
  // Start the clock with the new date
  startClock(temp);
  
  // Reset the time stop flag
  timeStop = true;
});

// Function to start the clock
function startClock(d) {
  function updateCounter() {
    let tl = timeLeft(d);
    
    // Check if the countdown has reached zero
    if (tl.total <= 0) {
      timeStop = false;
    }
    
    // Update the clock display
    for (let pro in tl) {
      let el = clock.querySelector("." + pro);
      if (el) {
        el.innerHTML = tl[pro];
      }
    }
  }
  
  // Update the counter immediately
  updateCounter();
  
  // Start or stop the interval based on the time stop flag
  if (timeStop) {
    timeInterval = setInterval(updateCounter, 1000);
  } else {
    clearInterval(timeInterval);
  }
}

// Function to calculate the time left until the target date
function timeLeft(d) {
  const currentDate = new Date();
  let t = Date.parse(d) - Date.parse(currentDate);
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
