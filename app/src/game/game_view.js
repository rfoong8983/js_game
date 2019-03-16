import { Circle, generateCircles } from '../shapes/circle.js';
import Star from '../shapes/star';
import MiniStar from '../shapes/ministar';
import Particle from '../shapes/particle';
import * as utils from '../utils/utils';
const GradientBkg = require('../background/gradient_bkgrd');
const MountainsBkg = require('../background/mountains_bkgrd');
const AmbientBkg = require('../background/ambient_bkgrd');


const MOVES = {
    w: [0, -1],
    a: [-1, 0],
    s: [0, 1],
    d: [1, 0]
};

class GameView {
    constructor(game, staticCtx, animatedCtx, offScreenCtx, animatedCanvas) {
        this.staticCtx = staticCtx;
        this.animatedCtx = animatedCtx;
        this.offScreenBkg = offScreenCtx;
        this.preloaded = [];
        this.game = game;
        // this.particles = [];
        
        this.init();
    }

    static get MOVES() {
        return MOVES;
    }

    // move gradients and static images out of animation
    // draw snow in off-screen canvas
    // putImageData onto my screen when ticker % x === 0
    generateOffScreenParticles() {
        for (let i = 0; i < 70; i++) {
            this.preloaded.push(new Particle({
                x: this.offScreenBkg.canvas.width, 
                y: this.offScreenBkg.canvas.height,
                radius: Math.random() * 2,
                color: `rgba(227, 234, 239, 1)`,
                ctx: this.animatedCtx, 
                ttl: 700
            }));
        }
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

    init() {
        this.gradBkg = new GradientBkg(this.staticCtx, '#171e26', '#3f586b');
        this.mountBkg1 = new MountainsBkg(this.staticCtx, 1, 750, '#384551');
        this.mountBkg2 = new MountainsBkg(this.staticCtx, 2, 700, '#2b3843');
        this.mountBkg3 = new MountainsBkg(this.staticCtx, 3, 500, '#26333E');
        this.ambientBkg = new AmbientBkg(this.animatedCtx, 2, '#171e26');

        this.generateOffScreenParticles();
        // console.log(this.offScreenBkg.particles);
        
        this.stars = [];
        // this.miniStars is being changed
        // by star #shatter method
        this.miniStars = [];
        this.backgroundStars = [];
        this.ticker = 0;
    }

    start() {
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        this.animatedCtx.clearRect(0, 0, 1200, 800);
        requestAnimationFrame(this.animate.bind(this));
        this.displayStaticBkgrd();
        
        // console.log(this.stars);
        // for (let i = 0; i < this.stars.length; i++) {
        //     const star = this.stars[i];
        //     this.stars[i].update();
        //     if (this.stars[i].radius === 0 ) {
        //         this.stars.splice(i, 1);
        //     }
        // }

        


        for (let i = 0; i < this.ambientBkg.prev.length; i++) {
            // console.log(this.ambientBkg.prev[i]);
            this.ambientBkg.prev[i].update();
            // console.log(this.ambientBkg.prev);
            if (this.ambientBkg.prev[i].ttl === 0 ) {
                this.ambientBkg.prev.splice(i, 1);
            }

            
        }
        
        // this.miniStars.forEach((mini, i) => {
        //     mini.update();
        //     if (mini.ttl === 0) {
        //         this.miniStars.splice(i, 1);
        //     }
        // });

        this.ticker++;
        if (this.ticker % 195 === 0) {
            const x = Math.random() * 1200;

            this.ambientBkg.generate2(this.preloaded);
            console.log(this.ambientBkg.prev);
        }
        
        // this.ticker++;
        // if (this.ticker % 195 === 0) {
        //     const x = Math.random() * 1200;
        //     // caps at about maximum 210-280 at once
        //     this.ambientBkg.generate(70);
        // }
        // console.log(this.prev.length);
        // if (this.ticker % 75 === 0) {
        //     const x = Math.random() * 1200;
        //     this.stars.push(new Star({
        //         x, y: -100, radius: 30, 
        //         color: 'white', ctx: this.animatedCtx, 
        //         miniStars: this.miniStars
        //     }));
        // }
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