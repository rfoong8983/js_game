import Particle from '../shapes/particle';

function OffScreenCtx(scWidth, scHeight, divideBy) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.floor(scWidth / divideBy);
    this.canvas.height = Math.floor(scHeight / divideBy);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
}

module.exports = OffScreenCtx;

// OffScreenCtx.prototype.generate = function (options) {
//     const x = options.x;
//     const y = options.y;
//     const radius = options.radius;
//     const color = options.color;
//     const ttl = options.ttl;
//     const count = options.count;
//     // const velocity = {
//     //     x: options.velocity.x,
//     //     y: options.velocity.y
//     // };

    
//     for (let i = 0; i < count; i++) {
//         this.particles.push(new Particle({
//             x, y, radius, color, ttl, ctx: this.ctx
//         }));
//     }
// };

// OffScreenCtx.prototype.draw = function (x, y, radius, color, ttl) {
//     this.ctx.beginPath();
//     this.ctx.arc(x, y, radius, 0, Math.PI * 2, false);
//     this.ctx.fillStyle(color);
//     this.ctx.fill();
// };