let sound;

function preload() {
  sound = loadSound("assets/kick.mp3");

}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

}

function draw() {
  background(220);

  let volValue = map(mouseY, 0, height, 1.0, 0.0, true);
  sound.setVolume(volValue);

  let
}

function mousePressed() {
  sound.play();
}