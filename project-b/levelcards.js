let img;
let LevelCards = [];
let numCards = 3;
let radius = 150;
let centerX, centerY;
let button;
let showbutton = false;

function preload() {
  img = loadImage("assets/milkyway.jpg");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  centerX = width / 2;
  centerY = height / 2;
  button = new Button(width - 100, height - 60, 80, 40, "See Next");

  for (let i = 0; i < numCards; i++) {
    let angle = TWO_PI / numCards * i;
    LevelCards[i] = new LevelCard(centerX, centerY, radius, angle);
  }
}

function draw() {
  background(30);

  tint(255, 255);
  image(img, 0, 0, width, height);


  for (let i = 0; i < LevelCards.length; i++) {
    let lc = LevelCards[i];
    lc.update();
    lc.display();
    if (lc.isSelected) {
      showbutton = true;
    }

  }
  if (showbutton) {
    button.display();
  }
}




class LevelCard {
  constructor(centerX, centerY, r, angle) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = r;
    this.dia = 50;
    this.isHovered = false;
    this.baseAngle = angle;
    this.x = this.centerX + this.radius * cos(this.baseAngle);
    this.y = this.centerY + this.radius * sin(this.baseAngle);
    this.color = color(200, 220, 255, 240);
    this.isSelected = false;
    this.scl = 0.20;
    //
    this.selectedX = width / 2;
    this.selectedY = height / 2;
    this.selectedScale = 1.0;
    //
    // this.originX = centerX;
    // this.originY = centerY;
    // this.originScale = 0.2;
  }


  update() {
    this.checkHover();

    if (this.isSelected) {
      this.x = lerp(this.x, width / 2, 0.03);
      this.y = lerp(this.y, height / 2, 0.03);
      this.scl = lerp(this.scl, 1.00, 0.03);
    } else {
      //
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scl);

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
    rect(0, 0, this.dia * 5, this.dia * 2 * 5, 10);
    pop();
  }

  checkHover() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.dia / 2) {
      this.isHovered = true;
      if (mouseIsPressed) {
        this.isSelected = true;
      }
    } else {
      this.isHovered = false;
    }
  }
}

class Button {
  constructor(x, y, w, h, labeltext) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = labeltext

  }


  display() {
    push();
    rectMode(CENTER);
    fill(255, 255, 255, 200);
    stroke(200);
    strokeWeight(3);
    rect(this.x, this.y, this.w, this.h, 10);
    translate()

    fill(50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.text, this.x, this.y);
    pop();
  }
}
