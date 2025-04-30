let img;
let EmotionCards = [];
let numCards = 3;
let radius = 150;
let centerX, centerY;

function preload() {
  img = loadImage("assets/milkyway.jpg");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  centerX = width / 2;
  centerY = height / 2;

  for (let i = 0; i < numCards; i++) {
    let angle = TWO_PI / numCards * i;
    EmotionCards[i] = new EmotionCard(centerX, centerY, radius, angle);
  }
}

function draw() {
  background(30);

  tint(255, 255);
  image(img, 0, 0, width, height);


  for (let i = 0; i < EmotionCards.length; i++) {
    let ec = EmotionCards[i];
    ec.update();
    ec.display();
  }
}

function mousePressed() {
  for (let i = 0; i < EmotionCards.length; i++) {
    if (ec.isclicked) {

    }
  }
}


class EmotionCard {
  constructor(centerX, centerY, r, angle) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = r;
    this.dia = 50;
    this.isHovered = false;
    this.baseAngle = angle;
    this.x = this.centerX + this.radius * cos(this.baseAngle);
    this.y = this.centerY + this.radius * sin(this.baseAngle);
    this.color = color(200, 220, 255, 200);
  }

  update() {
    this.checkHover();
  }

  display() {
    push();
    translate(this.x, this.y);

    if (this.isHovered) {
      blendMode(ADD);
      stroke(255, 215, 0);
      strokeWeight(3);
      noFill();
    } else {
      blendMode(BLEND);
      noStroke();
    }

    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.dia, this.dia * 2, 10);
    pop();
  }

  checkHover() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.dia / 2) {
      this.isHovered = true;
    } else {
      this.isHovered = false;
    }
  }
}

