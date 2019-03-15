import MiniStar from './ministar';

class Star {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
        this.color = options.color;
        this.ctx = options.ctx;
        this.gravity = 1;
        this.friction = 0.8;
        this.velocity = {
            x: 0,
            y: 3
        };
        this.miniStars = options.miniStars;
        this.opacity = 1;
    }

    shatter(arr) {
        this.radius -= 3;
        for (let i = 0; i < 8; i++) {
            arr.push(new MiniStar({
                x: this.x,
                y: this.y,
                radius: 2,
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

        if (this.y + this.radius + this.velocity.y > 800) {
            // this.y = -this.velocity.y;
            this.velocity.y = -this.velocity.y * this.friction;
            this.shatter(this.miniStars);
        } else {
            this.velocity.y += this.gravity;
        }
        this.y += this.velocity.y;
    }
}

export default Star;