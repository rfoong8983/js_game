import { Circle, generateCircles } from '../shapes/circle.js';
import Star from '../shapes/star';
import MiniStar from '../shapes/ministar';
const GradientBkg = require('../background/gradient_bkgrd');
const MountainsBkg = require('../background/mountains_bkgrd');

const MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0]
};

class GameView {
    constructor(game, staticCtx, animatedCtx) {
        this.staticCtx = staticCtx;
        this.animatedCtx = animatedCtx;
        this.game = game;
        
        this.init();
    }

    static get MOVES() {
        return MOVES;
    }

    init() {
        this.gradBkg = new GradientBkg(this.staticCtx, '#171e26', '#3f586b');
        this.mountBkg1 = new MountainsBkg(this.staticCtx, 1, 750, '#384551');
        this.mountBkg2 = new MountainsBkg(this.staticCtx, 2, 700, '#2b3843');
        this.mountBkg3 = new MountainsBkg(this.staticCtx, 3, 500, '#26333E');
        this.stars = [];
        // this.miniStars is being changed
        // by star #shatter method
        this.miniStars = [];
        this.backgroundStars = [];
        this.ticker = 0;

        // for (let i = 0; i < 150; i++) {
        //     const x = Math.random() * 1200;
        //     const y = Math.random() * 800;
        //     const radius = Math.random() * 3
        //     this.backgroundStars.push(new Star({
        //         x, y, radius, color: 'white', ctx: this.animatedCtx,
        //         miniStars: this.miniStars
        //     }));
        // }
    }

    displayStaticBkgrd() {
        this.gradBkg.draw();
        this.mountBkg1.draw();
        this.mountBkg2.draw();
        this.mountBkg3.draw();

        // this.backgroundStars.forEach(star => {
        //     star.draw();
        // });
    }

    start() {
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        this.animatedCtx.clearRect(0, 0, 1200, 800);
        requestAnimationFrame(this.animate.bind(this));
        this.displayStaticBkgrd();
        
        // console.log(this.stars);
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            this.stars[i].update();
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

        this.ticker++;
        if (this.ticker % 75 === 0) {
            const x = Math.random() * 1200;
            this.stars.push(new Star({
                x, y: -100, radius: 30, 
                color: 'white', ctx: this.animatedCtx, 
                miniStars: this.miniStars
            }));
        }
    }

    createMountainRange(mountainAmount, height, color) {
        // canvas - height = distance from top of screen
        for (let i = 0; i < mountainAmount; i++) {
            const mountainWidth = 1200 / mountainAmount;
            
            this.animatedCtx.beginPath();
            this.animatedCtx.moveTo(i * mountainWidth, 800);
            this.animatedCtx.lineTo(i * mountainWidth + mountainWidth + 325, 800);
            this.animatedCtx.lineTo(i * mountainWidth + mountainWidth / 2, 800 - height);
            this.animatedCtx.lineTo(i * mountainWidth - 325, 800);
            this.animatedCtx.fillStyle = color;
            this.animatedCtx.fill();
        }
    }
}

export default GameView;