window.AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();
const gainNode = ctx.createGain();
gainNode.gain.value = 0;

let oscillator;
let isPlaying = false;

document.querySelector("#play").addEventListener("click", () => {
  if (isPlaying) return;
  oscillator = ctx.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = 440;
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  isPlaying = true;
});

document.querySelector("#stop").addEventListener("click", () => {
  oscillator?.stop();
  isPlaying = false;
});

let canvas = new fabric.Canvas('canvas');
const staticCircle = new fabric.Circle({
  left: 20,
  top: 20,
  width: 20,
  height: 20,
  radius: 20,
  fill: 'black',
  selectable: false,
  hasControls: false,
  hasBorders: false
});
const staticCircleCenterX= staticCircle.left + (staticCircle.width / 2);
const staticCircleCenterY = staticCircle.top + (staticCircle.height / 2);
canvas.add(staticCircle);

const circle = new fabric.Circle({
  left: 200,
  top: 50,
  width: 40,
  height: 40,
  radius: 40,
  fill: 'royalblue',
  hasControls: false,
  hasBorders: false
});
circle.on('mouseup', (e) => {
  const distance = calcDistance(e);
  console.log('distance', distance);
  if (distance > 100) {
    gainNode.gain.value = 0;
  } else {
    gainNode.gain.value = 0.5;
  }
});
canvas.add(circle);

const calcDistance = (e) => {
  const base = Math.pow(staticCircleCenterX - e.pointer.x, 2);
  const height = Math.pow(staticCircleCenterY - e.pointer.y, 2);

  return Math.sqrt(base + height);
};
