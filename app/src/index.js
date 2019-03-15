import utils from './utils'
import { Circle, generateCircles } from './circle';
const Game = require("./game");
const GameView = require("./game_view");


document.addEventListener('DOMContentLoaded', function () {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 1200;
    canvasEl.height = 800;

    const ctx = canvasEl.getContext('2d');
    const game = new Game();
    new GameView(game, ctx).start();
});