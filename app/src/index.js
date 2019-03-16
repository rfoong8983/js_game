const Game = require("./game/game");
import GameView from './game/game_view';
const OffScreenCtx = require('./background/offscreen_bkgrd');

document.addEventListener('DOMContentLoaded', function () {
    const staticCanvas = document.getElementById('staticCanvas');
    const animatedCanvas = document.getElementById('animatedCanvas');
    
    const scWidth = 1200;
    const scHeight = 800;
    staticCanvas.width = scWidth;
    staticCanvas.height = scHeight;
    animatedCanvas.width = scWidth;
    animatedCanvas.height = scHeight;
    
    const staticCtx = staticCanvas.getContext('2d');
    const animatedCtx = staticCanvas.getContext('2d');
    const offScreenCtx = new OffScreenCtx(staticCanvas.width, staticCanvas.height, 2);

    const game = new Game();
    // new GameView(game, staticCtx, animatedCtx, offScreenCtx).start();
    new GameView(game, staticCtx, animatedCtx, offScreenCtx);
});

const createContext = (scWidth, scHeight, proportion) => {
    const offScreenCanvas = document.createElement("canvas");
    offScreenCanvas.width = Math.floor(scWidth / proportion);
    offScreenCanvas.height = Math.floor(scHeight / proportion);

    return offScreenCanvas.getContext('2d');
};