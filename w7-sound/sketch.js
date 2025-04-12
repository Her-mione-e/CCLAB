let song;

function preload() {
  song = loadSound("assets/song.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  amp = new p5.Amplitude();
}

function draw() {
  background(220);

  let volValue = map(mouseY, 0, height, 1.0, 0.0, true);
  sound.setVolume(volValue);

}

function mousePressed() {
  if (song.isPlaying() == false) {

  }

}