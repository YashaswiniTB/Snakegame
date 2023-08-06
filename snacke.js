const gameboard=document.querySelector("#gameboard");
const ctx=gameboard.getContext("2d");
const scoretext=document.querySelector("#score");
const resetbtn=document.querySelector("#resetbtn");
const gamewidth=gameboard.width;
const gameheight=gameboard.height;
const boardbackground="white";
const snakecolor="lightgreen";
const snakeborder ="black";
const foodcolor="red";
const unitsize=25;
let running=false;
let xvelocity=unitsize;
let yvelocity=0;
let foodx;
let foody;
let score=0;

let snacke=[
{x:unitsize, y:0},
{x:unitsize*2,y:0},
{x:unitsize*3,y:0},
{x:unitsize*4,y:0},
{x:0,y:0}

];
window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click",resetgame);
gamestart();

function gamestart(){
    running=true;
    scoretext.textContent=score;
    createfood();
    drawfood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(() => {
            clearboard();
            drawfood();
            movesnacke();
            drawsnake();
            checkgameover();
            nextTick();
        },100);
    }
    else{
        displaygameover();
    }
};
function clearboard(){
    ctx.fillStyle=boardbackground;
    ctx.fillRect(0,0,gamewidth,gameheight);

}

function createfood(){
    function randomfood(min,max){
        const random=(Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize );
                return random;
    }
    foodx=randomfood(0, gamewidth-unitsize);
    foody=randomfood(0, gamewidth-unitsize);

};
function drawfood(){
    ctx.fillStyle=foodcolor;
    ctx.fillRect(foodx, foody, unitsize, unitsize);
};
function movesnacke(){
    const head={x:snacke[0].x+xvelocity,
    y:snacke[0].y+yvelocity};
    snacke.unshift(head);
    if(snacke[0].x==foodx && snacke[0].y==foody){
        score+=1;
        scoretext.textContent=score;
        createfood();
//if food was eaten
    }
    else{
        snacke.pop();
    }

};
function drawsnake(){
    ctx.fillStyle=snakecolor;
    ctx.strokeStyle=snakeborder;
    snacke.forEach(snakepart =>{
    ctx.fillRect(snakepart.x, snakepart.y,unitsize,unitsize);
    ctx.strokeRect(snakepart.x, snakepart.y,unitsize,unitsize);
    })
    
};
function changedirection(event){
const keypressed=event.keyCode;
const left=37;
const right=39;
const up=38;
const down=40;
const goingUp=(yvelocity== -unitsize);
const goingdown=(yvelocity== unitsize);
const goingright=(xvelocity== unitsize);
const goingleft=(xvelocity== unitsize);
switch(true){
    case(keypressed==left && !goingright):
        xvelocity=-unitsize;
        yvelocity=0;
        break;
    case(keypressed==up && !goingdown):
        xvelocity=0;
        yvelocity=-unitsize;
        break;
    case(keypressed==right && !goingleft):
        xvelocity=unitsize;
        yvelocity=0;
        break;
    case(keypressed==down && !goingUp):
        xvelocity=0;
        yvelocity=unitsize;
        break;
  
} 

};
function checkgameover(){
    switch(true){
        case(snacke[0].x < 0):
            running=false;
            break;
        case(snacke[0].x >= gamewidth):
            running=false;
            break;
        case(snacke[0].y < 0):
            running=false;
            break;
        case(snacke[0].y >= gameheight):
            running=false;
            break;
    }
    for(let i=1;i<snacke.length;i++){
        if(snacke[i].x==snacke[0].x && snacke[i].y==snacke[0].xvelocity){
            running=false;
        }
    }

};
function displaygameover(){
    ctx.font="50px MV Boli";
    ctx.fillStyle="black";
    ctx.textAlign="center";
    ctx.fillText("GAME OVER", gamewidth/2, gameheight/2);
    running=false;
};
function resetgame(){
    score=0;
    xvelocity=unitsize;
    yvelocity=unitsize;
    snacke=[
        {x:unitsize, y:0},
        {x:unitsize*2,y:0},
        {x:unitsize*3,y:0},
        {x:unitsize*4,y:0},
        {x:0,y:0}
        
        ];
        gamestart();
};