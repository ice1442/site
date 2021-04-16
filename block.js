class Block{
    constructor(){
        this.r = 50;
        this.x = this.r + 100;
        this.y = height - this.r;
        this.vy = 0;
        this.g = 0.5;
    }
    
    jump(){
        if (this.y >= height - this.r-60){
          this.vy = -10;
        } 
    }

    pos(){
        return[this.x,this.y]
    }

    move(){
        this.y += this.vy;
        this.vy +=this.g;
        this.y = constrain(this.y, 0, height - this.r);
        
    }
    show(){
        image(robo,this.x,this.y,this.r,this.r);
        
    }
    
}
