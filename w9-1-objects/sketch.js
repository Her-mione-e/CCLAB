let particles = []; // empty array

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(100, 300)
    let newP = new Particle(width / 2, height / 2, 30);
    particles.push(newP);
  }
}

function draw() {
  background(220);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i]; // get each particle
    p.move();
    p.display();
  }
}

class Particle {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    //
    this.xSpeed = 0
    this.ySpeed = random(-1, 2);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  display() {
    let diaAdj = sin(frameCount)
    push();
    translate(this.x, this.y);

    circle(0, 0, this.dia);

    pop();
  }
}






