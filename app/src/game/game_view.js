import { Circle, generateCircles } from '../shapes/circle.js';
import Star from '../shapes/star';
import MiniStar from '../shapes/ministar';
import Particle from '../shapes/particle';
import MovingObject from '../entities/moving_object';
import * as utils from '../utils/utils';
const GradientBkg = require('../background/gradient_bkgrd');
const MountainsBkg = require('../background/mountains_bkgrd');
const AmbientBkg = require('../background/ambient_bkgrd');


const KEY_DOWN_MOVES = {
    87: [0, -25], // 87 w
    65: [-5, 0], // 65 a
    // 83: [0, 5], // 85 s
    68: [5, 0] // 68 d
};
const KEY_UP_MOVES = {
    87: [0, 25], // 87 w
    65: [0, 0], // 65 a
    // 83: [0, 5], // 85 s
    68: [0, 0] // 68 d
};

class GameView {
    constructor(game, staticCtx, animatedCtx, gameCtx, offScreenCtx, animatedCanvas) {
        this.staticCtx = staticCtx;
        this.animatedCtx = animatedCtx;
        this.gameCtx = gameCtx;
        this.offScreenBkg = offScreenCtx;
        this.preloaded = [];
        this.game = game;
        this.movingObject = this.game.addMovingObject();
        this.lastJump = new Date() / 1000;
        // this.particles = [];
        this.init();
        this.keysPressed = this.keysPressed.bind(this);
        this.keysReleased = this.keysReleased.bind(this);
        this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
    }

    keysPressed(e) {
        this.keys[e.keyCode] = true;
        e.preventDefault();
        const move = KEY_DOWN_MOVES[e.keyCode];
        
        // console.log(this.keys);

        // write a jump function

        if (this.keys[87] && this.keys[68]) {
            if (new Date() / 1000 - this.lastJump > 2) {
                this.movingObject.jump(2, -25);
            } else {
                this.movingObject.jump(2, 25);
            }
        } else if (this.keys[87] && this.keys[65]) {
            if (new Date() / 1000 - this.lastJump > 2) {
                this.movingObject.jump(-2, -25);
            } else {
                this.movingObject.jump(-2, 25);
            }
        } else if (this.keys[65]) {
            this.movingObject.power([-2, 0]);
        } else if (this.keys[68]) {
            this.movingObject.power([2, 0]);
        } else if (this.keys[87]) {
            if (new Date() / 1000 - this.lastJump > 2) {
                this.movingObject.jump(0, -25);
            }
        } 

        // console.log(this.movingObject.velocity);
    }

    keysReleased(e) {
        this.keys[e.keyCode] = false;
        const move = KEY_UP_MOVES[e.keyCode];
        this.movingObject.power(move);
    }
    

    bindKeyHandlers() {
        const movingObject = this.movingObject;

        document.addEventListener('keydown', this.keysPressed, false);

        document.addEventListener('keyup', this.keysReleased, false);
        
        
    }
    bindKeyHandlers2() {
        const movingObject = this.movingObject;

        document.addEventListener('keydown', (eDown) => {
            const move = KEY_DOWN_MOVES[JSON.stringify(eDown.which)];
            // console.log(movingObject.velocity);
            if (eDown.which !== 87) {
                movingObject.power(move);
            } else if (movingObject.pos[1] === 790 && eDown.which === 87) {
                movingObject.power(move);
            // } else if (movingObject.pos[1] < 741 && eDown.which === 87) {
            //     movingObject.power([0, 0]);
            } else if (eDown.which === 87) {
                movingObject.power([0, -25]);
            } else if (movingObject.velocity[0] > 0) {
                movingObject.power([5, 25]);
            } else if (movingObject.velocity[0] < 0) {
                movingObject.power([-5, 25]);
            }
        });

        document.addEventListener('keyup', (eUp) => {
            // console.log(e)
            // console.log(movingObject.velocity);
            if (eUp === 87) {
                movingObject.power([0, 25]);
            } else {
                movingObject.power([0, 0]);
            }
        });
        
        
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
        // this.gradBkg = new GradientBkg(this.staticCtx, '#0a384a', '#024253');
        this.gradBkg = new GradientBkg(this.staticCtx, '#171e26', '#3f586b');
        this.mountBkg1 = new MountainsBkg(this.staticCtx, 1, 750, '#384551');
        this.mountBkg2 = new MountainsBkg(this.staticCtx, 2, 700, '#2b3843');
        this.mountBkg3 = new MountainsBkg(this.staticCtx, 3, 500, '#26333E');
        this.ambientBkg = new AmbientBkg(this.animatedCtx, 2, '#171e26');

        this.displayStaticBkgrd();

        this.generateOffScreenParticles();
        // console.log(this.offScreenBkg.particles);
        
        this.keys = [];
        // this.miniStars is being changed
        // by star #shatter method
        this.miniStars = [];
        this.backgroundStars = [];
        this.stars = [];
        this.ticker = 0;
    }

    start() {
        this.bindKeyHandlers();
        this.lastTime = 0;
        requestAnimationFrame(this.animate.bind(this));
    }

    animate(time) {
        const timeDelta = time - this.lastTime;
        this.animatedCtx.clearRect(0, 0, 1200, 800);
        requestAnimationFrame(this.animate.bind(this));
        
        this.game.step(timeDelta);
        this.game.draw(this.gameCtx);
        // console.log(this.stars);
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            this.stars[i].update();
            if (this.stars[i].radius <= 0 ) {
                this.stars.splice(i, 1);
            }
        }

        


        for (let i = 0; i < this.ambientBkg.prev.length; i++) {
            // console.log(this.ambientBkg.prev[i]);
            this.ambientBkg.prev[i].update();
            // console.log(this.ambientBkg.prev);
            if (this.ambientBkg.prev[i].ttl === 0 ) {
                this.ambientBkg.prev.splice(i, 1);
            }

            
        }
        
        this.miniStars.forEach((mini, i) => {
            mini.update();
            if (mini.ttl === 0) {
                this.miniStars.splice(i, 1);
            }
        });

            //  ###############   COMMENT ME BBACK IN !!!!
        // this.ticker++;
        // if (this.ticker === 10 || this.ticker % 175 === 0) {
        //     const x = Math.random() * 1200;

        //     this.ambientBkg.generate(this.preloaded);
        //     console.log(this.ambientBkg.prev);
        // }
        
        this.ticker++;
        // if (this.ticker % 195 === 0) {
        //     const x = Math.random() * 1200;
        //     // caps at about maximum 210-280 at once
        //     this.ambientBkg.generate(70);
        // }
        
        // delete stars that have shrunk
        this.stars.forEach((star, index) => {
            if (star.radius - 3 <= 0) {
                this.stars.splice(index, 1);
            }
        });
        this.game.stars.forEach((star, index) => {
            // console.log(this.game.stars);
            if (star.radius - 3 <= 0) {
                this.game.stars.splice(index, 1);
            }
        });

        if (this.ticker % 175 === 0) {
            const x = Math.random() * 1200;
            const star = new Star({
                x: 40, y: -100, radius: 8,
                color: 'white', ctx: this.animatedCtx,
                miniStars: this.miniStars
            });
            this.stars.push(star);
            this.game.addStar(star);
            // console.log(this.stars);
            // console.log(this.miniStars);
        }
    }
}

export default GameView;