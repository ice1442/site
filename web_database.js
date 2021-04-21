let a = 50;
let b = 1;
let c = true;
let block;
let enms = [];
let robo;
let start = true;
let team = "";
let alist = [];
let blist = [];
let clist = [];
let addstopper = false;
let mytablea = document.getElementById("tablea");
let mytableb = document.getElementById("tableb");
let mytablec = document.getElementById("tablec");
let headersa = ['Name','Score','A'];
let headersb = ['Name','Score','B'];
let headersc = ['Name','Score','C'];

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

let team_a = document.getElementById("team_a");
let team_b = document.getElementById("team_b");
let team_c = document.getElementById("team_c");
let button = document.getElementById("button");

team_a.addEventListener("click", function(){
    team = "team A";
});
team_b.addEventListener("click", function(){
    team = "team B";
});
team_c.addEventListener("click", function(){
    team = "team C";
});

button.addEventListener("click", function(){
    if (addstopper == false){
        addstopper = true
        names = document.getElementById("names").value;
        if (team == ""){
            alert("please pick a team")
        }
        if (names == "" ){
            alert("please enter name");
        }
        if (names != "" && team != ""){
            swap()
        }
    }
});

var refa = firebase.database().ref('records/team A');
refa.orderByChild("score").on("child_added", function(data) {
    helloa = {name : data.val().name,score : data.val().score}
    alist.push(helloa);
});
let sorta = alist.sort(function(a,b){
    console.log(b.score - a.score);
    return b.score - a.score;
});
var refb = firebase.database().ref('records/team B');
refb.orderByChild("score").on("child_added", function(data) {
    hellob = {name : data.val().name,score : data.val().score}
    blist.push(hellob);
});
let sortb = blist.sort(function(a,b){
    return b.score - a.score;
});
var refc = firebase.database().ref('records/team C');
refc.orderByChild("score").on("child_added", function(data) {
    helloc = {name : data.val().name,score : data.val().score}
    clist.push(helloc);
});
let sortc = clist.sort(function(a,b){
    return b.score - a.score;
});

function text_a(){
    let tablea = document.createElement('tablea');
    let headerRow = document.createElement('tr');
    headersa.forEach(headertext => {
        let headera = document.createElement('th');
        let textNode = document.createTextNode(headertext);
        headera.appendChild(textNode);
        headerRow.appendChild(headera);
    });
    tablea.appendChild(headerRow);
    sorta.forEach(player =>{
        let row = document.createElement('tr');
        console.log("hello")
        Object.values(player).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        });
        tablea.appendChild(row);
    });
    mytablea.appendChild(tablea);
}
function text_b(){
    let tableb = document.createElement('tableb');
    let headerRow = document.createElement('tr');
    headersb.forEach(headertext => {
        let headerb = document.createElement('th');
        let textNode = document.createTextNode(headertext);
        headerb.appendChild(textNode);
        headerRow.appendChild(headerb);
    });
    tableb.appendChild(headerRow);
    sortb.forEach(player =>{
        let row = document.createElement('tr');
        console.log("hello")
        Object.values(player).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        });
        tableb.appendChild(row);
    });
    mytableb.appendChild(tableb);
}
function text_c(){
    let tablec = document.createElement('tablec');
    let headerRow = document.createElement('tr');
    headersc.forEach(headertext => {
        let headerc = document.createElement('th');
        let textNode = document.createTextNode(headertext);
        headerc.appendChild(textNode);
        headerRow.appendChild(headerc);
    });
    tablec.appendChild(headerRow);
    sortc.forEach(player =>{
        let row = document.createElement('tr');
        console.log("hello")
        Object.values(player).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            cell.appendChild(textNode);
            row.appendChild(cell);
        });
        tablec.appendChild(row);
    });
    mytablec.appendChild(tablec);
}
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
            b -= 1;
        }
        if(a <50){
            b += 1;
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
            block.show();

            for(let e of enms){
                if (distance(e) < 50){
                    addstopper = false;
                    var data = {
                        name: names,
                        score: x,
                    }
                    var refpush = firebase.database().ref('records/'+ team);
                    refpush.push(data);
                    text_a();
                    text_b();
                    text_c();
                    console.log(sorta);
                    console.log(sortb);
                    console.log(sortc);
                    alert(" game over \n score : " + x + "\n press the start button to restart ");
                    c = true;
                    start = false;
                    x = 0;
                    for(let e of enms){
                        e.reset();
                    }
                }
            }
        text("score: " + x,(window.innerWidth/2),20);
        }
    }
}