let particles = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  particles[0] = new Particle(width / 2, height / 2, random(10, 30));
}

function draw() {
  background(220);


}

class Particle {
  constructor(tempX, tempY, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;

    this

  }
  display() {
    push();
    circle(this.x, this.y, this.dia);
    pop();
  }
  drawArm(deg) {
    push();
    rotate(radians(deg));
    ellipse(this.dia, 0, this.dia, 30);
    pop();
  }
}


