let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");

// Set canvas size
cnv.width = 800;
cnv.height = 600;

// GLOBAL VARIABLES
let leftPressed = false;
let rightPressed = false;
let bullets = [];
let circles = [];

// Player
let player = {
  x: cnv.width / 2,
  y: 550,
  width: 50,
  height: 50,
  speed: 4,
};

let boundary = {
  x: 0,
  y: 500,
  width: cnv.width,
  height: 2,
};

function drawBoundary() {
  ctx.fillStyle = "black";
  // Draw Boundary
  ctx.fillRect(boundary.x, boundary.y, boundary.width, boundary.height);
}

function drawPlayer() {
  ctx.fillStyle = "white";
  ctx.fillRect(
    player.x - player.width / 2,
    player.y - player.height / 2,
    player.width,
    player.height
  );
}

function drawBullet(bullet) {
  ctx.fillStyle = "white";
  ctx.fillRect(bullet.x, bullet.y, 5, 10);
}

function drawCircle(circle) {
  ctx.beginPath();
  ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
  ctx.fillStyle = "orange";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  if (leftPressed) {
    player.x += -player.speed;
  } else if (rightPressed) {
    player.x += player.speed;
  }

  drawPlayer();

  // Bullets
  for (let i = 0; i < bullets.length; i++) {
    drawBullet(bullets[i]);
  }

  // Circles
  for (let i = 0; i < circles.length; i++) {
    drawCircle(circles[i]);
  }

  drawBoundary();
  bounceOffWalls();
  update();
  requestAnimationFrame(draw);
}

draw();

function update() {
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.y -= 5;

    // Collision
    for (let i = 0; i < circles.length; i++) {
      let circle = circles[i];
      let distance = Math.sqrt(
        (bullet.x - circle.x) ** 2 + (bullet.y - circle.y) ** 2
      );

      if (distance < circle.r) {
        bullets.splice(i, 1);
        circles.splice(i, 1);
      }
    }

    if (bullet.y < 0) {
      bullets.splice(i, 1);
    }
  }
}

function bounceOffWalls() {
  // Update circles
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    circle.x += circle.speedX;
    circle.y += circle.speedY;

    // Bounce off the walls
    if (circle.x - circle.r < 0 || circle.x + circle.r > cnv.width) {
      circle.speedX *= -1;
    }

    if (circle.y - circle.r < 0 || circle.y + circle.r > cnv.height) {
      circle.speedY *= -1;
    }

    // Bounce off the boundary
    if (circle.y + circle.r > boundary.y) {
      circle.speedY *= -1;
    }
  }

  // Check collision with left edge of canvas
  if (player.x < 0) {
    player.x = 0;
  }

  // Check collision with right edge of canvas
  if (player.x > cnv.width - player.width) {
    player.x = cnv.width - player.width;
  }

  // Check collision with boundary
  if (player.y < boundary.y + boundary.height) {
    player.y = boundary.y + boundary.height;
  }
}

// Create random circles initially
for (let i = 0; i < 12; i++) {
  circles.push({
    x: Math.random() * 700,
    y: Math.random() * boundary.y - 50,
    r: 20,
    speedX: 2,
    speedY: 2,
  });
}

// add more circles
document.getElementById("btn").addEventListener("click", btnClicked);

function btnClicked() {
  for (let i = 0; i < 12; i++) {
    circles.push({
      x: Math.random() * 700,
      y: Math.random() * boundary.y - 50,
      r: 20,
      speedX: 2,
      speedY: 2,
    });
  }
}
