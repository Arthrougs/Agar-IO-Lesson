var playerX;
var playerY;

var playerScore;
var slimes = [];


function setup()
{
	createCanvas(window.innerWidth,window.innerHeight);	//<---- Create game window
	playerX = width/2; //<--- Set player x-coord
	playerY = height/2; //<-- Set player y-coord
	playerScore = 1; // set Score
	
	for(var i = 0; i<200; i++) //<--- Create score dots
	{
		slimes[i] = new Slime();
	}
}

function draw()
{
	background(0); //<--draw background (Color on inside)
	
	//Slime stuff!
	for(var i = 0; i<slimes.length; i++) //<-- draw score dots
	{
		slimes[i].show();
	}
	
	//Draw Player
	fill(255); //<---- Color (RGB or Hex)
	ellipse(playerX, playerY, 20+playerScore, 20+playerScore); //<----- Player size. (x-coord, y-coord, sizeHori, sizeVert)
	
	
	//Draw Score
	textSize(32); //<---Text Size
	text("Score: " + Math.trunc(playerScore), (width/2)-50, 40); //<---Text (message, x-coord, x-coord)
	fill(255); //<-- text color RGB
	
	
	//Player movement-----------------------------------
	//Move Right
	if(keyIsDown(68)) //<-- Check if key is down 68 = D key
	{
		playerX = playerX + 5; //<-- Move player right 5 pixels
	}
	
	//Move Left
	if(keyIsDown(65))//<-- Check if key is down 65 = A key
	{
		playerX = playerX - 5;//<-- Move player left 5 pixels
	}
	
	//Move Up
	if(keyIsDown(87))//<-- Check if key is down 87 = W key
	{
		playerY = playerY - 5;//<-- Move player up 5 pixels
	}
	
	//Move Down
	if(keyIsDown(83))//<-- Check if key is down 83 = S key
	{
		playerY = playerY + 5;//<-- Move player down 5 pixels
	}
	
	
	for(var i = 0; i<slimes.length; i++) //<--Loop through all slime dots to check if they are colliding with Player
	{
		var hit = false; //<--Set hit to false every time you loop around for each dot
		hit = collideCircleCircle(playerX, playerY, 20+playerScore, slimes[i].x, slimes[i].y, 10); //<-- Check if player collides with specified slime. If so return true
		if(hit) //<-- If hit is true
		{
			slimes[i].teleport(); //<-- Move dot to new location
			playerScore = playerScore + .7; //<--- add to score
		}
			
	}
	playerScore -= .0005*playerScore; //<-- This is a decay so the player does nothing the player will decrease in size. Decay increases the larger the player gets
	if(playerScore < 0) //<-- prevents score from going negative
		playerScore = 1;
}



function Slime() //<Slime object
{
	this.x = random(width); //<-- set slime x-coord to random place
	this.y = random(height);//<-- set slime y-coord to random place
	
	this.show = function() //<-- Function to show slime
	{
		fill(0,255,0);//<-- slime color
		ellipse(this.x, this.y, 10, 10); //<-- slime size
	}
	
	this.teleport = function() //<-- function to move slime
	{
		this.x = random(width);
		this.y = random(height);
	}
	
}


