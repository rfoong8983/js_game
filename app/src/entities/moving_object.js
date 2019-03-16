const utils = require('../utils/utils');

const NORMAL_FRAME_TIME_DELTA = 100; // 1000 / 60;

class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.velocity = options.velocity || [0, 0];
        this.radius = options.radius;
        this.color = options.color;
        this.game = options.game;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
            this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, false
        );
        ctx.fill();
        ctx.closePath();
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
            offsetY = this.velocity[1] * 1;
        
        this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
        // this.pos = [this.pos[0], this.pos[1]];
    }

    power(impulse) {
        this.velocity[0] = impulse[0];
        this.velocity[1] = impulse[1];
    }
}

export default MovingObject;
