import { Circle, generateCircles } from './circle.js';
import { timingSafeEqual } from 'crypto';

function GameView(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    
    this.backgroundA = generateCircles({size: 180, speed: 2, radius: 1, ctx: this.ctx});
    this.backgroundB = generateCircles({size: 80, speed: 1, endSpeed: 4, radius: 3, ctx: this.ctx});
}

GameView.MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [1, 0],
    d: [0, 1]
};

GameView.prototype.start = function start() {
    // this.bindKeyHandlers();
    // this.lastTime = 0;

    requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function animate(time) {
    this.ctx.clearRect(0, 0, 1200, 800);
    requestAnimationFrame(this.animate.bind(this));
    
    for (let i=0; i < this.backgroundA.length; i++) {
        this.backgroundA[i].update(this.ctx);
    }
    
    for (let i=0; i < this.backgroundB.length; i++) {
        this.backgroundB[i].update(this.ctx);
    }
};

module.exports = GameView;