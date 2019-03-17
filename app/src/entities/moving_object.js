const utils = require('../utils/utils');

const NORMAL_FRAME_TIME_DELTA = 100; // 1000 / 60;

class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.velocity = options.velocity || [0, 0];
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;
        this.gravity = 10;


    }

    jump(x, y) {
        if (this.pos[1] < 740) {
            this.velocity[1] -= y;
        } else{
            this.velocity[1] += y;
        }
        this.velocity[0] += x;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.pos[1] < 780) {
            this.pos[1] += this.gravity;
        } else if (this.pos[1] + this.velocity[1] + this.gravity >= 780) {
            this.velocity[1] = 0;
            this.pos[1] = 780;
        } 
        if (this.pos[0] + this.velocity[0] + this.radius >= 1200) {
            this.velocity[0] = 0;
            this.pos[0] = 1200 - this.radius;
        } else if (this.pos[0] - this.radius + this.velocity[0] <= 0) {
            this.velocity[0] = 0;
            this.pos[0] = this.radius;
        }
        ctx.ellipse(this.pos[0], this.pos[1], 2, 9, 0, Math.PI * 2, false);
        ctx.ellipse(
            this.pos[0], this.pos[1] - 16, 3, 2, 0, Math.PI * 2, false
        );
        ctx.closePath();
        ctx.fill();
    }



    move(timeDelta) {
        // timeDelta = # of ms since last move
        // timeDelta can vary; if timeDelta increases
        // distance of next move should increase
        // velocity = distance moved in 1/60 sec
        // const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
            // offsetX = this.velocity[0] * velocityScale,
            // offsetY = this.velocity[1] * velocityScale;
        const offsetX = this.velocity[0] * 1,
            offsetY = this.pos[1] >= 740 ? this.velocity[1] * 1 : 0;
        
        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        // this.pos = [this.pos[0], this.pos[1]];
    }

    power(impulse) {
        this.velocity[0] = impulse[0];
        this.velocity[1] = impulse[1];
    }
}

export default MovingObject;
