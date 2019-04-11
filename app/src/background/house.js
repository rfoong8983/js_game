class House {
    constructor(c) {
        this.c = c;
        this.image = new Image();
        this.image2 = new Image();
        this.image.onload = () => {
            this.imageReady = true;
        };
        this.image2.onload = () => {
            this.imageReady2 = true;
        };
        this.image.src = '../src/images/Tilesets/house_out.png';
        this.image2.src = '../src/images/Tilesets/house_in_out.png';

        this.sprites = {
            roof: [0,65,  159,32,    900,640,  240,32], // 1140 end(x)
            b_wall00: [336,0,  48,49,    900,30,  48,57],
            b_wall01: [384,0,  48,49,    948,30,  48,57],
            wall00_left: [336,0,  46,49,    918,671,  48,57],
            wall00_right: [338,0,  46,49,    1074,671,  48,57], // 1140 end(x) - 18 pad right = 1122 end(x)
            wall00_mid_0: [339,0,  42,49,    965,671,  48,57],
            wall00_mid_1: [339,0,  42,49,    1013,671,  48,57],
            wall00_mid_2: [339,0,  42,49,    1061,671,  14,57],
            wall00_mid_3: [339,0,  42,49,    1061,671,  14,57],
            beam0: [134,100,  4,72,    905,668,  4,72],
            beam1: [150,100,  4,72,    1131,668,  4,72],
            light0: [256,335,  17,21,    937,689,  17,21],
            light1: [256, 335, 17, 21, 953, 689, 17, 21],
            frame0: [283, 414, 56, 21, 917, 689, 56, 21],
            light2: [256,335,  17,21,    1021,689,  17,21],
            light3: [256, 335, 17, 21, 1037, 689, 17, 21],
            frame1: [283, 414, 56, 21, 1001, 689, 56, 21],
            door: [33,324,  31,44,    1072,683,  31,44]
        };
    }

    draw() {
        if (!this.imageReady || !this.imageReady2) return;
        // this.c.drawImage(this.image2, 50, 50);
        // this.c.drawImage(this.image, 500, 300);
        this.c.drawImage(this.image, ...this.sprites.wall00_left);
        this.c.drawImage(this.image, ...this.sprites.wall00_right);
        this.c.drawImage(this.image, ...this.sprites.wall00_mid_0);
        this.c.drawImage(this.image, ...this.sprites.wall00_mid_1);
        this.c.drawImage(this.image, ...this.sprites.wall00_mid_2);
        this.c.drawImage(this.image2, ...this.sprites.light0);
        this.c.drawImage(this.image2, ...this.sprites.light1);
        this.c.drawImage(this.image2, ...this.sprites.frame0);
        this.c.drawImage(this.image2, ...this.sprites.light2);
        this.c.drawImage(this.image2, ...this.sprites.light3);
        this.c.drawImage(this.image2, ...this.sprites.frame1);
        this.c.drawImage(this.image2, ...this.sprites.door);
        this.c.drawImage(this.image, ...this.sprites.beam0);
        this.c.drawImage(this.image, ...this.sprites.beam1);
        this.c.drawImage(this.image, ...this.sprites.roof);
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