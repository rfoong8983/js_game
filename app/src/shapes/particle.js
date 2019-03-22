import * as utils from '../utils/utils';

class Particle {
    constructor(options) {
        // screen dimensions are passed in 
        // for x & y values.
        // x & y values are dimensions * random (0.0 - 1.0)
        // this.x = options.x;
        // this.y = options.y;
        this.x = Math.floor(Math.random() * options.x) -425;
        this.y = Math.floor(Math.random() * options.y) -425;
        this.radius = options.radius;
        this.color = options.color;
        this.ctx = options.ctx;
        this.gravity = 0.1;
        this.friction = 0.8;
        this.velocity = {
            x: utils.randomIntFromRange(1, 5),
            y: Math.floor(Math.random() * 3)
            // x: options.velocity.x,
            // y: options.velocity.y
        };
        // time to live = 100 frames
        this.ttl = options.ttl;
        this.opacity = 1;
    }


    draw() {
        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
        this.ctx.shadowColor = '#e3eaef';
        this.ctx.shadowBlur = 20;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    update() {
        this.draw();

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl -= 1;
        // the lower ttl is, the larger the value
        //    1 / ttl will return
        // subtract a larger and larger value from
        //    opacity the lower a ministar's ttl
        this.opacity -= 1 / this.ttl;
    }
}

export default Particle;