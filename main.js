const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameRunning = false;

const player = {
  x: 100,
  y: 400,
  width: 40,
  height: 40,
  color: "#0ff",
  speed: 5,
  dx: 0,
  dy: 0,
  health: 100
};

const enemy = {
  x: 700,
  y: 400,
  width: 40,
  height: 40,
  color: "red",
  health: 100
};

function drawRect(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  if (!gameRunning) return;

  clear();

  player.x += player.dx;
  player.y += player.dy;

  // keep player in bounds
  player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
  player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

  drawRect(player);
  drawRect(enemy);

  // collision
  if (
    player.x < enemy.x + enemy.width &&
    player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.y + player.height > enemy.y
  ) {
    enemy.health -= 1;
    if (enemy.health <= 0) {
      alert("YOU WIN!");
      gameRunning = false;
    }
  }

  requestAnimationFrame(update);
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  gameRunning = true;
  update();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") player.dx = player.speed;
  if (e.key === "ArrowLeft") player.dx = -player.speed;
  if (e.key === "ArrowUp") player.dy = -player.speed;
  if (e.key === "ArrowDown") player.dy = player.speed;
});

document.addEventListener("keyup", (e) => {
  if (
    e.key === "ArrowRight" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowUp" ||
    e.key === "ArrowDown"
  ) {
    player.dx = 0;
    player.dy = 0;
  }
});
