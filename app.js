let context = new (window.AudioContext || window.webkitAudioContext)();
const audio = document.querySelector("myAudio");
const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");
const analyzer = context.createAnalyser();
const source = context.createMediaElementSource(audio);

const fbc_array = new Uint8Array(analyzer.frequencyBinCount);

window.addEventListener("load", () => {
  source.connect(analyzer);
  analyzer.connect(context.destination);

  loop();
});

function loop() {
  window.requestAnimationFrame(loop);
  analyzer.getByteFrequencyData(fbc_array);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "FF0000";

  let bar_x,
    bar_width,
    bar_height,
    bars = 100;

  for (let i = 0; i < bars; i++) {
    bar_x = i * 3;
    bar_width = 2;
    bar_height = -(fbc_array[i] / 2);
    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
  }
}
