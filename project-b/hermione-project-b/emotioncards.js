/*
mode:

0: ready or front page
1：Emotion cards
2：Level cards
3: Polarity cards
4：Show Selected Card
5: ending?
6: something else?

*/

let selectedEmotion = -1;
let selectedLevel = -1;
let selectedPolarity = -1;

let mode = 0; //needs to be changed later
let img;
let img1;
let img2;
let font2;
let font3;
let cards = [];
let radius = 150;
let centerX, centerY;
let button;
let currentType = "emotion"
let numCardsByType = {
  emotion: 6,
  level: 3,
  polarity: 2
}; //Is this OK to use?(AI assistance) // Great!

let selectNum = 0;

//image files
let emotionImgs = [];
let levelImgs = [];
let polarityImgs = [];

let cardsEmotion = [];
let cardsLevel = [];
let cardsPolarity = [];

let fadeAlpha = 0;
let fadeSpeed = 0.01;

let showDrResponse = false;




function preload() {
  img = loadImage("assets/milkyway.jpg");
  img1 = loadImage("assets/lab.jpg");
  img2 = loadImage("assets/scientist.png");
  //font1 = loadFont("assets/CinzelDecorative-Regular.ttf");
  font2 = loadFont("assets/PressStart2P-Regular.ttf");
  font3 = loadFont("assets/Exo2-VariableFont_wght.ttf");


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

  textFont(font2);

  centerX = width / 2;
  centerY = height / 2;

  button = new Button(width - 100, height - 60, 80, 40, "See Next");
  console.log(emotionImgs)

  // create emotion cards
  for (let i = 0; i < emotionImgs.length; i++) {
    let type = "emotion";
    let img = emotionImgs[i];
    let num = emotionImgs.length;
    let angle = TWO_PI / num * i;
    let c = new Card(centerX, centerY, 150, angle, type, img, i);
    cardsEmotion.push(c)
  }

  // create level cards
  for (let i = 0; i < levelImgs.length; i++) {
    let type = "level";
    let img = levelImgs[i];
    let num = levelImgs.length;
    let angle = TWO_PI / num * i;
    let c = new Card(centerX, centerY, 150, angle, type, img, i);
    cardsLevel.push(c)
  }

  // create polarity cards
  for (let i = 0; i < polarityImgs.length; i++) {
    let type = "polarity";
    let img = polarityImgs[i];
    let num = polarityImgs.length;
    let angle = TWO_PI / num * i;
    let c = new Card(centerX, centerY, 150, angle, type, img, i);
    cardsPolarity.push(c)
  }

}

function draw() {
  background(30);

  // draw the bg image
  push();
  tint(255, 255);
  image(img, 0, 0, width, height);
  pop();

  // update the card scenes
  if (mode == 0) {
    drawMode0();
  } else if (mode == 1) {
    drawMode1();
  } else if (mode == 2) {
    drawMode2();
  } else if (mode == 3) {
    drawMode3();
  } else if (mode == 4) {
    drawMode4();
  } else if (mode == 5) {
    drawMode5();
  } else if (mode == 6) {
    drawMode6();
  }
}

function mousePressed() {
  if (mode === 5 && !showDrResponse) {
    showDrResponse = true;
  } else {
    button.checkClick();
  }
}




///// MODES /////

function drawMode0() {
  push();
  push();
  image(img1, 0, 0, width, height);

  stroke(0, 255, 200);
  strokeWeight(2);
  fill(0, 255, 200, 100);
  rect(110, 120, 550, 300);
  image(img2, 500, 120, 260, 390);

  textAlign(CENTER);
  textSize(40);
  text('Resonant Arcana', 400, 90);
  pop();
  push();
  let description = [
    " Greetings, traveler.",
    " I am Dr. Enoim. In a time where emotions are mere data", "points —analyzed, stored, and adjusted with precision.", "I have devoted my life to rekindling the true essence", "of feeling.", " Through years of study, I have crafted these cards", "to guide you back to the roots of human experience.",
    "Here, you will not just observe emotions—you will", "live them. When you are ready, click 'Begin.'", "Let's rediscover what it means to feel."

  ]
  fill(242, 247, 255);
  textSize(17);
  textAlign(LEFT);
  textFont(font3);
  for (let i = 0; i < description.length; i++) {
    let x = 140;
    let yPos = 150 + i * 26;
    text(description[i], x, yPos);
  }


  // update the button
  button.isShown = true;
  button.changePosition(width / 2 - 20, height / 2 + 210);
  button.changeSize(80, 40);
  button.changeText("Start!");
  button.checkHover();
  button.display();
  pop();
  pop();
}

function drawMode1() {
  push();

  fill(255)
  textSize(20);
  textFont(font2);
  text("Emotion", 20, 50)

  for (let i = 0; i < cardsEmotion.length; i++) {
    let card = cardsEmotion[i];
    card.update();
    card.display();
  }

  // update the button
  button.changePosition(width - 100, height - 60);
  button.changeSize(80, 40);
  button.changeText("See Next");
  button.checkHover();
  button.display();

  pop();
}

function drawMode2() {
  push();

  fill(255)
  textSize(20);
  textFont(font2);
  text("Level", 20, 50)

  for (let i = 0; i < cardsLevel.length; i++) {
    let card = cardsLevel[i];
    card.update();
    card.display();
  }

  // update the button
  button.changePosition(width - 100, height - 60);
  button.changeSize(80, 40);
  button.changeText("See Next");
  button.checkHover();
  button.display();

  pop();
}

function drawMode3() {
  push();

  fill(255)
  textSize(20);
  textFont(font2);
  text("Polarity", 20, 50)

  for (let i = 0; i < cardsPolarity.length; i++) {
    let card = cardsPolarity[i];
    card.update();
    card.display();
  }
  // update the button
  button.changePosition(width - 100, height - 60);
  button.changeSize(80, 40);
  button.changeText("See Next");
  button.checkHover();
  button.display();

  pop();
}

function drawMode4() {
  push();

  if (selectedEmotion !== -1) {
    displaySelectedCard(cardsEmotion[selectedEmotion], width / 4, height / 2);
  }
  if (selectedLevel !== -1) {
    displaySelectedCard(cardsLevel[selectedLevel], width / 2, height / 2);
  }
  if (selectedPolarity !== -1) {
    displaySelectedCard(cardsPolarity[selectedPolarity], (3 * width) / 4, height / 2);
  }
  // update the button
  button.isShown = true;
  button.changePosition(width - 100, height - 60);
  button.changeSize(80, 40);
  button.changeText("See Next");
  button.checkHover();
  button.display();

  pop();
}

function displaySelectedCard(card, x, y) {
  push();
  if (fadeAlpha < 255) {
    fadeAlpha = lerp(fadeAlpha, 255, fadeSpeed);
  }

  tint(255, fadeAlpha);
  imageMode(CENTER);
  image(card.img, x, y - 50, 130, 260);

  for (let i = 0; i < card.suggestedBehaviors.length; i++) {

    let xPos = x;
    let yPos = y + 110 + i * 25;

    fill(255);
    textSize(15); // ***
    textFont(font3);
    textAlign(CENTER, CENTER);
    text(card.suggestedBehaviors[i], xPos, yPos);
  }

  pop();
}



let textAlpha = 0;
function drawMode5() {
  image(img1, 0, 0, width, height);
  image(img2, 500, 120, 260, 390);

  textFont(font2);
  push();
  if (fadeAlpha < 255) {
    fadeAlpha = lerp(fadeAlpha, 255, fadeSpeed);
  }

  tint(255, fadeAlpha);


  if (textAlpha < 255) {
    textAlpha = lerp(textAlpha, 255, fadeSpeed);
  }

  let questionAndAnswer = {
    user: "So... are the emotions simulated by these cards any different from real emotions?",
    dr: "\"What is 'real emotion,' anyway?\""
  };

  fill(242, 247, 255, textAlpha);
  textSize(17);
  textFont(font3);
  textAlign(LEFT);
  textSize(18);
  fill(242, 247, 255, textAlpha);
  text(questionAndAnswer.user, 100, 120, 300, 200);

  if (showDrResponse) {
    push();
    textAlign(RIGHT);
    textSize(25);
    fill(242, 247, 255, textAlpha);
    text(questionAndAnswer.dr, width - 550, height / 2 + 10, 300, 200);
    pop();

    button.isShown = true;
    button.changePosition(100, height - 60);
    button.changeSize(80, 40);
    button.changeText("See Next");
    button.checkHover();
    button.display();
  }
}

let bgAlpha = 0;
function drawMode6() {

  if (bgAlpha < 255) {
    bgAlpha = lerp(bgAlpha, 255, fadeSpeed);
  }
  background(0, bgAlpha);


  if (bgAlpha > 50 && textAlpha < 255) {
    textAlpha = lerp(textAlpha, 255, fadeSpeed);
  }


  push();
  textAlign(CENTER, CENTER);
  textSize(30);
  textFont(font3);
  fill(242, 247, 255, textAlpha);
  text("In a world where emotions are engineered,", width / 2, height / 2 - 20);
  text("who decides what's real?", width / 2, height / 2 + 20);
  pop();



}






///// CLASSES /////

class Card {
  constructor(centerX, centerY, r, angle, type, img, id) {
    this.id = id;
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
    this.suggestedBehaviors = [];
    if (this.type === "emotion") {
      if (this.id === 0) this.suggestedBehaviors = ["Dance to your fav song.", "Share a joke with a friend.", "Recall your happiest memory."];
      else if (this.id === 1) this.suggestedBehaviors = ["Listen to a nostalgic song.", "Write about a lost feeling.", "Sit quietly."];
      else if (this.id === 2) this.suggestedBehaviors = ["Scream into a pillow.", "Scribble on paper fiercely.", "Punch a cushion."];
      else if (this.id === 3) this.suggestedBehaviors = ["Walk through the darkness slowly.", "Stand at a high place & look down.", "Imagine stepping into the unknown."];
      else if (this.id === 4) this.suggestedBehaviors = ["Smell something pungent.", "Look closely at messy stuff.", "Taste something bitter."];
      else if (this.id === 5) this.suggestedBehaviors = ["Embrace the unknown.", "Observe your reactions.", "Stay open to new possibilities."];
    } else if (this.type === "level") {
      if (this.id === 0) {
        this.suggestedBehaviors = [
          "Reflect and ", "acknowledge it calmly."
        ];
      } else if (this.id === 1) {
        this.suggestedBehaviors = [
          "Express through ", "talking or creative outlets."
        ];
      } else if (this.id === 2) {
        this.suggestedBehaviors = [
          "Release safely,", "then breathe and process."
        ];
      }
    } else if (this.type === "polarity") {
      if (this.id === 0) this.suggestedBehaviors = ["Embrace stability and growth;", "focus on actions that", "reinforce positivity."];
      else if (this.id === 1) this.suggestedBehaviors = ["Acknowledge and ", "let out the chaos,", "but aim to regain control and clarity."];
    }
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
  }
  //well I let AI assist me here

  update() {
    this.checkHover();

    if (this.state == "selected") {
      this.x = lerp(this.x, width / 2, 0.03);
      this.y = lerp(this.y, height / 2, 0.03);
      this.scl = lerp(this.scl, 0.90, 0.03);
      // console.log('test')
      if (this.scl >= 0.88) {
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

    push();
    stroke(0, 255, 200);
    strokeWeight(1.5);
    noFill();


    let iconSize = 30;
    rect(0, 0, iconSize, iconSize);
    line(-iconSize / 2, 0, iconSize / 2, 0);
    line(0, -iconSize / 2, 0, iconSize / 2);
    line(-iconSize / 2, -iconSize / 2, iconSize / 2, iconSize / 2);
    line(-iconSize / 2, iconSize / 2, iconSize / 2, -iconSize / 2);
    //ChatGPT designed the pattern

    pop();
    pop();


    if (this.state == 'selected' && this.imgShow == true) {
      push();
      imageMode(CENTER);
      // tint()
      image(this.img, width / 2, height / 2, this.dia * 5 * 0.9, this.dia * 2 * 5 * 0.9);
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
        console.log(this.type, this.id);
        if (this.type == "emotion") {
          selectedEmotion = this.id;
        } else if (this.type == "level") {
          selectedLevel = this.id;
        } else if (this.type == "polarity") {
          selectedPolarity = this.id;
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
  changePosition(x, y) {
    this.x = x;
    this.y = y;
  }
  changeSize(w, h) {
    this.w = w + 10;
    this.h = h;
  }
  changeText(text) {
    this.text = text;
  }
  checkClick() {
    if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2
      && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
      // in
      mode++;
      selectNum = 0;
      this.isShown = false;
      //cards = [];
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
    fill(0, 255, 200, 100);
    if (this.isHover) {
      blendMode(ADD);
      fill(192, 192, 192);
    }
    stroke(0, 255, 200);
    strokeWeight(3);
    //rect(this.x, this.y, this.w, this.h, 10);
    rect(this.x, this.y, this.w + 10, this.h);


    fill(0, 255, 200);
    noStroke();
    textFont(font2);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(this.text, this.x, this.y);
    pop();
  }
}


