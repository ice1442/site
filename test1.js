function setup() {

}

function draw() {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World",10,50);
ctx.fillStyle = "white"
}
