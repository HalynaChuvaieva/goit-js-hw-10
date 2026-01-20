import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const flatpickr = require("flatpickr");

const timer = document.querySelector('#datetime-picker');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(Date.now()<selectedDates[0].getTime())
    console.log(selectedDates[0]);
  },
};

flatpickr(timer, options);

