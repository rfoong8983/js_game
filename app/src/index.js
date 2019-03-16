const Game = require("./game/game");
import GameView from './game/game_view';


document.addEventListener('DOMContentLoaded', function () {
    const staticCanvas = document.getElementById("staticCanvas");
    const animatedCanvas = document.getElementById("animatedCanvas");
    staticCanvas.width = 1200;
    staticCanvas.height = 800;
    animatedCanvas.width = 1200;
    animatedCanvas.height = 800;

    const staticCtx = staticCanvas.getContext('2d');
    const animatedCtx = animatedCanvas.getContext('2d');
    const game = new Game();
    new GameView(game, staticCtx, animatedCtx).start();
});