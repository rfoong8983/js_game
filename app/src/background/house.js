class House {
    constructor(c) {
        this.c = c;
        this.image = new Image();
        this.roof = new Image();
        this.wall = new Image();
        this.image.onload = () => {
            this.imageReady = true;
        };
        this.roof.onload = () => {
            this.roofReady = true;
        };
        this.wall.onload = () => {
            this.wallReady = true;
        };
        this.image.src = '../src/images/Tilesets/house_in_out.png';
        this.roof.src = '../src/images/Tilesets/house_out.png';
        this.wall.src = '../src/images/Tilesets/house_out.png';
    }

    draw() {
        if (!this.imageReady) return;
        this.c.drawImage(this.image, 50, 50);
        this.c.drawImage(this.roof, 500, 300);
        this.c.drawImage(this.roof, 0, 65, 159, 32,   900, 580,  240, 32);
        this.c.drawImage(this.wall, 336, 0, 159, 32, 900, 30, 240, 32);
        // this.c.drawImage(this.roof, 0, 0, 159, 32,   900, 580,  240, 32);
    }
}

module.exports = House;
// function House(ctx) {
//     this.ctx = ctx;
//     this.image = new Image();
//     const c = ctx;
//     this.image.onload = () => {
//         this.imageReady = true;
//         debugger
//     };
//     this.image.src = '../src/images/Tilesets/house_in_out.png';
//     debugger
// }

// House.prototype.draw = function() {
//     // this.ctx.fillStyle = 'white';
//     // this.ctx.fillRect(100, 100, 40, 50);
//     debugger
//     // if (!this.imageReady) return;
//     // console.log(this.image);
//     console.log(this.imageReady);
//     this.ctx.drawImage(this.image, 100, 100);
// };

// module.exports = House;