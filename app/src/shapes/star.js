import MiniStar from './ministar';
import * as utils from '../utils/utils';

class Star {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.pos = [this.x, this.y];
        this.radius = options.radius;
        this.color = options.color;
        this.ctx = options.ctx;
        this.gravity = 1;
        this.friction = 0.8;
        this.velocity = {
            // x: 0,
            x: utils.randomIntFromRange(-15, 15),
            y: 3
        };
        this.miniStars = options.miniStars;
        this.opacity = 1;
    }

    handleCollision() {
        this.velocity.x = utils.randomIntFromRange(-25, 25);
        this.velocity.y = utils.randomIntFromRange(0, 45);
    }

    isCollidedWith(obj2) {
        const dist = utils.distance(this.x, this.y, obj2.pos[0], obj2.pos[1]);
        // console.log(dist);
        // add + 10 for player height
        if (dist <= 10 + this.radius + obj2.radius) {
            // console.log(this.radius + obj2.radius);
            return true;
        }

        return false;
    }

    shatter(arr) {
        this.radius -= 3;
        // add back in for particles
        // ############ COMMENT BACK FOR MINISTARS
        for (let i = 0; i < 5; i++) {
            arr.push(new MiniStar({
                x: this.x,
                y: this.y,
                radius: 2,
                color: `rgba(227, 234, 239, 1)`,
                ctx: this.ctx
            }));
        }
        for (let i = 0; i < 4; i++) {
            arr.push(new MiniStar({
                x: this.x,
                y: this.y,
                radius: 1,
                color: `rgba(227, 234, 239, 1)`,
                ctx: this.ctx
            }));
        }
        for (let i = 0; i < 4; i++) {
            arr.push(new MiniStar({
                x: this.x,
                y: this.y,
                purp: true,
                radius: 1,
                color: `rgba(227, 234, 239, 1)`,
                ctx: this.ctx
            }));
        }
        
        for (let i = 0; i < 4; i++) {
            arr.push(new MiniStar({
                x: this.x,
                y: this.y,
                yell: true,
                radius: 1,
                color: `rgba(227, 234, 239, 1)`,
                ctx: this.ctx
            }));
        }

        // console.log(arr);
    }

    draw() {
        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.shadowColor = '#e3eaef';
        this.ctx.shadowBlur = 20;
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.restore();
    }

    update() {
        this.draw();

        // removed radius from calc so star would hit floor
        if (this.y + this.velocity.y > 800) {
            // this.y = -this.velocity.y;
            this.velocity.y = -this.velocity.y * this.friction;
            this.shatter(this.miniStars);
        } else {
            this.velocity.y += this.gravity;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

export default Star;