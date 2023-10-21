// game variables declaration 

let inputDr ={x:0, y:0};
const gameover=new Audio('assets/Game_Over.wav');
const move=new Audio('assets/Move.mp3');
const gamemusic=new Audio('assets/Musix.wav');
const crunch= new Audio('assets/apple_crunch.wav');
let lastpaint_time=0;
let head=document.querySelector('.head');
console.log(head);
let speed=5;
let headdir=0;
let snakeArr=[
    {x:10,y:8}
];
let highscore=0;
console.log(...snakeArr);
let sc=document.querySelector('.scorecard');
let hs=document.querySelector('.highscore');
let score=0;
let food=
    {x:5,y:15}

const b=document.getElementById('board');


// game funcitons
function main(ctime)
{
    gamemusic.play();
    window.requestAnimationFrame(main);
    if ((ctime-lastpaint_time)/1000<(1/speed)){
        return ;
    }
    // console.log(ctime);
    lastpaint_time=ctime;
    gameEngine();
    
}

function isCollide(sarr)
{
    // if you bump yourself
    for(let i=1;i<sarr.length;i++)
    {
        if (sarr[0].x===sarr[i].x && sarr[0].y===sarr[i].y)
        {
           
            return true;
        }
    }
    // if you bump into the wall
    if(sarr[0].x>20 ||sarr[0].x<1||sarr[0].y>20||sarr[0].y<1)
    {
        return true;
    }

}
function gameEngine()
{
    // updating the snake array and the food

    if (isCollide(snakeArr))
    {
        console.log('Your score is',score);
        sc.innerHTML=`Your score is ${score}`;
        gameover.play();
        gamemusic.pause();
        inputDr={x:0, y:0};
        snakeArr=[
            {x:10,y:8}
        ];
        if(score>highscore)
        {
            highscore=score;
            hs.innerText=highscore;

        }
        score=0;
        alert('Game Over Press any key to play again!');
    }

    // if the snake has eaten the apple then 
        if(snakeArr[0].x===food.x && snakeArr[0].y===food.y)
        {
            // play food eating music
            crunch.play();
            score+=1
            sc.innerHTML=`Your score is ${score}`;
            // add a new head to the length of the snake 
            console.log(snakeArr);
            snakeArr.unshift({x:snakeArr[0].x+inputDr.x, y:snakeArr[0].y+inputDr.y});
            console.log(snakeArr);
            // regenerate the food 
            food={x:Math.round(1+(20-1)*Math.random()),y:Math.round(1+(20-1)*Math.random())};


        }

    // Moving the snake

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x=snakeArr[0].x+inputDr.x;
    snakeArr[0].y=snakeArr[0].y+inputDr.y;
    b.innerHTML="";
     // display the snake and the food
    //  Display the snake
    snakeArr.forEach((e,index) => {
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if (index==0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        b.appendChild(snakeElement);
        
    });

    // Display the food
    foodElement=document.createElement('div');
  
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    b.appendChild(foodElement);
    // console.log(foodElement)

   
}

// main logic stats here

window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    let newdr=headdir;
    move.play();
    // inputDr={x:0,y:1};
    switch (e.key)
    {
        case 'ArrowUp':
            console.log('ArrowUp');
            inputDr.x=0;
            inputDr.y=-1;
            newdr=0; //rotate upwards
            console.log(inputDr);
            break;
        
        case 'ArrowDown':
            console.log('ArrowDown');
            inputDr.x=0;
            inputDr.y=1;
            console.log(inputDr);
            newdr=180;//rotate downwards
            break;
        case 'ArrowLeft':
            console.log('ArrowLeft');
            inputDr.x=-1;
            inputDr.y=0;
            newdr=270
            console.log(inputDr);
            break;
        case 'ArrowRight':
            console.log('ArrowRight');
            inputDr.x=1;
            inputDr.y=0;
            newdr=90;
            console.log(inputDr);
            break;
                    
        
    }
    if(newdr!=headdir)
    {
        head.style.transform=`rotate${newdr}deg`;
        console.log(head.style.transform);
    }
});
