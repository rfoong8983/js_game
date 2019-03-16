import * as utils from '../utils/utils';
import Particle from '../shapes/particle';
import { clonedeep } from 'lodash';

function AmbientBkg (ctx, radius, color, prev) {
    this.ctx = ctx;
    this.radius = radius;
    this.color = color;
    this.gravity = 1;
    this.velocity = {
        x: Math.random() * 2,
        y: Math.random() * 1
    };
    this.ttl = 100;
    this.opacity = 1;
    this.prev = [];
}


AmbientBkg.prototype.generate = function(preloadedParticles) {
    this.prev = this.prev.concat(_.cloneDeep(preloadedParticles));
};

AmbientBkg.prototype.draw = function() {
    // this.ctx.save();
    
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.shadowColor = '#e3eaef';
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    this.ctx.closePath();
    
    // this.ctx.restore();
};

AmbientBkg.prototype.update = function() {
    this.draw();
    
    this.velocity.y += this.gravity;
    this.y += this.velocity.y;
    this.ttl -= 1;
};

module.exports = AmbientBkg;
    
    
// AmbientBkg.prototype.generate = function(n) {
//     // this.prev = [];
//     for (let i = 0; i < n; i ++) {
//         this.prev.push(new Particle({
//             x: (Math.random() - 0.8) * 1200,
//             y: (Math.random() - 0.8) * 800,
//             radius: this.radius,
//             color: `rgba(227, 234, 239, 1)`,
//             ctx: this.ctx
//         }));
//     }
// };