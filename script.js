const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

const player = {
  x: 0,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 4
};

const computer = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 4
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: ballSize,
  dx: 4,
  dy: 4
};

function drawPaddle(x, y, width, height) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(x, y, size, size);
}

function movePaddles() {
  player.y += player.dy;
  computer.y += computer.dy;

  if (player.y < 0 || player.y + player.height > canvas.height) {
    player.dy *= -1;
  }

  if (computer.y < 0 || computer.y + computer.height > canvas.height) {
    computer.dy *= -1;
  }
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.y < 0 || ball.y + ball.size > canvas.height) {
    ball.dy *= -1;
  }

  if (ball.x < 0 || ball.x + ball.size > canvas.width) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
  }

  if (ball.x < player.x + player.width &&
    ball.x + ball.size > player.x &&
    ball.y < player.y + player.height &&
    ball.y + ball.size > player.y) {
    ball.dx *= -1;
  }

  if (ball.x < computer.x + computer.width &&
    ball.x + ball.size > computer.x &&
    ball.y < computer.y + computer.height &&
    ball.y + ball.size > computer.y) {
    ball.dx *= -1;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(player.x, player.y, player.width, player.height);
  drawPaddle(computer.x, computer.y, computer.width, computer.height);
  drawBall(ball.x, ball.y, ball.size);
}

function update() {
  movePaddles();
  moveBall();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
