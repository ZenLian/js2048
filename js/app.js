// Wait till the browser is ready to render the game (avoids glitches)
var app = {};

window.requestAnimationFrame(function () {
  app.gameManager = new GameManager(4, InputManager, Renderer);
});
