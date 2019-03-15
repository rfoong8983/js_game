import { Circle, generateCircles } from './circle.js';
import Star from './star';
import MiniStar from './ministar';

const MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0]
};

class GameView {
    constructor(game, ctx) {
        this.ctx = ctx;
        this.game = game;
        // this.backgroundA = generateCircles({ size: 180, speed: 2, radius: 1, ctx: this.ctx });
        // this.backgroundB = generateCircles({ size: 80, speed: 1, endSpeed: 4, radius: 3, ctx: this.ctx });
        this.backgroundGradient = this.ctx.createLinearGradient(0, 0, 0, 1200);
        this.backgroundGradient.addColorStop(0, '#171e26');
        this.backgroundGradient.addColorStop(1, '#3f586b');
        this.init();
    }

    static get MOVES() {
        return MOVES;
    }

    init() {
        this.stars = [];
        // this.miniStars is being changed
        // by star #shatter method
        this.miniStars = [];
        this.backgroundStars = [];

        for (let i = 0; i < 1; i++) {
            this.stars.push(new Star({
                x: 600, 
                y: 30, 
                radius: 30, 
                color: '#e3eaef',
                ctx: this.ctx,
                miniStars: this.miniStars
            }));
        }

        for (let i = 0; i < 150; i++) {
            const x = Math.random() * 1200;
            const y = Math.random() * 800;
            const radius = Math.random() * 3
            this.backgroundStars.push(new Star({
                x, y, radius, color: 'white', ctx: this.ctx
            }))
        }
    }

    start() {
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        this.ctx.clearRect(0, 0, 1200, 800);
        requestAnimationFrame(this.animate.bind(this));

        this.ctx.fillStyle = this.backgroundGradient;
        this.ctx.fillRect(0, 0, 1200, 800);
        

        this.backgroundStars.forEach(star => {
            star.draw();
        });

        this.createMountainRange(1, 750, '#384551');
        this.createMountainRange(2, 700, '#2b3843');
        this.createMountainRange(3, 500, '#26333E');
        
        // console.log(this.stars);
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            this.stars[i].update(this.ctx);
            if (this.stars[i].radius === 0 ) {
                this.stars.splice(i, 1);
            }
        }
        this.miniStars.forEach((mini, i) => {
            mini.update();
            if (mini.ttl === 0) {
                this.miniStars.splice(i, 1);
            }
        });
    }

    createMountainRange(mountainAmount, height, color) {
        // canvas - height = distance from top of screen
        for (let i = 0; i < mountainAmount; i++) {
            const mountainWidth = 1200 / mountainAmount;
            
            this.ctx.beginPath();
            this.ctx.moveTo(i * mountainWidth, 800);
            this.ctx.lineTo(i * mountainWidth + mountainWidth + 325, 800);
            this.ctx.lineTo(i * mountainWidth + mountainWidth / 2, 800 - height);
            this.ctx.lineTo(i * mountainWidth - 325, 800);
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
    }
}

export default GameView;