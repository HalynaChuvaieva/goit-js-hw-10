import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timer = document.querySelector('#datetime-picker');
const startBtn = document.querySelector("[data-start]");
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let userSelectedDate;

startBtn.addEventListener('click', onStartBtnClick)

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const diffirence = selectedDates[0].getTime() - Date.now();
    if (diffirence <= 0) {
      alert("Please choose a date in the future");
      startBtn.disabled = true;
      return;
   }
    startBtn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(timer, options);

function onStartBtnClick() {
  startBtn.disabled = true;
  timer.disabled = true;

  const intervalId = setInterval(() => {
    const diffirence = userSelectedDate.getTime() - Date.now();

    if (diffirence < 1000) {
      clearInterval(intervalId);
      timer.disabled = false;
    }
    const convertedTime = convertMs(diffirence);
    days.textContent = addLeadingZero(convertedTime.days);
    hours.textContent = addLeadingZero(convertedTime.hours);
    minutes.textContent = addLeadingZero(convertedTime.minutes);
    seconds.textContent = addLeadingZero(convertedTime.seconds);
  }, 1000)
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, 0)
}