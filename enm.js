class Enm{
    constructor(x){
        this.r = 50;
        this.x = (x+1)*1000 ;
        this.return = (x+1)*1000
        this.y = height - this.r;
        this.speed = 13;
        this.rspa = 0;
    }
    move(){
        this.x -= this.speed;
    
    }
    pos(){
        return[this.x , this.y];
    }
    show(){
        fill(255,165,0);
        image(enme,this.x,this.y,this.r,this.r);
    }
    resp(){
        if (this.x-this.r <= -150){
            this.x = 3000 + Math.floor(Math.random()*250)+this.speed * 2;
            this.speed += 0.5;
            console.log(this.speed,this.x);
            this.rspa += 1;
        }
    }
    scor(){
        return this.rspa;
    }
    reset(){
        this.x = this.return
        this.speed = 13;
        this.rspa = 0;
    }
   
}
