import utils from '../utils/utils';
import { Circle, generateCircles } from './circle';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 800;
// canvas.width = innerWidth
// canvas.height = innerHeight

const mouse = {
    x: undefined,
    y: undefined
    // x: innerWidth / 2,
    // y: innerHeight / 2
};

// came with
// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const colorArray = [
    '#e7fff7',
    '#98e8ff',
    '#45a2e8',
    '#2278ff',
    '#005ff5'
];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = 1200;
    canvas.height = 800;
    // canvas.width = innerWidth;
    // canvas.height = innerHeight;

    init();
});

// Objects
function Object(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}

Object.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
}

Object.prototype.update = function() {
    this.draw();
};

// Implementation
let objects;
function init() {
    objects = [];

    for (let i = 0; i < 400; i++) {
        // objects.push()
    }
}


// let arr = generateArray([]);
let test = generateCircles(180, 2, 1, Circle, c);
// console.log(test);

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0; i < test.length; i++) {
        test[i].update(c);
    }

    
    // c.fillText('text on my mouse', mouse.x, mouse.y)
    // objects.forEach(object => {
    //  object.update()
    // })
}

init();
animate();

const Game = require("./game");
const GameView = require("./game_view");


document.addEventListener('DOMConetentLoaded', function () {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 1200;
    canvasEl.height = 800;

    const ctx = canvas.getContext('2d');
    const game = new Game();
    new GameView(game, ctx).start();
});
