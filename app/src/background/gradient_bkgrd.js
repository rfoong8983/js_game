import * as utils from '../utils/utils';

function GradientBkg(ctx, stopColors) {
// function GradientBkg (ctx, stopColors) {
    this.ctx = ctx;
    // this.startColor = startColor;
    // this.endColor = endColor;
    this.startColor = stopColors.start;
    this.endColor = stopColors.end;
    this.middle = stopColors.middle;
    this.bkg = this.ctx.createLinearGradient(0, 0, 0, 800);
}

GradientBkg.prototype.draw = function() {
    this.bkg.addColorStop(0, this.startColor);
    let i = 1;
    const midLength = this.middle.length;
    const incr = 1 / (midLength + 1);
    this.middle.forEach(col => {
        this.bkg.addColorStop(0.7, col);
        // this.bkg.addColorStop(incr * i, col);
        i++;
    });
    this.bkg.addColorStop(1, this.endColor);
    this.ctx.fillStyle = this.bkg;
    this.ctx.fillRect(0, 0, 1200, 800);
    // this.bkg.addColorStop(0, this.startColor);
    // this.bkg.addColorStop(1, this.endColor);
    // this.ctx.fillStyle = this.bkg;
    // this.ctx.fillRect(0, 0, 1200, 800);
};

module.exports = GradientBkg;