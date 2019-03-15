import * as utils from './utils';

export class Circle {
    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.radius = options.radius;
        this.minRadius = options.radius;
        this.dx = options.dx;
        this.dy = options.dy;
        this.color = options.color;
        this.ctx = options.ctx;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(ctx) {
        if (this.x + this.radius > 1200 || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > 800 || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // interactivity
        // if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        //     && mouse.y - this.y < 50 && mouse.y - this.y > - 50) {
        //     if (this.radius < 70) {
        //         this.radius +=3;
        //     }
        // }

        this.x += this.dx;
        this.y += this.dy;
        this.draw(ctx);
    }
}


export const generateCircles = function(options) {
    // console.log(options.ctx);
    const colorArray = [
        '#e7fff7',
        '#98e8ff',
        '#45a2e8',
        '#2278ff',
        '#005ff5'
    ];

    const result = [];
    
    for (let i = 0; i < options.size; i++) {
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];
        const x = Math.random() * (1200 - options.radius * 2) + options.radius;
        const y = Math.random() * (800 - options.radius * 2) + options.radius;
        let dx;
        let dy;
        if (options.endSpeed) {
            dx = utils.randomIntFromRange(options.speed, options.endSpeed);
            dy = utils.randomIntFromRange(options.speed, options.endSpeed);
        } else {
            dx = (Math.random() - 0.5) * options.speed;
            dy = (Math.random() - 0.5) * options.speed;
        }
        const radius = options.radius;
        const ctx = options.ctx;
        result.push(new Circle({x, y, radius, dx, dy, color, ctx}));
    }

    return result;
};