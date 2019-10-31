var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//Players & ball
var orange = { x:(canvas.width/2)-35 ,y: canvas.height-30 ,width:70 ,height:10 , color:"#D2691E",score:0 ,scoreBoard :document.getElementById("orange") , areaColor:"#FFE4E1" , middleColor:"#FF6347" , borderColor: "#FF6347"};
var blue = { x:(canvas.width/2)-35 ,y: 20 ,width:70 ,height:10 , color:"#1E90FF" ,score:0 ,scoreBoard :document.getElementById("blue") , areaColor:"#F0F8FF" , middleColor:"#87CEFA" , borderColor: "#4682B4"};
var ball = { x:canvas.width/2 , y: canvas.height/2, r:5 , color: "#9ACD32", xSpeed:1 ,ySpeed:1 };

//Other varaibles
var keyPressed = { right:false , left:false ,up: false , down: false , keyA: false, keyD: false, keyW: false , keyS: false };
var movementSpeed = 1;
var gameStart = false;

//events
document.onkeydown = checkKey;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var interval;
drawBorder();
update();

function update()//Update every frame
{
    ctx.beginPath();
    ctx.clearRect(10, 10, canvas.width-20, canvas.height-20);//Clearing Canvas
    drawAreas();
    drawPlayer(orange);
    drawPlayer(blue);
    drawBall();
    ctx.closePath();
    movePlayers();

    if( ball.x+ball.r >= canvas.width-10)//when touch right wall
    {
        ball.xSpeed*=-1;
    }
    if( ball.x+ball.r <= 20)//when touch left wall
    {
        ball.xSpeed*=-1;
    }

    if(ball.y+ball.r >= orange.y && ball.x >= orange.x && ball.x <= orange.x+orange.width && ball.y <= orange.y+(orange.height/2))//when touch left Orange
    {
        ball.ySpeed = -1;
    }
    if(ball.y-ball.r <= blue.y+blue.height && ball.x >= blue.x && ball.x <= blue.x+blue.width && ball.y >= blue.y-(blue.height/2))//when touch left Blue
    {
        ball.ySpeed = 1;
    }

    if(ball.y + ball.r >= canvas.height - 10)//Blue Scored
    {
        playerGoal(blue);
    }
    if(ball.y - ball.r <= 10)//Orange Scored
    {
        playerGoal(orange);
    }

    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
}

function movePlayers()
{
    //Orange Movement
    if(keyPressed.right && orange.x + orange.width < canvas.width-10) 
    {
        orange.x += movementSpeed;
    }
    else if(keyPressed.left && orange.x > 10) 
    {
        orange.x -= movementSpeed;
    }
    if(keyPressed.up && orange.y >canvas.height/2) 
    {
        orange.y -= movementSpeed;
    }
    else if(keyPressed.down && orange.y+orange.height < canvas.height-10) 
    {
        orange.y += movementSpeed;
    }
    //Blue Movement
    if(keyPressed.keyD && blue.x + blue.width < canvas.width-10) 
    {
        blue.x += movementSpeed;
    }
    else if(keyPressed.keyA && blue.x > 10) 
    {
        blue.x -= movementSpeed;
    }
    if(keyPressed.keyW && blue.y > 10) 
    {
        blue.y -= movementSpeed;
    }
    else if(keyPressed.keyS && blue.y+blue.height < canvas.height/2) 
    {
        blue.y += movementSpeed;
    }
}

function drawPlayer(player)//Draw sended player
{
    ctx.beginPath();
    ctx.rect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

function playerGoal(player)
{
    player.score += 1;
    player.scoreBoard.innerHTML = player.score;
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    //Sets after the goal who starts
    if ( player == orange)
    {
        ball.ySpeed= -1;
    }
    else
    {
        ball.ySpeed= 1;
    }
}


function drawBall()
{
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawAreas()
{
    ctx.beginPath();//Drawing blue area
    ctx.rect(10, 10, canvas.width-20, canvas.height/2);
    ctx.fillStyle = blue.areaColor;
    ctx.fill();
    ctx.beginPath();//Drawing orange area
    ctx.rect(10, canvas.height/2, canvas.width-20, (canvas.height/2)-10);
    ctx.fillStyle = orange.areaColor;
    ctx.fill();
    ctx.beginPath();//first part of middle
    ctx.arc(canvas.width/2, canvas.height/2, 50,Math.PI,Math.PI*2);
    ctx.fillStyle = blue.middleColor;
    ctx.fill();
    ctx.beginPath();//second part of middle
    ctx.arc(canvas.width/2, canvas.height/2, 50, 0,Math.PI);
    ctx.fillStyle = orange.middleColor;
    ctx.fill()
    ctx.closePath();
}

function drawBorder()//Draws border of canvas
{
    ctx.beginPath();//Drawing blue border
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = blue.borderColor;
    ctx.fill();
    ctx.beginPath();//Drawing orange border
    ctx.rect(0, canvas.height/2, canvas.width, canvas.height);
    ctx.fillStyle = orange.borderColor;
    ctx.fill();
    ctx.closePath();
}

function keyDownHandler(e) 
{
    if(e.keyCode == 39)//right
    {
        keyPressed.right = true;
    }
    else if(e.keyCode == 37)//left
    {
        keyPressed.left = true;
    }
    if(e.keyCode == 38)//up
    {
        keyPressed.up = true;
    }
    else if(e.keyCode == 40)//down
    {
        keyPressed.down = true;
    }
    if(e.keyCode == 68)//D
    {
        keyPressed.keyD = true;
    }
    else if(e.keyCode == 65)//A
    {
        keyPressed.keyA = true;
    }
    if(e.keyCode == 87)//W
    {
        keyPressed.keyW = true;
    }
    else if(e.keyCode == 83)//S
    {
        keyPressed.keyS = true;
    }    
}

function keyUpHandler(e) 
{
    if(e.keyCode == 39)//right
    {
        keyPressed.right = false;
    }
    else if(e.keyCode == 37)//left
    {
        keyPressed.left = false;
    }
    if(e.keyCode == 38)//up
    {
        keyPressed.up = false;
    }
    else if(e.keyCode == 40)//down
    {
        keyPressed.down = false;
    }
    if(e.keyCode == 68)//D
    {
        keyPressed.keyD = false;
    }
    else if(e.keyCode == 65)//A
    {
        keyPressed.keyA = false;
    }
    if(e.keyCode == 87)//W
    {
        keyPressed.keyW = false;
    }
    else if(e.keyCode == 83)//S
    {
        keyPressed.keyS = false;
    } 
}

function checkKey(e) 
{    
    e = e || window.event;

    if (e.keyCode == '32') 
    {
        if(gameStart)//if game is running stop game
        {
            clearInterval(interval);
            gameStart = false
        }
        else//else starts game
        {
            interval = setInterval(update, 1);
            gameStart = true;
        }
    }
}