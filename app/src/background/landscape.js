class Landscape {
    constructor(ctx) {
        this.ctx = ctx;
        this.image = new Image();
        this.image.onload = () => this.imageReady = true;
        this.image.src = '../src/images/forest/Preview/Background.png';
        // this.image.src = '/Users/ryan/documents/projects/js/js_game/app/src/Background.png';
        // this.image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
        this.draw = this.draw.bind(this);
    }

    draw() { 
        if (!this.imageReady) return;
        this.ctx.drawImage(this.image, 0, 0);
    }
}

module.exports = Landscape;