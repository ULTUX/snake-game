// 1 w prawo
// 2 w lewo
// 3 w gore
// 4 w dol

let snake;
function setup(){
    createCanvas(750, 750);
    snake = new Snake(Math.floor(random(0, Math.floor(width/res)*res)/res)*res, Math.floor(random(0, Math.floor(height/res)*res)/res)*res);
    frameRate(10);
}

function draw(){
    clear();
    background(0, 0, 0);
    snake.spawnFood();
    snake.move();
    snake.ifEaten();
    snake.gameEnd();
}


let timer;
function keyPressed(){
    if (frameCount != timer){
        if (keyCode == 39) {
            snake.setDirection(1);
            snake.addLastCords(snake.translate(snake.x), snake.translate(snake.y), snake.direct);
        }
        else if (keyCode == 37) {
            snake.setDirection(2);
            snake.addLastCords(snake.translate(snake.x), snake.translate(snake.y), snake.direct);
    
            }
        else if (keyCode == 38) {
            snake.setDirection(3);
            snake.addLastCords(snake.translate(snake.x), snake.translate(snake.y), snake.direct);
    
            }
        else if (keyCode == 40) {
            snake.setDirection(4);
            snake.addLastCords(snake.translate(snake.x), snake.translate(snake.y), snake.direct);
            }
            timer = frameCount;
    }

}