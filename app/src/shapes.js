const canvas = document.querySelector('canvas');

canvas.width = 1200;
canvas.height = 800;

// returning a drawing context to the var c
const c = canvas.getContext('2d');

function randInRange(min, max) {
    // Math.random() returns values from 0.0 up to and excluding 1.0
    // multiply output of random by the range (max - min).
    // Add the minimum to the return to shift the range upwards
    return Math.random() * (max - min) + min;
}

const mouse = {
    x: undefined,
    y: undefined
    // x: innerWidth / 2,
    // y: innerHeight / 2
};

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);


const colorArray = [
    '#e7fff7',
    '#98e8ff',
    '#45a2e8',
    '#2278ff',
    '#005ff5'
];

export function CircleFromSquares(x, y, dx, dy, ox, oy, length, c1, c2) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.ox = ox;
    this.oy = oy;
    this.length = length;
    this.c1 = c1;
    this.c2 = c2;
    const z = 4;
    this.diameter = this.ox*z*2 + this.length;


    this.draw = function () {
        let x_incr = 10;
        let y_incr = 10;
        let z = 4;

        const beige = 'hsl(64, 36%, 86%)';

        for (let i = 0; i < 4; i++) {
            let times = 0;
            while (times < z) {
                let h = 64;
                let s = randInRange(36, 40);
                let l = randInRange(88, 92);
                const c1 = `hsl(${h}, ${s}%, ${l}%)`;

                this.x += this.ox;
                this.y += this.oy;
                c.fillStyle = c1;
                c.fillRect(this.x, this.y, this.length, this.length);
                times++;
            }
            // z -= 1
            if (i % 2 === 0) {
                this.ox *= -1;
            } else {
                this.oy *= -1;
            }
        }
    };

    this.update = function () {
        if (this.x + (this.ox * z + this.length) > 1200 || this.x - (this.ox * z) < 0) {
            this.dx = -this.dx;
        }

        if (this.y + ((this.oy * z * 2) + this.length) > 800 || this.y < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };



}

export function Circle(x, y, dx, dy, radius, col) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.col = col;

    const beige = 'hsl(64, 36%, 86%)';
    const moonColor = 'hsl(211, 29%, 88%)';
    const blue = 'hsl(240, 29%, 88%)';

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.col;
        c.fill();
    };

    this.update = function () {

        if (this.x + this.radius > 1200 || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > 800 || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        // interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 70) {
                this.radius += 3;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };
}


export function generateArray(arr) {
    for (let i = 0; i < 180; i++) {
        let h = 220;
        let s = randInRange(45, 55);
        let l = randInRange(60, 88);
        let r = 1;
        const c1 = `hsl(${h}, ${s}%, ${l}%)`;
        const c2 = colorArray[Math.floor(Math.random() * colorArray.length)];
        let x = Math.random() * (1200 - (r * 2)) + r;
        let y = Math.random() * (800 - (r * 2)) + r;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        arr.push(new Circle(x, y, dx, dy, r, c2));
    }
    for (let i = 0; i < 80; i++) {
        let h = 220;
        let s = randInRange(45, 55);
        let l = randInRange(60, 88);
        let r = 3
        const c1 = `hsl(${h}, ${s}%, ${l}%)`;
        const c2 = colorArray[Math.floor(Math.random() * colorArray.length)];
        let x = Math.random() * (1200 - (r * 2)) + r;
        let y = Math.random() * (800 - (r * 2)) + r;
        let dx = randInRange(1, 4);
        let dy = randInRange(1, 4);
        // let dx = (Math.random() - 0.5) * 4;
        // let dy = (Math.random() - 0.5) * 4;
        arr.push(new Circle(x, y, dx, dy, r, c2));
    }
    for (let i = 0; i < 5; i++) {
        let diameter = (10 * 8 + 40);
        let x = Math.random() * (1200 - (diameter)) + (diameter * 0.9 / 2);
        let y = Math.random() * (800 - (diameter)) + (diameter * 0.9 / 2);
        let dx = (Math.random() - 0.5) * 7;
        let dy = (Math.random() - 0.5) * 7;
        arr.push(new CircleFromSquares(x, y, dx, dy, 10, 10, 40, 'hsl(211, 29%, 88%)', '#ffe0a3'));
    }

    return arr;
}


// console.log(circleArray);

// function animate() {
//     // takes another function as argument
//     // put animate into request...
//     // which makes a loop
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);

//     for (var i = 0; i < circleArray.length; i++) {
//         circleArray[i].update();
//     }
// }

// animate();



// gray
// c.fillStyle = 'hsl(211, 29%, 88%)';

// yellow
// c.fillStyle = '#ffe0a3';



// Line
// c.beginPath();
// // c.moveTo(x, y); where we move origin to
// c.moveTo(50, 300);
// // c.lineTo(x, y); where the line goes to
// c.lineTo(720, 140);
// c.lineTo(720, 380);
// c.closePath();
// c.strokeStyle = '#ffe0a3';
// c.fillStyle = '#fff6be';
// c.stroke();
// c.fill();



// Arc / Circle
// c.arc(x, y, radius, startAngle, endAngle, anti-clockwise?)
// start angle and end angle take radians
// start angle - what angle should we start drawing arc
// end angle - how long should arc go for?
// c.beginPath();
// c.arc(300, 100, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'rgba(255, 0, 0, 0.5)';
// c.stroke();

// c.beginPath();
// c.arc(340, 100, 20, 0, Math.PI * 2, false);
// c.strokeStyle = 'rgba(255, 0, 0, 0.5)';
// c.stroke();

// c.beginPath();
// c.arc(600, 100, 80, 20, Math.PI * 2, false);
// c.strokeStyle = 'rgba(255, 0, 0, 0.5)';
// c.stroke();
