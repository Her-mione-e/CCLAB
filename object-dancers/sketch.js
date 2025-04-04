/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  dancer = new HermioneDancer(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

class HermioneDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.baseY = startY;
    this.possibleMoves = ["footwork", "spin"];
    this.currentMove = "footwork";
    this.moveTimer = 0;
    this.spinState = false;
    this.spinAngle = 0;
    this.spinTargetAngle = 0;
    this.leftArmState = false;
    this.leftArmAngle = 0;
    this.leftArmTargetAngle = 0;
    this.rightArmState = false;
    this.rightArmAngle = 0;
    this.rightArmTargetAngle = 0;
  }
  update() {
    this.updateLeftArm();
    this.updateRightArm();
    this.moveTimer++;

    if (this.moveTimer > 120) {
      this.moveTimer = 0;
      var randomIndex = floor(random(0, this.possibleMoves.length)); //I used deepseek for help here because I am not familiar with randomIndex in arrays
      this.currentMove = this.possibleMoves[randomIndex];
    }

    if (this.currentMove === "footwork") {
      this.updateFootwork();
    } else if (this.currentMove === "spin") {
      this.updateSpin();
    }
  }
  updateFootwork() {
    this.y = this.baseY + 30 + sin(frameCount * 0.2) * 10;
    this.footAngle = sin(frameCount * 0.5) * 0.3;
  }

  updateSpin() {
    let remainder = frameCount % 60;
    if (remainder == 0) {
      this.spinState = !this.spinState;
    }
    if (this.spinState == true) {
      this.spinTargetAngle = -PI / 3;
    } else {
      this.spinTargetAngle = PI / 3;
    }
    this.spinAngle = lerp(this.spinAngle, this.spinTargetAngle, 0.1);
  }

  updateLeftArm() {
    let remainder = frameCount % 40;
    if (remainder == 0) {
      this.leftArmState = !this.leftArmState;
    }
    if (this.leftArmState == true) {
      this.leftArmTargetAngle = -PI / 6;
    } else {
      this.leftArmTargetAngle = PI / 6;
    }
    this.leftArmAngle = lerp(this.leftArmAngle, this.leftArmTargetAngle, 0.25);
  }
  updateRightArm() {
    let remainder = frameCount % 60;
    if (remainder == 0) {
      this.rightArmState = !this.rightArmState;
    }
    if (this.rightArmState == true) {
      this.rightArmTargetAngle = -PI / 6;
    } else {
      this.rightArmTargetAngle = PI / 6;
    }
    this.rightArmAngle = lerp(
      this.rightArmAngle,
      this.rightArmTargetAngle,
      0.15
    );
  }

  display() {
    push();
    translate(this.x, this.y);
    if (this.currentMove === "spin") {
      rotate(this.spinAngle);
      translate(0, -40);
    }

    this.drawLeftfoot();
    this.drawRightfoot();
    this.drawLeftarm();
    this.drawRightarm();
    this.drawBody();
    this.drawHead();
    pop();
  }

  drawLeftfoot() {
    push();
    translate(-25, 65);
    rotate(this.footAngle);
    fill(255, 255, 150);
    stroke(107, 67, 33);
    strokeWeight(2);
    ellipse(0, 0, 50, 30);
    pop();
  }

  drawRightfoot() {
    push();
    translate(25, 65);
    rotate(this.footAngle);
    fill(255, 255, 150);
    stroke(107, 67, 33);
    strokeWeight(2);
    ellipse(0, 0, 50, 30);
    pop();
  }
  drawLeftarm() {
    push();
    translate(-50, 12);
    translate(25, -7);
    rotate(this.leftArmAngle);
    fill(192, 192, 192);
    stroke(107, 67, 33);
    strokeWeight(2);
    ellipse(-25, 0, 50, 20);
    pop();
  }

  drawRightarm() {
    push();
    translate(50, 12);
    translate(-25, -7);
    rotate(this.rightArmAngle);
    fill(192, 192, 192);
    stroke(107, 67, 33);
    strokeWeight(2);
    ellipse(25, 0, 50, 20);
    pop();
  }

  drawBody() {
    fill(192, 192, 192);
    stroke(107, 67, 33);
    strokeWeight(2);
    beginShape();
    curveVertex(-20, -10);
    curveVertex(-30, -10);
    curveVertex(-40, 15);
    curveVertex(-35, 50);
    curveVertex(0, 63);
    curveVertex(35, 50);
    curveVertex(40, 15);
    curveVertex(30, -10);
    curveVertex(20, -10);
    endShape(CLOSE);
  }

  drawHead() {
    push();
    fill(192, 192, 192);
    stroke(107, 67, 33);
    strokeWeight(2);
    ellipse(0, -50, 120, 105);

    //eyes
    fill(85, 53, 33);
    noStroke();
    circle(-20, -60, 23);
    circle(22, -57, 23);
    fill(192, 192, 192);
    circle(-17, -62, 4);
    circle(-21, -55, 3);
    circle(20, -60, 4);
    circle(27, -53, 3);

    //blush
    fill(255, 200, 200);
    noStroke();
    ellipse(-42, -40, 20, 15);
    ellipse(42, -40, 20, 15);

    //mouth
    noFill();
    stroke(85, 53, 33);
    arc(0, -38, 45, 26, 0.55, PI);

    fill(255, 200, 200);
    stroke(85, 53, 33);
    beginShape();
    curveVertex(-20, -30);
    curveVertex(-20, -30);
    curveVertex(-23, -27);
    curveVertex(-24, -25);
    curveVertex(-23, -20);
    curveVertex(-20, -20);
    curveVertex(-18, -20);
    curveVertex(-15, -23);
    curveVertex(-13, -27);
    curveVertex(-11, -30);
    endShape();

    pop();
  }
}

/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/