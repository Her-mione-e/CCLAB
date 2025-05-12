/*
mode:

0: ready or front page
1：Emotion Cards
2：Level Cards
3: Polarity Cards
4：Show Selected Card
5: ending?
6: something else?

*/

let mode = 1; //needs to be changed later
let img;
let font1;
let Cards = [];
let radius = 150;
let centerX, centerY;
let button;
let currentType = "emotion"
let numCardsByType = {
  emotion: 6,
  level: 3,
  polarity: 2
};//Is this OK to use?(AI assistance)

let selectNum = 0;

//image files
let emotionImgs = [];
let levelImgs = [];
let polarityImgs = [];

function preload() {
  img = loadImage("assets/milkyway.jpg");
  font1 = loadFont("assets/CinzelDecorative-Regular.ttf");
  for (let i = 0; i < numCardsByType.emotion; i++) {
    emotionImgs.push(loadImage('assets/emotionImg' + (i + 1) + '.jpg'));
  }
  for (let i = 0; i < numCardsByType.level; i++) {
    levelImgs.push(loadImage('assets/levelImg' + (i + 1) + '.jpg'));
  }
  for (let i = 0; i < numCardsByType.polarity; i++) {
    polarityImgs.push(loadImage('assets/polarityImg' + (i + 1) + '.jpg'));
  }
  drawcardsound = loadSound("assets/drawcardsound.mp3");
}

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  centerX = width / 2;
  centerY = height / 2;
  button = new Button(width - 100, height - 60, 80, 40, "See Next");
  console.log(emotionImgs)
}

function draw() {
  background(30);

  // draw the bg image
  tint(255, 255);
  image(img, 0, 0, width, height);

  // update the card scenes
  if (mode == 0) {
    //showIntro();
  } else if (mode == 1) {
    currentType = "emotion"
    showCards(currentType, emotionImgs);
  } else if (mode == 2) {
    currentType = "level"
    showCards(currentType, levelImgs);
  } else if (mode == 3) {
    currentType = "polarity"
    showCards(currentType, polarityImgs);
  } else if (mode == 4) {

  }


  push();
  fill(255);
  text(mode, 10, 20);
  pop();
}


function mousePressed() {
  button.checkClick();


}


function showCards(type, imgsArray) {
  if (Cards.length === 0) {
    Cards = createCardsByType(type, imgsArray);
  }

  for (let c of Cards) {
    c.update();
    c.display();
  }

  button.checkHover();
  button.display();
}

function createCardsByType(type, imgsArray) {
  let newCards = [];
  let num = numCardsByType[type];
  for (let i = 0; i < num; i++) {
    let angle = TWO_PI / num * i;
    let c = new Card(centerX, centerY, 150, angle, type, imgsArray[i]);
    newCards.push(c);
  }
  return newCards;
}


class Card {
  constructor(centerX, centerY, r, angle, type, img) {
    this.state = "";
    this.type = type; //Emotion, Level, Polarity
    this.isHover = false;
    //
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = r;
    this.dia = 50;
    this.isHovered = false;
    this.baseAngle = angle;
    this.x = this.centerX + this.radius * cos(this.baseAngle);
    this.y = this.centerY + this.radius * sin(this.baseAngle);
    this.color = this.getColorByType();
    this.isSelected = false;
    this.scl = 0.20;
    this.rotationSpeed = 0.005
    //
    this.selectedX = width / 2;
    this.selectedY = height / 2;
    this.selectedScale = 1.0;

    this.img = img;
    this.imgShow = false;
    //
    // this.originX = centerX;
    // this.originY = centerY;
    // this.originScale = 0.2;
  }


  getColorByType() {
    if (this.type === "emotion") {
      return color(200, 220, 255, 240);
    } else if (this.type === "level") {
      return color(255, 200, 220, 240);
    } else if (this.type === "polarity") {
      return color(200, 255, 200, 240);
    } else {

    }
  }//well I let AI assist me here

  update() {
    this.checkHover();

    if (this.state == "selected") {
      this.x = lerp(this.x, width / 2, 0.03);
      this.y = lerp(this.y, height / 2, 0.03);
      this.scl = lerp(this.scl, 1.00, 0.03);
      // console.log('test')
      if (this.scl >= 0.95) {
        this.imgShow = true;
        console.log('test')
      }
    } else {
      this.baseAngle += this.rotationSpeed;
      this.x = this.centerX + this.radius * cos(this.baseAngle);
      this.y = this.centerY + this.radius * sin(this.baseAngle);
      //
    }
  }


  display() {
    push();
    translate(this.x, this.y);
    scale(this.scl);

    if (this.isHover) {
      blendMode(ADD);
      stroke(255, 215, 0);
      strokeWeight(3);
      noFill();
    } else {
      blendMode(BLEND);
      noStroke();
    }

    noStroke();
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.dia * 5, this.dia * 2 * 5, 10);
    pop();

    if (this.state == 'selected' && this.imgShow == true) {
      push();
      imageMode(CENTER);
      // tint()
      image(this.img, width / 2, height / 2, this.dia * 5, this.dia * 2 * 5);
      pop();
    }
  }

  checkHover() {
    let distance = dist(mouseX, mouseY, this.x, this.y);
    if (distance < this.dia / 2 && this.state != "selected") {
      this.state = "hover";
      this.isHover = true;
      if (mouseIsPressed) {
        drawcardsound.play();
        button.isShown = true;
        selectNum = selectNum + 1;
        if (selectNum == 1) {
          this.state = "selected";
        }
      }
    } else if (this.state != 'selected' && selectNum == 1) {
      this.color.setAlpha(0);
    }
    else {
      //this.state = "";
      this.isHover = false;
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
    this.isHover = false;
    this.isShown = false;
    this.alphaFade = 0;
    this.fadeSpeed = 5;
  }
  checkClick() {
    if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2
      && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
      // in
      mode++;
      selectNum = 0;
      this.isShown = false;
      Cards = [];
    } else {
      // out

    }
  }
  checkHover() {
    if (this.isShown) {
      if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2
        && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
        // in
        this.isHover = true;
      } else {
        // out
        this.isHover = false;
      }
    }
  }
  display() {
    if (this.isShown == false) return;

    push();
    rectMode(CENTER);
    fill(255, 255, 255, 200);
    if (this.isHover) {
      blendMode(ADD);
      fill(192, 192, 192);
    }
    stroke(200);
    strokeWeight(3);
    rect(this.x, this.y, this.w, this.h, 10);


    fill(50);
    noStroke();
    textFont(font1);
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.text, this.x, this.y);
    pop();
  }
}
