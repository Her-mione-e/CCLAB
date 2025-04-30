let cam;
let img; // empty image


function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");


  cam = createCapture(VIDEO);
  cam.hide();


  img = createImage(640, 480); // blank image


  background(255);
}


function draw() {
  background(255);


  cam.loadPixels();
  img.loadPixels();
  for (let y = 0; y < cam.height; y++) {
    for (let x = 0; x < cam.width; x++) {
      let index = (x + y * cam.width) * 4;
      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];
      //let a = cam.pixels[index + 3];


      img.pixels[index + 0] = r + 100;
      img.pixels[index + 1] = g + 100;
      img.pixels[index + 2] = b + 100;
      img.pixels[index + 3] = 255; // alpha
    }
  }
  img.updatePixels();


  image(img, 0, 0);
}
