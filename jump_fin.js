let block;
let enms = [];
let robo;
let start = true;

function preload(){
  robo = loadImage('pic/hello.png');
  enme = loadImage('pic/enme.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight/2);
  block = new Block();
  for (var i = 0;i < 3;i++){
    enms.push (new Enm(i+1));
  }
  alert("press space to start");
}

function keyPressed(){
  if (key == ' ') {
    block.jump();
  }

}

function distance(x){
  xpos = x.pos()[0]-block.pos()[0];
  ypos = x.pos()[1]-block.pos()[1];
  return (Math.sqrt(Math.pow(xpos,2)+Math.pow(ypos,2),2))

}


function draw() {
  background(50);
  var x = 0;
  if(key == ' '){
    start = true;
  }
  if (start == true){
    for(let e of enms){
      e.move();
      e.show();
      e.resp();
      x += e.scor();
    }

    block.move();
    block.show();
    
    for(let e of enms){
      if (distance(e) < 50){
        alert(" game over \n score : " + x + "\n press space to restart ");
        start = false;
        x = 0
        for(let e of enms){
          e.reset();
        }
      }
    }
    text("score: " + x,(window.innerWidth/2),20);
  }
}