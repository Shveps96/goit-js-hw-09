const { startBtn, stopBtn, buttons } = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let timerId = null;

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);

function onClickStart() {
  startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    const bodyBgColor = getRandomHexColor();
    document.body.style.backgroundColor = bodyBgColor;
  }, 1000);
}

function onClickStop() {
  startBtn.removeAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}