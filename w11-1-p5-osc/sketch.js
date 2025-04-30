let osc;
let oscIsPlaying = false;


function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");


  osc = new p5.Oscillator("sine");
}


function draw() {
  background(220);
}


function mousePressed() {
  if (oscIsPlaying == false) {
    osc.start();
    oscIsPlaying = true;
  } else {
    osc.stop();
    oscIsPlaying = false;
  }
}


