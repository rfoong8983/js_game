import * as utils from '../utils/utils';

class MiniStar {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.ctx = options.ctx;
        this.purp = options.purp;
        this.yell = options.yell;
        this.gravity = 0.1;
        this.friction = 0.8;
        this.velocity = {
            x: utils.randomIntFromRange(-2, 2),
            y: utils.randomIntFromRange(-10, 10)
            // x: utils.randomIntFromRange(-5, 5),
            // y: utils.randomIntFromRange(-15, 15)
        };
        // time to live = 100 frames
        this.ttl = 300;
        this.opacity = 1;
    }


    draw() {
        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        // light
        // this.ctx.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
        // this.ctx.shadowColor = '#e3eaef';
        if (this.radius > 1) {
            this.ctx.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
            this.ctx.shadowColor = '#e3eaef';
        } else if (this.purp) {
            this.ctx.fillStyle = `rgba(142,108,229, ${this.opacity})`;
            this.ctx.shadowColor = 'rgb(158,120,255)';
        } else if (this.yell) {
            this.ctx.fillStyle = `rgba(255,251,186, ${this.opacity})`;
            this.ctx.shadowColor = 'rgb(229,226,167)';
        } else {
            this.ctx.fillStyle = `rgba(95,237,255, ${this.opacity})`;
            this.ctx.shadowColor = 'rgb(255,255,255)';
        }
        // cyan
        // this.ctx.fillStyle = `rgba(95,237,255, ${this.opacity})`;
        // this.ctx.shadowColor = 'rgb(255,255,255)';
        // dark
        // this.ctx.fillStyle = `rgba(28, 21, 16, ${this.opacity})`;
        // this.ctx.shadowColor = '#1c1510';
        this.ctx.shadowBlur = 20;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }
    
    update() {
        this.draw();

        if (this.y + this.radius + this.velocity.y > 800) {
            this.velocity.y = -this.velocity.y * this.friction;
        } else {
            this.velocity.y += this.gravity;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.ttl -= 1;
        // the lower ttl is, the larger the value
        //    1 / ttl will return
        // subtract a larger and larger value from
        //    opacity the lower a ministar's ttl
        if (Math.floor(this.radius) < 0) {
            this.radius -= 1 / this.ttl;
        }
        this.opacity -= 1 / this.ttl;
    }
}

export default MiniStar;