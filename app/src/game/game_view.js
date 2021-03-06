import Star from '../shapes/star';
import Particle from '../shapes/particle';
const House = require('../background/house');
const AmbientBkg = require('../background/ambient_bkgrd');


// const KEY_DOWN_MOVES = {
//     87: [0, -25], // 87 w
//     65: [-5, 0], // 65 a
//     // 83: [0, 5], // 85 s
//     68: [5, 0] // 68 d
// };
const KEY_UP_MOVES = {
    87: [0, 25], // 87 w
    65: [0, 0], // 65 a
    // 83: [0, 5], // 85 s
    68: [0, 0] // 68 d
};

class GameView {
    constructor(game, staticCtx, animatedCtx, offScreenCtx, bool) {
        this.staticCtx = staticCtx;
        this.animatedCtx = animatedCtx;
        // this.gameCtx = gameCtx;
        this.offScreenBkg = offScreenCtx;
        this.preloaded = [];
        this.game = game;
        this.movingObject = this.game.addMovingObject();
        this.lastJump = new Date() / 1000;
        this.fps = 0;
        this.house = new House(this.staticCtx);
        // this.particles = [];
        // this.init();
        this.keysPressed = this.keysPressed.bind(this);
        this.keysReleased = this.keysReleased.bind(this);
        this.bindKeyHandlers = this.bindKeyHandlers.bind(this);
        this.gameOverBox = document.getElementsByClassName("gameOver")[0];
        this.startBox = document.getElementsByClassName("startBox")[0];
        this.winBox = document.getElementsByClassName("winBox")[0];
        this.bool = bool;
    }

    removeStartMessage() {
        this.startBox.id = "";
    }

    winMessage() {
        this.winBox.id = "visible";
    }

    gameOverMessage() {
        this.gameOverBox.id = "visible";
    }

    keysPressed(e) {
        this.keys[e.keyCode] = true;
        e.preventDefault();

        if (this.keys[87] && this.keys[68]) {
            this.movingObject.power([2, 0]);
        } else if (this.keys[87] && this.keys[65]) {
            this.movingObject.power([-2, 0]);
        } else if (this.keys[65]) {
            this.movingObject.power([-2, 0]);
        } else if (this.keys[68]) {
            this.movingObject.power([2, 0]);
        }
    }

    keysReleased(e) {
        this.keys[e.keyCode] = false;
        const move = KEY_UP_MOVES[e.keyCode];
        this.movingObject.power(move);
    }
    

    bindKeyHandlers() {
        document.addEventListener('keydown', this.keysPressed, false);

        document.addEventListener('keyup', this.keysReleased, false);
    }


    // move gradients and static images out of animation
    // draw snow in off-screen canvas
    // putImageData onto my screen when ticker % x === 0

    // generates snow once on game start
    // used by ambient background to render particles
    generateOffScreenParticles() {
        for (let i = 0; i < 70; i++) {
            this.preloaded.push(new Particle({
                x: Math.floor(Math.random() * this.offScreenBkg.canvas.width), 
                y: Math.floor(Math.random() * this.offScreenBkg.canvas.height),
                radius: Math.random() * 2,
                color: `rgba(227, 234, 239, 1)`,
                ctx: this.animatedCtx, 
                ttl: 700
            }));
        }
    }

    init() {
        this.ambientBkg = new AmbientBkg(this.animatedCtx, 2, '#171e26');
        this.generateOffScreenParticles();
        
        this.keys = [];
        this.miniStars = [];
        this.backgroundStars = [];
        this.stars = [];
        this.ticker = 0;
    }

    start() {
        this.bindKeyHandlers();
        this.removeStartMessage();
        this.lastTime = 0;
        this.init();
        requestAnimationFrame(this.animate.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.animate.bind(this));
        const link = document.getElementById('retry');
        setInterval(() => {
            if (link.id === 'retry') {
                link.id = '';
            } else {
                link.id = 'retry';
            }
        }, 1200);
    }


    animate(time) {
        if (this.game.gameOver) {
            this.gameOverMessage();
            this.stop(); 
        }
        else if (this.movingObject.pos[0] >= 1074) {
            this.winMessage();
            this.stop();
        } else {
            const timeDelta = time - this.lastTime;
            this.house.draw();
            this.animatedCtx.clearRect(0, 0, 1200, 793);
            requestAnimationFrame(this.animate.bind(this));
            
            this.game.step(timeDelta);
            this.game.draw(this.animatedCtx);
            
            for (let i = 0; i < this.stars.length; i++) {
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
                if (mini.x > 1200 || mini.x < 0) {
                    this.miniStars.splice(i, 1);
                }
                if (mini.ttl === 0) {
                    this.miniStars.splice(i, 1);
                }
            });

                //  ###############   COMMENT ME BBACK IN !!!!
                // ###### MOVING BKG
            if (this.ticker === 0 || this.ticker % 185 === 0) {
                this.ambientBkg.generate(this.preloaded);
            }
            
            
            
            // delete stars that have shrunk
            this.stars.forEach((star, index) => {
                if (star.x > 1200 || star.x < 0) {
                    this.stars.splice(index, 1);
                }
                
                if (star.radius - 3 <= 0) {
                    this.stars.splice(index, 1);
                }
            });
            
            this.game.stars.forEach((star, index) => {
                if (star.x > 1200 || star.x < 0) {
                    this.game.stars.splice(index, 1);
                }

                if (star.radius - 3 <= 0) {
                    this.game.stars.splice(index, 1);
                }
            });

            if (this.ticker % 70 === 0) {
                const x = Math.random() * 1200;
                const star = new Star({
                    x, y: -100, radius: 14, // 8,
                    color: 'white', ctx: this.animatedCtx,
                    miniStars: this.miniStars
                });
                this.stars.push(star);
                this.game.addStar(star);
            }

            this.ticker++;
        }
    }
}

export default GameView;