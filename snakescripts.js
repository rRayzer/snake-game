var snake;
var food;

function startGame() {
	gameArea.start();
	snake = new component(10, 10, "black", 150, 150);
	food = new component (10, 10, "red", randomNum(0, 300), randomNum(0, 300));
}

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 300,
		this.canvas.height = 300,
		this.context = this.canvas.getContext("2d"),
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function (e) {
            gameArea.key = e.keyCode;
        })
	},
	clear : function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
	stop : function () {
		clearInterval(this.interval);
	}
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
    	ctx = gameArea.context;
    	ctx.fillStyle = color;
    	ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
    	this.x += this.speedX;
    	this.y += this.speedY;
    }
    this.crashWith = function() {
    	var snakeleft = this.x;
    	var snakeright = this.x + snake.width;
    	var snaketop = this.y;
    	var snakebottom = this.y + snake.height;
    	var crash = true;
    	if (snakeleft > 0) 
    		//(snakeright < 300) ||
    		//(snaketop > 0) ||
    		//(snakebottom < 300)) 
    	{
    		crash = false;
    	}
    	return crash;
    	console.log('works');
    }
}

function updateGameArea() {
	if (snake.crashWith()) {
		gameArea.stop();
		alert('Game Over!');
	} else {
		gameArea.clear();
		snake.speedX = 0;
		snake.speedY = 0;
		if (gameArea.key && gameArea.key == 37) {snake.speedX = -5; }
    	if (gameArea.key && gameArea.key == 39) {snake.speedX = 5; }
    	if (gameArea.key && gameArea.key == 38) {snake.speedY = -5; }
    	if (gameArea.key && gameArea.key == 40) {snake.speedY = 5; }
		snake.newPos();
		snake.update();
		food.update();
	}
}

function randomNum(min, max) {
	return Math.round((Math.random() * (max - min) + min) / 10) * 10
}


