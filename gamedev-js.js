const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const scoreOne = document.querySelector('span');
const scoreTwo = document.querySelector('span + span');

let first = 0;
let second = 0;
let paddlespeed = 3;

const paddleOne = {x:10,y:10,width:12,height:60};
const paddleTwo = {x:580,y:10,width:12,height:60};

const ball = {x:300,y:20,vx:1,vy:1};

paddleOne.draw = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
};
paddleTwo.draw = function() {
	ctx.fillStyle = "white";
	ctx.fillRect(this.x, this.y, this.width, this.height);
	
};

document.addEventListener('keydown', function(e){
	e.preventDefault();
	console.log(e.code);
	if(e.code == "KeyS"&&paddleOne.y+paddleOne.height<canvas.height) paddleOne.y +=paddlespeed;
	else if(e.code == "KeyW"&&paddleOne.y>0) paddleOne.y -=paddlespeed;
	if(e.code == "ArrowDown"&&paddleTwo.y+paddleTwo.height<canvas.height) paddleTwo.y +=paddlespeed;
	else if(e.code == "ArrowUp"&&paddleTwo.y>0) paddleTwo.y -=paddlespeed;
	
})

ball.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = "red";
	ctx.arc(this.x, this.y, 10,0, 2 * Math.PI,false);
	ctx.fill();
};

function update() {

	ctx.clearRect(0,0, canvas.width, canvas.height);
	
	if (ball.x + ball.vx > canvas.width) {
		first++;
		scoreOne.textContent=first;
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
		ball.vx=-1;
		ball.vy=1;
		paddlespeed=15;
	
	}
	if ( ball.x + ball.vx < 0 )
	{   second++;
		scoreTwo.textContent = second;
		ball.x = canvas.width/2;
		ball.y = canvas.height/2;
		ball.vx=1;
		ball.vy=1;
		paddlespeed=15;
	}
	if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0 ) {
		ball.vy = -ball.vy;
		
		
	}
	if (ball.x + ball.vx > paddleTwo.x && ball.y + ball.vy >= paddleTwo.y && ball.y + ball.vy < paddleTwo.y + paddleTwo.height)
	{
		ball.vx = -ball.vx-0.4;
		paddlespeed+=3
	}
	if (ball.x + ball.vx < paddleOne.x + paddleOne.width&& ball.y + ball.vy >=paddleOne.y && ball.y + ball.vy < paddleOne.y + paddleOne.height)
	{
		ball.vx = -ball.vx+0.4;
		paddlespeed+=3;
	}
	ctx.font = "50px Sofia Sans";
	ctx.fillText(first,150,50);
	ctx.fillText(second,canvas.width-150,50);
	wygrana();
	ball.x += ball.vx;
	ball.y += ball.vy;
	ball.draw();
	paddleOne.draw();
	paddleTwo.draw();
	window.requestAnimationFrame(update); 
}

update();

function wygrana()
{
	if (first>=2){alert("Wygrał gracz pierwszy");
	first = 0;
	second = 0;
	scoreOne.textContent=first;
	}
	else if(second>=2){alert("Wygrał gracz drugi");
	first = 0;
	second = 0;
	scoreTwo.textContent=second;
	}
	
	
}
//dodac alert(wygrana) jak ktos ma wiecej niz 11 punktow