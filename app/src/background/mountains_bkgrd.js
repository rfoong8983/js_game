import * as utils from '../utils/utils';

function MountainsBkg(ctx, amount, height, color) {
    // canvas - height = distance from top of screen
    // the higher the height, the taller the mtn
    this.ctx = ctx;
    this.amount = amount;
    this.height = height;
    this.color = color;
}

MountainsBkg.prototype.draw = function() {
    for (let i = 0; i < this.amount; i++) {
        const width = 1200 / this.amount;
        this.ctx.beginPath();
        this.ctx.moveTo(i * width, 1200);
        this.ctx.lineTo(i * width + width + 325, 800);
        this.ctx.lineTo(i * width + width / 2, 800 - this.height);
        this.ctx.lineTo(i * width - 325, 800);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
};

module.exports = MountainsBkg;