// 1 w prawo
// 2 w lewo
// 3 w gore
// 4 w dol

let res = 15;

class Snake {
    constructor (x, y){
        this.num = 0;
        this.x = this.translate(x);
        this.gameFinished = false;
        this.y = this.translate(y);
        this.direct;
        if (width - this.x > this.x) this.direct = 1; 
        else this.direct = 2;
        this.length = 3;
        this.food = [];
        this.snakeParts = [];
        if (this.direct == 1) this.snakeParts.push(new SnakePart([this.translate(this.x-res), this.translate(this.y)], this.direct))
        else this.snakeParts.push(new SnakePart([this.translate(this.x+res), this.translate(this.y)], this.direct))
        for (let i = 0; i < this.length-1; i++){
            this.snakeParts.push(new SnakePart(this.getCords(i), this.direct));
        }
        let lastx = 0;
        let lasty = 0;
    }


    spawnFood(){
        if (Math.random() < 0.2){
            this.food.push({
                x: this.translate(Math.random()*width),
                y: this.translate(Math.random()*height)
            });
        }
    }

    ifEaten(){
        for (let i of this.food){
            if (this.translate(this.x) == this.translate(i.x) && this.translate(this.y) == this.translate(i.y)){
                this.food.splice(this.food.indexOf(i), 1);
                let lastdirect = this.snakeParts[this.snakeParts.length-1].direct;
                this.snakeParts.push(new SnakePart(this.getCords(), lastdirect));
                this.snakeParts[this.snakeParts.length-1].lastCords = this.snakeParts[this.snakeParts.length-2].lastCords.slice(0);
                
            }
        }
    }

    addOne(){
        let lastdirect = this.snakeParts[this.snakeParts.length-1].direct;
        this.snakeParts.push(new SnakePart(this.getCords(), lastdirect));
        this.snakeParts[this.snakeParts.length-1].lastCords = [...this.snakeParts[this.snakeParts.length-2].lastCords];
    }


    gameEnd(){
        if (this.translate(this.x) <= 0 || this.translate(this.x) >= this.translate(width) ||
            this.translate(this.y) <= 0 || this.translate(this.y) >= this.translate(this.height)) this.gameFinished = true;

        for (let i = 0; i < this.snakeParts.length; i++){
            if (this.translate(this.x) == this.translate(this.snakeParts[i].x) && this.translate(this.y) == this.translate(this.snakeParts[i].y)) this.gameFinished = true;
        }
    }



    translate(coord){
        return Math.floor(coord/res)*res;
    }

    addLastCords(x, y, dir){
        for (let i of this.snakeParts){
            i.lastCords.push( {
                x: x,
                y: y,
                direct: dir
            });
        }
    }

    getCords(){
        let length = this.snakeParts.length;
        if (this.snakeParts[length-1].direct == 1) return [this.translate(this.snakeParts[length-1].x-res), this.translate(this.snakeParts[length-1 ].y)];
        else if (this.snakeParts[length-1].direct == 2) return [this.translate(this.snakeParts[length-1].x+res), this.translate(this.snakeParts[length-1].y)];
        else if (this.snakeParts[length-1].direct == 3) return [this.translate(this.snakeParts[length-1].x), this.translate(this.snakeParts[length-1].y)];
        else if (this.snakeParts[length-1].direct == 4) return [this.translate(this.snakeParts[length-1].x), this.translate(this.snakeParts[length-1].y+res)];
    }

    setDirection = (n)=>{
        if (this.lastx != this.x || this.lasty != this.y && (n == 1 || n == 2 || n == 3 || n == 4)){
            this.lastx = this.x;
            this.lasty = this.y;
            this.direct = n;
            this.addLastCords(this.translate(this.x), this.translate(this.y), this.direct);
        }
    }

    move = () =>{
        if (!this.gameFinished){
            if (this.direct == 1) {
                this.x += res;
            }
            else if (this.direct == 2){ 
                this.x -= res;
            }
            else if (this.direct == 3){
                 this.y -= res;
            }
            else if (this.direct == 4){
                this.y += res;
            }
            square(this.x, this.y, res);
            
            for (let i of this.food) square(i.x, i.y, res);
    
            for (let i = 0; i < this.snakeParts.length; i++){
                this.snakeParts[i].move();
                square(this.snakeParts[i].x, this.snakeParts[i].y, res);
                if (this.snakeParts[i].lastCords[0] != null)
                if (this.translate(this.snakeParts[i].x) == this.snakeParts[i].lastCords[0].x &&
                this.translate(this.snakeParts[i].y) == this.translate(this.snakeParts[i].lastCords[0].y))  
                {   
                    this.snakeParts[i].direct = this.snakeParts[i].lastCords[0].direct
                    this.snakeParts[i].lastCords.shift();
                }
    
            }
        }
    }
}


class SnakePart{
    constructor(coords, direct){
        this.x = coords[0];
        this.y = coords[1];
        this.direct = direct;
        this.lastCords = [];
    }

    move (){
        if (this.direct == 1) {
            this.x += res;
        }
        else if (this.direct == 2){ 
            this.x -= res;
        }
        else if (this.direct == 3){
             this.y -= res;
        }
        else if (this.direct == 4){
            this.y += res;
        }
    }
}