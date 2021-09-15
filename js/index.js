//agme constants and var
let inputdir = {x:0, y:0};
const foodsound = new Audio('../food.wav');
const gameoversound = new Audio('../game_over.wav');
const movesound = new Audio('../move.wav');
const musicsound = new Audio('../music.mp3');
let speed = 6;
lastPaintTime =0;
let snakearr = [
    {x:13, y:15}
]
food = {x:6, y:7};
let score =0;

//game func
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime- lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;

    gameengine();
}

function iscollide(sarr){
    for (let index = 1; index < snakearr.length; index++) {
        if(snakearr[index].x === snakearr[0].x && snakearr[index].y === snakearr[0].y){
            return true;
        }    
    }
    // if(snakearr[0].x > 18 || snakearr[0].x<0 || snakearr[0].y > 18 || snakearr[0].y<0){
    //     return true;
    //}
    //return false;
}

function gameengine(){
    musicsound.play();
    // part 1: update the snake array
    if(iscollide(snakearr)){
        musicsound.pause();
        gameoversound.play();
        inputdir =  {x:0, y:0};
        alert("Game over press any key to paly again");
        snakearr = [{x:13, y:15}];
        //musicsound.play();
        score =0;
    }

    // if you ahve eaten the food increate the score and regenerate the food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score > highval){
            highval = score;
            localStorage.setItem("highscore", JSON.stringify(highval));
            highscoreBox.innerHTML = "HighScore: " + highval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakearr.unshift({x:snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y});
        let a =2;
        let b = 16; 
        food = {x:2+Math.round(a + (b-a)* Math.random()), y:2+Math.round(a + (b-a)* Math.random())};
    }

    // moving snake
    if(snakearr[0].x > 18 || snakearr[0].x<0){
        for (let i = snakearr.length -2; i >=0; i--){
        
            snakearr[i+1] = {...snakearr[i]};
        }
        switch (snakearr[0].x) {
            case 19:
                snakearr[0].x = inputdir.x;
                break;
        
            case -1:
                snakearr[0].x = 18;
                break;
        }
    } else if(snakearr[0].y > 18 || snakearr[0].y<0){
        for (let i = snakearr.length -2; i >=0; i--){
        
            snakearr[i+1] = {...snakearr[i]};
        }
        switch (snakearr[0].y) {
            case 19:
                snakearr[0].y = inputdir.y;
                break;
        
            case -1:
                snakearr[0].y = 18;
                break;
        }
    } else{
        for (let i = snakearr.length -2; i >=0; i--){
        
            snakearr[i+1] = {...snakearr[i]};
        }
        snakearr[0].x += inputdir.x;
        snakearr[0].y += inputdir.y;
    }
    
    

    

   //part 2: render the snake and food
    board.innerHTML = "";
    snakearr.forEach((e, index) =>{
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if(index===0){
            snakeelement.classList.add('head');
        } else{
            snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    })
    //display food
    foodlement = document.createElement('div');
    foodlement.style.gridRowStart = food.y;
    foodlement.style.gridColumnStart = food.x;
    foodlement.classList.add('food');
    board.appendChild(foodlement);
 
}



// main logic
let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highval =0;
    localStorage.setItem("highscore", JSON.stringify(highval));
} else{
    highval = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore: " + highval; 
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputdir = {x:0, y:0}// start game;
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowup");
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("arrowdown");
            inputdir.x = 0;
            inputdir.y = 1;
            break;
        case "ArrowLeft":
            console.log("arrowleft");
            inputdir.x = -1;
            inputdir.y = 0;
            break;
            
        case "ArrowRight":
            console.log("arrowright");
            inputdir.x = 1;
            inputdir.y = 0;
            break;
    
        // default:
        //     break;
    }
});
