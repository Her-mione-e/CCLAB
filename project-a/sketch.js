/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

//mode 0:tranquil
//mode 1:excited/happy
//mode 2:angry
//mode 3:mesmerized
//mode 4:sad/frustrated
let mode = 0;
let x, y;
let xSpeed, ySpeed;
let ellipselength = 100;
let ellipsewidth = 20;
let tearX = 0;
let tearY = 160;
let tearSpeed = 0.9;
let tearDiameter = 20;
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent("p5-canvas-container");
    x = width / 2;
    y = height / 2;
    xSpeed = random(-1, 1);
    ySpeed = random(-1, 1);
}

function draw() {
    background(0);
    if (mouseIsPressed) {
        x = lerp(x, mouseX, 0.02);
        y = lerp(y, mouseY, 0.02);
    } else {
        // move
        x = x + xSpeed;
        y = y + ySpeed;

        if (x > width - 230) {
            x = width - 230;
            xSpeed *= -1;
        }
        if (x < 230) {
            x = 230;
            xSpeed *= -1;
        }
        if (y > height - 145) {
            y = height - 145;
            ySpeed *= -1;
        }
        if (y < 145) {
            y = 145;
            ySpeed *= -1;
        }
    }
    drawCreature(x, y);
}

function drawCreature(x, y) {
    push();
    translate(x, y);

    let scl = map(sin(frameCount * 0.015), -1, 1, 0.9, 1.1);
    scale(scl);

    // eye ball
    if (mode == 0) {
        fill(192, 192, 192);
    } else if (mode == 1) {
        let r = map(sin(frameCount * 0.005), -1, 1, 100, 255);
        let g = map(sin(frameCount * 0.007), -1, 1, 100, 255);
        let b = map(sin(frameCount * 0.009), -1, 1, 100, 255);
        fill(r, g, b, 180);
    } else if (mode == 2) {
        let r = 255;
        let g = map(sin(frameCount * 0.05), -1, 1, 0, 100);
        let b = map(cos(frameCount * 0.05), -1, 1, 0, 50);
        fill(r, g, b);
    } else if (mode == 3) {
        let r = map(sin(frameCount * 0.01), -1, 1, 50, 255);
        let g = map(cos(frameCount * 0.01), -1, 1, 50, 255);
        let b = map(sin(frameCount * 0.02), -1, 1, 100, 255);
        fill(r, g, b, 100);
    } else if (mode == 4) {
        let r = map(sin(frameCount * 0.02), -1, 1, 140, 180);
        let g = map(cos(frameCount * 0.02), -1, 1, 180, 220);
        let b = map(sin(frameCount * 0.02), -1, 1, 200, 240);
        fill(r, g, b, 150);
    }

    circle(0, 0, 250);

    //iris
    if (mode == 0) {
        ellipselength = 100;
        ellipsewidth = 20;
        drawIris01(0.01);
        drawIris04();
    } else if (mode == 1) {
        ellipselength = 70;
        ellipsewidth = 20;
        let scl = map(sin(frameCount * 0.07), -1, 1, 0.85, 1.15);
        scale(scl);
        drawIris01(0.04);
        drawIris02();
        drawIris05(0.1);
    } else if (mode == 2) {
        let scl = map(sin(frameCount * 0.15), -1, 1, 0.95, 1.05);
        scale(scl);
        drawIris01(0.03);
        drawIrisReal();
        drawBloodvessels();
        drawIrisBright();
        drawIrisNoiseLine()
        ellipselength = 80;
        ellipsewidth = map(sin(frameCount * 0.07), -1, 1, 13, 20);
    } else if (mode == 3) {
        ellipselength = map(4 * sin(frameCount * 0.02), -1, 1, 95, 100);
        ellipsewidth = 20;
        drawIris01(0.01);
        drawIris03();
    } else {
        let scl = map(sin(frameCount * 0.001), -1, 1, 0.95, 1.05);
        scale(scl);
        drawIrisFoggy1();
        drawIrisFoggy2();
        drawIrisCalmBut();
        drawTears();
    }

    // eyelids
    noFill();
    stroke(255);
    strokeWeight(4);
    arc(0, 15, 500, 340, PI * 1.02, PI * 1.98);
    arc(0, -15, 500, 340, PI * 0.02, PI * 0.98);

    pop();
}

function drawIris01(spd) {
    for (let deg = 0; deg < 360; deg += 12) {
        let angle = radians(deg) + frameCount * spd;
        push();
        translate(0, 0);
        rotate(angle);
        noFill();
        let r, g, b;

        if (mode == 0) {
            r = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 100, 180);
            g = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 100, 180);
            b = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 150, 255);
        } else if (mode == 1) {
            r = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 200, 255);
            g = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 150, 255);
            b = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 50, 150);
        } else if (mode == 2) {
            r = map(sin(frameCount * 0.05 + deg * 0.2), -1, 1, 0, 50);
            g = map(sin(frameCount * 0.07 + deg * 0.2), -1, 1, 50, 100);
            b = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 0, 30);
        } else if (mode == 3) {
            r = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 180, 255);
            g = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 100, 180);
            b = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 180, 255);
        } else if (mode == 4) {
            r = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 50, 100);
            g = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 50, 100);
            b = map(sin(frameCount * 0.03 + deg * 0.2), -1, 1, 100, 180);
        }

        stroke(r, g, b, 200);
        strokeWeight(1.5);
        //noStroke();
        //fill(r, g, b, 100);
        //ellipse(90, 0, ellipselength - 20, ellipsewidth);

        ellipse(60, 0, ellipselength, ellipsewidth);
        pop();
    }
}

function drawIris02() {
    for (let deg = 0; deg < 360; deg += 7) {
        let angle = radians(deg);
        push();
        translate(0, 0);
        rotate(angle + frameCount * -0.01);
        noFill();
        //ellipse(-30, 0, 100, 20);
        let radDist = map(sin(angle * 6), -1, 1, 20, 100);
        stroke(random(255), random(255), random(255));
        strokeWeight(1.5);
        circle(radDist, 0, random(3, 10));
        pop();
    }
}

function drawBloodvessels() {
    push();
    stroke(255, 0, 0);
    strokeWeight(map(frameCount, 0, 500, 2, 2.2));

    for (let i = 0; i < 30; i++) {
        let angle = random(TWO_PI);
        let length = random(90, 160);
        let xOffset = cos(angle) * length;
        let yOffset = sin(angle) * length;
        let alpha1 = map(frameCount * 2, 0, 500, 50, 255);
        let r = map(sin(frameCount * 0.05), -1, 1, 100, 255);
        let g = map(cos(frameCount * 0.05), -1, 1, 0, 50);
        let b = map(sin(frameCount * 0.05), -1, 1, 0, 50);

        stroke(r, g, b, alpha1);
        line(xOffset - 2, yOffset - 2, xOffset, yOffset);
        translate(0, 0);
    }
    pop();
}
function drawIris03() {
    push();
    for (let i = 0; i < 20; i++) {
        let dia = map(sin(frameCount * 0.03), -1, 1, 40 + i * 11, 40 + i * 15);
        let r = map(sin(frameCount * 0.02 + i * 0.2), -1, 1, 100, 255);
        let g = map(sin(frameCount * 0.03 + i * 0.2), -1, 1, 50, 255);
        let b = map(sin(frameCount * 0.04 + i * 0.2), -1, 1, 0, 255);

        stroke(r, g, b, 150 + i * 20);
        strokeWeight(7 - i * 0.6);
        noFill();
        circle(0, 0, dia);
    }
    pop();
}

function drawIris04(spd) {
    for (let deg = 0; deg < 360; deg += 30) {
        push();
        rotate(radians(deg));

        stroke(255, 0, 255);
        let amount = map(mouseX, 0, width, 0, 80, true);
        translate(50, 0);
        rotate(frameCount * 0.005);
        fill(255, 70);
        noStroke();
        ellipse(0, 0, 90, 40);
        pop();
    }
}

function drawIrisCalmBut(spd) {
    push();
    for (let deg = 0; deg < 360; deg += 3) {
        let radDist = 120;
        let x = cos(radians(deg)) * radDist;
        let y = sin(radians(deg)) * radDist;
        stroke(70, 80, 150, 150);
        let amount = map(mouseX, 0, width, 0, 10, true);
        line(x, y, random(-amount, amount), random(-amount, amount));
    }
    pop();
}

function drawIrisReal(spd) {
    push();
    for (let deg = 0; deg < 360; deg += 3) {
        let radDist = 120;
        let x = cos(radians(deg)) * radDist;
        let y = sin(radians(deg)) * radDist;
        stroke(0, 0, 0, 120);
        strokeWeight(1.5);
        line(x, y, 0, 0);
    }
    pop();
}

function drawIrisNoiseLine() {
    push();
    blendMode(ADD);
    for (let i = 0; i < 100; i = i + 2) {
        let deg1 = random(360);
        let deg2 = random(360);
        let radDist = 110;
        let x1 = cos(radians(deg1)) * radDist;
        let y1 = sin(radians(deg1)) * radDist;
        let x2 = cos(radians(deg2)) * radDist;
        let y2 = sin(radians(deg2)) * radDist;
        stroke(255, 255, 50, 70);
        line(x1, y1, x2, y2);
    }
    pop();
}

function drawIrisBright() {
    push();
    blendMode(ADD);
    for (let i = 0; i < 100; i++) {
        let deg = random(360);
        let radDist = random(10, 50);
        let x = cos(radians(deg)) * radDist;
        let y = sin(radians(deg)) * radDist;

        fill(180, 120, 10, 30);
        noStroke();
        circle(x, y, random(30, 45));
    }
    pop();
}

function drawIrisFoggy1() {
    push();
    for (let i = 0; i < 100; i = i + 2) {
        let deg = random(360);
        let radDist = random(40, 70);
        let x = cos(radians(deg)) * radDist;
        let y = sin(radians(deg)) * radDist;

        fill(150, 170, 200, 40);
        noStroke();
        circle(x, y, random(30, 60));
    }
    pop();
}

function drawIrisFoggy2() {
    push();
    for (let i = 0; i < 250; i++) {
        let deg = random(360);
        let radDist = random(120, 125);
        let x = cos(radians(deg)) * radDist;
        let y = sin(radians(deg)) * radDist;

        fill(150, 170, 200, 30);
        noStroke();
        circle(x, y, random(15, 25));
    }
    pop();
}

function drawIris05(spd) {
    for (let deg = 0; deg < 360; deg += 30) {
        push();
        let x = cos(radians(deg)) * 110;
        let y = sin(radians(deg)) * 110;
        translate(x, y);
        let angle = radians(deg) + frameCount * spd;
        rotate(angle);
        noStroke();
        let r = map(sin(frameCount * 0.05 + deg * 0.1), -1, 1, 150, 255);
        let g = map(sin(frameCount * 0.04 + deg * 0.2), -1, 1, 200, 255);
        let b = map(sin(frameCount * 0.03 + deg * 0.3), -1, 1, 100, 200);
        fill(r, g, b);
        circle(0, 0, map(sin(frameCount * 0.05), -1, 1, 15, 23));
        pop();
    }
}

function drawTears() {
    noFill();
    stroke(173, 216, 230, 210);
    strokeWeight(10);
    arc(0, -22, 490, 340, PI * 0.15, PI * 0.85);
    fill(173, 216, 230, 180);
    noStroke();
    let offsetY = random(5, 30);
    ellipse(tearX, tearY, tearDiameter, 30);
    tearY += tearSpeed;
    if (tearY > height) {
        tearY = 160;
    }
}

function keyPressed() {
    if (keyCode == DOWN_ARROW || keyCode == RIGHT_ARROW) {
        mode++;
    } else if (keyCode == UP_ARROW || keyCode == LEFT_ARROW) {
        mode--;
    }
    mode = constrain(mode, 0, 4);
}

function mouseReleased() {
    mode++;
    if (mode == 5) {
        mode = 0;
    }
}
