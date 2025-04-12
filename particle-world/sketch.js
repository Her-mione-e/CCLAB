//click to see more
let NUM_OF_PARTICLES = 3;
let MAX_OF_PARTICLES = 50;

let particles = [];
let flames = [];

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");

  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Snowflake(random(width), random(height));
  }
}

function draw() {
  background(0, 10, 30);
  for (let i = 0; i < flames.length; i++) {
    let f = flames[i];
    f.update();
    f.age();
    f.display();
    f.slowDown();
  }

  //get rid of the 'dead' flame particles
  for (let i = flames.length - 1; i >= 0; i--) {
    let f = flames[i];
    if (f.isDone) {
      flames.splice(i, 1);
    }
  }

  //random snowflakes
  if (frameCount % 10 === 0 && particles.length < MAX_OF_PARTICLES) {
    particles.push(new Snowflake(random(width), -20));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    //
    if (particles[i].y > height + particles[i].dia) {
      particles.splice(i, 1);
    }
  }
}

//click to start a fire
function mousePressed() {
  for (let i = 0; i < 20; i++) {
    flames.push(new FlameParticle(mouseX, mouseY, random(5, 15)));
  }
}
class FlameParticle {
  constructor(x, y, dia) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    //
    this.xSpeed = random(-1, 1);
    this.ySpeed = random(-3, -1);
    //
    this.r = 255;
    this.g = random(100, 200);
    this.b = 0;
    //
    this.lifespan = 1.0;
    this.lifeReduction = random(0.01, 0.03);
    this.isDone = false;
  }
  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  age() {
    this.lifespan -= this.lifeReduction;
    this.g = constrain(this.g - 2, 0, 255);
    if (this.lifespan < 0) {
      this.lifespan = 0;
      this.isDone = true;
    }
  }
  slowDown() {
    this.xSpeed *= 0.97; // -5%
    this.ySpeed *= 0.99;
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();

    //inner flame
    fill(this.r, this.g, this.b, 255 * this.lifespan * 0.8);
    ellipse(0, 0, this.dia * this.lifespan);

    //outer flame
    fill(this.r, this.g, 0, 150 * this.lifespan);
    ellipse(0, -5, this.dia * 1.2 * this.lifespan);

    pop();
  }
}
class Snowflake {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.dia = random(10, 30);
    this.speed = random(1, 2);
    this.angle = 0;
    this.rotationSpeed = random(-0.02, 0.02);
    this.color = color(200, 220, 255, 200);
  }

  update() {
    this.y += this.speed;
    this.angle += this.rotationSpeed;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    noStroke();
    fill(this.color);
    this.drawSnowflake();

    pop();
  }

  drawSnowflake() {
    //center
    ellipse(0, 0, this.dia * 0.2);

    //the six lines
    for (let i = 0; i < 6; i++) {
      let angle = (TWO_PI / 6) * i;
      push();
      rotate(angle);

      //the line
      rect(0, -this.dia * 0.05, this.dia * 0.4, this.dia * 0.1);

      //the small circles at the end
      ellipse(this.dia * 0.4, 0, this.dia * 0.15);

      pop();
    }
  }
}

