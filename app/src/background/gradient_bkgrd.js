import * as utils from '../utils/utils';

function GradientBkg (ctx, startColor, endColor) {
    this.ctx = ctx;
    this.startColor = startColor;
    this.endColor = endColor;
    this.bkg = this.ctx.createLinearGradient(0, 0, 0, 800);
}

GradientBkg.prototype.draw = function() {
    this.bkg.addColorStop(0, this.startColor);
    this.bkg.addColorStop(1, this.endColor);
    this.ctx.fillStyle = this.bkg;
    this.ctx.fillRect(0, 0, 1200, 800);
};

module.exports = GradientBkg;