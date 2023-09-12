// Puts all the elements of the HTML page into variables.
let snake = document.querySelector(".snake");
let divFood = document.querySelector(".food");
let divBoard = document.querySelector(".main-snake");
let buttonStart = document.querySelector(".button-start");
let selectSpeed = document.getElementById("speed");
let inputColorSnake = document.getElementById("color");
let pCounterEat = document.getElementById("counter-eat");
let timeGame = document.querySelectorAll(".timer > p > samp");

// Adds the option to click on buttons.
document.addEventListener("keydown", listenerKeyDown);
buttonStart.addEventListener("click", changeSettingsHandler);

// A list of clickable buttons.
let listMove = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "a"];
// variables for the game.
let divGame = null;
let divOver;
let h1Over;
let buttonOver;

let spaceBoardX = 0;
let spaceBoardY = 0;

let sizeBorderX = 500;
let sizeBorderY = 500;

let speedSnake = 100;
let colorSnake = "black";
let startGame = false;
let changeSettings = false;
let counterEatFood = 0;

divBoard.style.width = sizeBorderX + "px";
divBoard.style.height = sizeBorderY + "px";

let heightSnack = 10;
let weithSnack = 10;
let heightFood = 10;
let weithFood = 10;
let moveY = 0;
let moveX = 0;

let snakY = Math.floor(sizeBorderY / 2) + spaceBoardY + 0;
let snakX = Math.floor(sizeBorderX / 2) + spaceBoardX + weithSnack;

let gameOver = false;
let intervalGame = null;
let intervalTime = null;

var key;
let foodY;
let foodX;

let timer = [0, 0, 0];

let snakeRundomColor = true;

let listSnack = [divGame];

// calculate time
function calculateTime() {
  let listChange = [2];
  if (timer[1] >= 60) {
    timer[1] = 0;
    timer[0]++;
    listChange.push(0);
    listChange.push(1);
  }
  if (timer[2] >= 100) {
    timer[2] = 0;
    timer[1]++;
    if (!listChange.includes(1)) {
      listChange.push(1);
    }
  }
  return listChange;
}

//to show in tow numbers.
function towNumber(time) {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
}

// show the time on the sceen.
function updateTimer(timeToChage) {
  for (let i = 0; i < timeToChage.length; i++) {
    timeGame[timeToChage[i]].innerHTML = towNumber(timer[timeToChage[i]]);
  }
  timer[2]++;
}

// Changes the color and speed of the snake.
function changeSettingsHandler() {
  speedSnake = Number(selectSpeed.value);
  colorSnake = inputColorSnake.value;
  changeSettings = true;
  snakeRundomColor = false;
  if (intervalGame != null) {
    clearInterval(intervalGame);
  }
  if (intervalTime != null) {
    clearInterval(intervalTime);
  }
  startShowGame();
}

// set a rundom color.
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  return "rgb(" + r + "," + g + "," + b + ")";
}

// Displays the snake screen and resets all variables.
function startShowGame() {
  if (divOver) {
    divBoard.removeChild(divOver);
    divOver = null;
  }
  pCounterEat.innerHTML = 0;
  snake.innerHTML = "";
  divGame = document.createElement("div");
  divGame.setAttribute("id", "id1");
  divGame.classList.add("game");
  snake.appendChild(divGame);
  spaceBoardX = 0;
  spaceBoardY = 0;
  counterEatFood = 0;

  startGame = false;
  changeSettings = false;

  sizeBorderY = 500;
  sizeBorderX = 500;

  divBoard.style.width = sizeBorderX + "px";
  divBoard.style.height = sizeBorderY + "px";

  heightSnack = 10;
  weithSnack = 10;
  heightFood = 10;
  weithFood = 10;
  moveY = 0;
  moveX = 0;
  snakY = Math.floor(sizeBorderY / 2) + spaceBoardY + 0;
  snakX = Math.floor(sizeBorderX / 2) + spaceBoardX + weithSnack;

  gameOver = false;
  intervalGame = null;
  intervalTime = null;

  timer = [0, 0, 0];

  key = null;
  foodY = null;
  foodX = null;

  listSnack = [divGame];
  updateTimer([0,1,2]);
  moveFood();
  addToTheSnake();
  listSnack[0].style.top = spaceBoardY + Math.floor(sizeBorderX / 2) + "px";
  listSnack[0].style.left =
    spaceBoardX + Math.floor(sizeBorderX / 2) + weithSnack + "px";
  listSnack[1].style.top = Math.floor(sizeBorderY / 2) + spaceBoardY + "px";
  listSnack[1].style.left = Math.floor(sizeBorderX / 2) + spaceBoardX + "px";
  divGame.style.backgroundColor = "red";
}

// Shows the banned player window.
function divGameOver() {
  divOver = document.createElement("div");
  divOver.classList.add("game-over");
  h1Over = document.createElement("h1");
  h1Over.innerHTML =
    "Disqualified<br>you eat " +
    counterEatFood +
    "<br>in time :<br>" +
    towNumber(timer[0]) +
    ":" +
    towNumber(timer[1]) +
    ":" +
    towNumber(timer[2]);
  buttonOver = document.createElement("button");
  buttonOver.innerHTML = "play again";
  buttonOver.addEventListener("click", startShowGame);
  buttonOver.classList.add("play-again");
  divOver.style.top = Math.floor((sizeBorderX - 150) / 2) + "px";
  divOver.style.left = Math.floor((sizeBorderX - 300) / 2) + "px";
  divOver.appendChild(h1Over);
  divOver.appendChild(buttonOver);
  divBoard.appendChild(divOver);
}

// Adds a limb to the snake.
function addToTheSnake() {
  let elemant = document.createElement("div");
  elemant.id = "id" + (listSnack.length + 1);
  elemant.className = "game";
  elemant.style.backgroundColor = colorSnake;
  elemant.style.top = listSnack[listSnack.length - 1].style.top;
  elemant.style.left = listSnack[listSnack.length - 1].style.left;
  snake.appendChild(elemant);
  listSnack.push(elemant);
}

// Move the food to a random location.
function moveFood() {
  foodX = Math.floor(Math.random() * (sizeBorderX + 1 - weithSnack));
  foodY = Math.floor(Math.random() * (sizeBorderY + 1 - heightSnack));
  foodY = spaceBoardY + (foodY - (foodY % 10));
  foodX = spaceBoardX + (foodX - (foodX % 10));
  divFood.style.top = foodY + "px";
  divFood.style.left = foodX + "px";
}

// Checks if the snake has eaten the food and updates the screen and the counter.
function chackIfEatFood() {
  if (snakX == foodX && snakY == foodY) {
    pCounterEat.innerHTML++;
    counterEatFood++;
    moveFood();
    addToTheSnake();
  }
}

// Moves all the parts of the snake.
function moveAllSnake() {
  for (let i = listSnack.length - 1; i > 0; i--) {
    listSnack[i].style.top = listSnack[i - 1].style.top;
    listSnack[i].style.left = listSnack[i - 1].style.left;
  }
}

// It is a function that is activated all the time and moves the head of the snake as the variables moveX,moveY.
function moveSnake() {
  moveAllSnake();
  if (snakeRundomColor == true) {
    colorAllSnake(randomColor());
  }
  snakX += moveX;
  snakY += moveY;
  if (snakX >= sizeBorderX) {
    snakX = spaceBoardX;
  }
  if (snakY >= sizeBorderY) {
    snakY = spaceBoardY;
  }
  if (snakX < 0) {
    snakX = spaceBoardX + sizeBorderX - heightSnack;
  } else if (snakY < 0) {
    snakY = spaceBoardY + sizeBorderY - heightSnack;
  }
  chackIfEatFood();
  divGame.style.top = snakY + "px";
  divGame.style.left = snakX + "px";
  chackEatSnake();
  console.log("plye");

  if (gameOver == true) {
    return;
  }
}

// Changes the direction of the snake according to the buttons pressed.
function directionSnake(key) {
  if (!startGame) {
    intervalGame = setInterval(moveSnake, speedSnake);
    intervalTime = setInterval(() => {
      updateTimer(calculateTime());
    }, 10);
    startGame = true;
  }
  if (key === "ArrowDown") {
    moveY = heightSnack;
    moveX = 0;
  }

  if (key === "ArrowUp") {
    moveY = -1 * heightSnack;
    moveX = 0;
  }

  if (key === "ArrowRight") {
    moveX = heightSnack;
    moveY = 0;
  }
  if (key === "ArrowLeft") {
    moveX = -1 * heightSnack;
    moveY = 0;
  }
  if (key === "a") {
    gameOver = false;
    clearInterval(intervalGame);
    clearInterval(intervalTime);
  }
}

// Paints the whole snake a certain color.
function colorAllSnake(color) {
  for (let index = 0; index < listSnack.length; index++) {
    listSnack[index].style.backgroundColor = color;
  }
}

// Checks if the head has touched the body of the snake.
function chackEatSnake() {
  for (let index = 1; index < listSnack.length; index++) {
    if (
      listSnack[index].style.top == snakY + "px" &&
      listSnack[index].style.left == snakX + "px"
    ) {
      gameOver = false;
      clearInterval(intervalGame);
      clearInterval(intervalTime);
      colorAllSnake("red");
      divGameOver();
    }
  }
}

// Sends the button of a function that changes the variables of while moving the snake.
function listenerKeyDown(event) {
  if (event.key === "ArrowLeft" && key == "ArrowRight") return;
  else if (event.key === "ArrowRight" && key == "ArrowLeft") return;
  else if (event.key === "ArrowUp" && key == "ArrowDown") return;
  else if (event.key === "ArrowDown" && key == "ArrowUp") return;
  key = event.key;

  if (listMove.includes(key)) {
    directionSnake(event.key);
  }
}

// the beginning of the game.
startShowGame();
