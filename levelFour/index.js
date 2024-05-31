var stage, circle, turtle;

var rounds = 0;

const MAX_ROUNDS = 12;

const TRASH_NUM = 8;

const trash = [];

const width = 800;
const height = 800;

var dir = 0; //-1 left, 1 right

var canvas = document.getElementById("demoCanvas");

function init() {
	initStage();

	// var image = new Image();
	// image.src = "/turtle.png";
	// image.onload = handleImageLoad;

	initTurtle();

	createTrash();
	fillTrash(TRASH_NUM);

	document.addEventListener("keydown", handleKeypress);
	document.addEventListener("keyup", handleKeyUp);

	// setInterval(periodic, 25);
	createjs.Ticker.addEventListener("tick", periodic);
}

function initStage() {
	stage = new createjs.Stage("demoCanvas");

	stage.canvas.width = width;
	stage.canvas.height = height;
}

// function handleImageLoad(e) {
// 	let im = e.target;
// 	turtle = new createjs.Shape();
// 	turtle.graphics.beginBitmapFill(im).drawRect(0, 0, 40, 40);
// 	turtle.y = 700;
// 	turtle.x = 400;
// 	stage.addChild(turtle);
// 	stage.update();
// }

function initTurtle() {
	// turtle = new createjs.Shape();

	// turtle.graphics.beginFill(img).drawRect(0, 0, 40, 40);

	const data = {
		images: [
			"/turtle.png",
			// "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f012d139-910d-47a1-a3cc-5712bf512d1e/dezyf32-b8a2e259-82b0-4d6e-abc4-12460c285f99.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2YwMTJkMTM5LTkxMGQtNDdhMS1hM2NjLTU3MTJiZjUxMmQxZVwvZGV6eWYzMi1iOGEyZTI1OS04MmIwLTRkNmUtYWJjNC0xMjQ2MGMyODVmOTkucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.3HJo9aS1-nrH2P5DvmswOSGHYTBUqMlFXwW97ufeMOw",
		],
		frames: {
			width: 64,
			height: 64,
		},
		animations: {
			idle: 0,
		},
	};

	const spriteSheet = new createjs.SpriteSheet(data);
	turtle = new createjs.Sprite(spriteSheet, "idle");

	// turtle = new createjs.Bitmap("/turtle.png");

	turtle.y = 600;

	turtle.x = 400;

	stage.addChild(turtle);

	stage.update();
}

function periodic() {
	handleTurtlePos();
	moveTrashForward();
	checkCollision();
}

function handleSuddenDeath() {
	if (rounds >= MAX_ROUNDS) {
		fillTrash(100);
	}
}

function handleKeypress(e) {
	console.log(e.key);
	switch (e.key) {
		case "ArrowLeft":
		case "a":
			dir = -1;
			break;
		case "ArrowRight":
		case "d":
			dir = 1;
			break;
		default:
			break;
	}
}

function handleKeyUp(e) {
	console.log("key up: " + e.key);
	if (
		e.key == "a" ||
		e.key == "d" ||
		e.key == "ArrowLeft" ||
		e.key == "ArrowRight"
	) {
		dir = 0;
	}
}

function handleTurtlePos() {
	switch (dir) {
		case -1:
			turtle.x -= 10;
			break;
		case 1:
			turtle.x += 10;
			break;
		default:
			break;
	}
	if (turtle.x < 0) {
		turtle.x = stage.canvas.width - 1;
	}
	if (turtle.x >= stage.canvas.width) {
		turtle.x = 0;
	}
	stage.update();
}

function createTrash() {
	// let mtrash = new createjs.Shape();

	const data = {
		images: ["/trash.png"],
		frames: {
			width: 32,
			height: 32,
		},
		animations: {
			idle: 0,
		},
	};

	const spriteSheet = new createjs.SpriteSheet(data);

	let mtrash = new createjs.Sprite(spriteSheet, "idle");

	// mtrash.graphics.beginFill("black").drawCircle(0, 0, 20);
	mtrash.x = Math.random() * width;
	mtrash.y = 0;
	stage.addChild(mtrash);
	trash.push(mtrash);
}

function fillTrash(num) {
	for (let i = 0; i < num; i++) {
		createTrash();
	}
}

function moveTrashForward() {
	let newRound = false;
	for (let i = 0; i < trash.length; i++) {
		trash[i].y += 10;
		if (trash[i].y >= height) {
			trash[i].y = 0;
			trash[i].x = Math.random() * width;
			newRound = true;
		}
	}
	if (newRound) {
		rounds++;
		handleSuddenDeath();
	}
	stage.update();
}

const HITBOX = 30;

function checkCollision() {
	trash.forEach(function (t) {
		if (
			Math.abs(t.x - turtle.x) < HITBOX &&
			Math.abs(t.y - turtle.y) < 10
		) {
			console.log("collision");
			die();
		}
	});
}

function die() {
	window.location.replace("/gameover4");
}
