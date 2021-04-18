let a = 50;
let b = 1;
let c = true;
let block;
let enms = [];
let robo;
let start = true;

var firebaseConfig = {
  apiKey: "AIzaSyAvxV4X5B7hIU83LnM1HBDzbR-f1KeZ3mI",
  authDomain: "test-fcfd7.firebaseapp.com",
  databaseURL: "https://test-fcfd7-default-rtdb.firebaseio.com",
  projectId: "test-fcfd7",
  storageBucket: "test-fcfd7.appspot.com",
  messagingSenderId: "1010740950075",
  appId: "1:1010740950075:web:14b3c60b0cf94221c1981e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function swap(){
    c = false;
}

let button = document.getElementById("button");

button.addEventListener("click", function(){
    name = document.getElementById("names").value;

    if (name == "" ){
        alert("please enter name");
    }
    swap()
})

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
    if (c == false){
        if(a >205){
            b -= 1
        }
        if(a <50){
            b += 1
        }
        a += b;
        background(a,a,a);
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
            block.show()

            for(let e of enms){
                if (distance(e) < 50){
                    var data = {
                        name: name,
                        score: x,
                    }
                    var database = firebase.database();
                    var ref = database.ref("records");
                    ref.push(data);

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
}
