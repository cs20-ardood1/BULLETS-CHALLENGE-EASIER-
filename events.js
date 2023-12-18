// Event stuff
document.addEventListener("keydown", eventDownHandler);
document.addEventListener("keyup", eventUpHandler);
function eventDownHandler(event) {
  if (event.code === "ArrowLeft" || event.code === "KeyA") {
    leftPressed = true;
  } else if (event.code === "ArrowRight" || event.code === "KeyD") {
    rightPressed = true;
  }
}
function eventUpHandler(event) {
  if (event.code === "ArrowLeft" || event.code === "KeyA") {
    leftPressed = false;
  } else if (event.code === "ArrowRight" || event.code === "KeyD") {
    rightPressed = false;
  }
}
// Handle mouse down event
document.addEventListener("mousedown", mouseDownHandler);
function mouseDownHandler() {
  bullets.push({ x: player.x, y: player.y - player.height / 2 });
}
