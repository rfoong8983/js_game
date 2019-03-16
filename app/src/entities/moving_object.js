const utils = require('../utils/utils');

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
}

export default MovingObject;
