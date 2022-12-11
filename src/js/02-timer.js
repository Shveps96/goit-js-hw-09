import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', 'true');
const options = {
  enableTime: true,
  time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure('Please choose a date in the future');
        } else {
          startBtn.removeAttribute('disabled');
          startBtn.addEventListener(
            'click',
            timerChangeValue(selectedDates[0])
          );
        }
  },
};
const timerInput = document.querySelector('#datetime-picker');
flatpickr(timerInput, options);
const timeValue = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]')
}
let timerId = 0;
function timerChangeValue(selectedTime) {
    const timer = {
        start() {
        const startTime = selectedTime;
        
        timerId = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = startTime - currentTime;
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          timeValue.days.textContent = days;
          timeValue.hours.textContent = hours;
          timeValue.minutes.textContent = minutes;
          timeValue.seconds.textContent = seconds;
          console.log(deltaTime);

          if (deltaTime < 1000) {
            clearInterval(timerId);
            Notiflix.Notify.success('The time has come!');
          }
        }, 1000)
      }
    }
    timer.start()
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0')
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

