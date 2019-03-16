const Game = require("./game/game");
import GameView from './game/game_view';
const OffScreenCtx = require('./background/offscreen_bkgrd');

document.addEventListener('DOMContentLoaded', function () {
    const staticCanvas = document.getElementById('staticCanvas');
    const animatedCanvas = document.getElementById('animatedCanvas');
    const gameCanvas = document.getElementById('game');
    
    const scWidth = 1200;
    const scHeight = 800;
    staticCanvas.width = scWidth;
    staticCanvas.height = scHeight;
    animatedCanvas.width = scWidth;
    animatedCanvas.height = scHeight;
    gameCanvas.width = scWidth;
    gameCanvas.height = scHeight;
    
    const staticCtx = staticCanvas.getContext('2d');
    const animatedCtx = animatedCanvas.getContext('2d');
    const gameCtx = gameCanvas.getContext('2d');
    const offScreenCtx = new OffScreenCtx(staticCanvas.width, staticCanvas.height, 2);

    const game = new Game();
    new GameView(game, staticCtx, animatedCtx, gameCtx, offScreenCtx).start();
    // new GameView(game, staticCtx, animatedCtx, gameCtx, offScreenCtx);
});