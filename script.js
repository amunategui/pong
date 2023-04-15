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
  dy: 0
};

const computer = {
  x: canvas.width - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  width: paddleWidth,
  height: paddleHeight,
  dy: 0
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

  if (player.y < 0) {
    player.y = 0;
  } else if (player.y + player.height > canvas.height) {
    player.y = canvas.height - player.height;
  }

  if (computer.y < 0) {
    computer.y = 0;
  } else if (computer.y + computer.height > canvas.height) {
    computer.y = canvas.height - computer.height;
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

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyQ") {
    player.dy = -4;
  } else if (event.code === "KeyA") {
    player.dy = 4;
  }
  if (event.code === "KeyO") {
    computer.dy = -4;
  } else if (event.code === "KeyL") {
    computer.dy = 4;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "KeyQ" || event.code === "KeyA") {
    player.dy = 0;
  }
  if (event.code === "KeyO" || event.code === "KeyL") {
    computer.dy = 0;
  }
});

gameLoop();
